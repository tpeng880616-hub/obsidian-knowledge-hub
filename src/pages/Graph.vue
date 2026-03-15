<template>
  <div class="graph-page h-screen flex flex-col overflow-hidden">
    <!-- Graph Header -->
    <div class="graph-header p-4 border-b border-cyber-border bg-cyber-bg-secondary/50">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold neon-text-cyan">知识图谱</h1>
          <p class="text-sm text-gray-400 mt-1">
            共 {{ nodes.length }} 个节点，{{ links.length }} 条连接
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="resetZoom"
            class="px-3 py-1.5 text-sm bg-cyber-bg border border-cyber-border rounded-lg hover:border-cyber-primary transition-colors"
          >
            重置视图
          </button>
          <button
            @click="togglePhysics"
            class="px-3 py-1.5 text-sm bg-cyber-bg border border-cyber-border rounded-lg hover:border-cyber-secondary transition-colors"
          >
            {{ simulationRunning ? '暂停' : '运行' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Graph Container -->
    <div ref="graphContainer" class="graph-container flex-1 relative">
      <svg ref="svgRef" class="w-full h-full"></svg>
      
      <!-- Tooltip -->
      <div
        v-if="hoveredNode"
        class="tooltip absolute px-3 py-2 bg-cyber-bg-secondary border border-cyber-primary rounded-lg shadow-neon-cyan pointer-events-none z-10"
        :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
      >
        <div class="text-sm font-medium text-cyber-primary">{{ hoveredNode.title }}</div>
        <div class="text-xs text-gray-400 mt-1">
          {{ hoveredNode.linkCount }} 个链接
        </div>
      </div>
    </div>
    
    <!-- Legend -->
    <div class="graph-legend absolute bottom-4 left-4 p-3 bg-cyber-bg-secondary/90 border border-cyber-border rounded-lg">
      <div class="text-xs text-gray-400 mb-2">图例</div>
      <div class="flex items-center gap-2 text-xs">
        <div class="w-3 h-3 rounded-full bg-cyber-primary neon-border"></div>
        <span class="text-gray-300">笔记节点</span>
      </div>
      <div class="flex items-center gap-2 text-xs mt-1">
        <div class="w-8 h-0.5 bg-cyber-secondary"></div>
        <span class="text-gray-300">链接关系</span>
      </div>
    </div>
    
    <!-- Instructions -->
    <div class="graph-instructions absolute bottom-4 right-4 p-3 bg-cyber-bg-secondary/90 border border-cyber-border rounded-lg text-xs text-gray-400">
      <div>🖱️ 拖拽移动</div>
      <div>🔍 滚轮缩放</div>
      <div>👆 点击跳转</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import * as d3 from 'd3'
import { notes, getBacklinks } from '../data/notes'

const router = useRouter()

const graphContainer = ref(null)
const svgRef = ref(null)
const hoveredNode = ref(null)
const tooltipX = ref(0)
const tooltipY = ref(0)
const simulationRunning = ref(true)

const nodes = ref([])
const links = ref([])
let simulation = null
let svg = null
let g = null
let zoom = null

// Build graph data from notes
function buildGraphData() {
  const nodeMap = new Map()
  const linkSet = new Set()
  
  // Create nodes
  notes.forEach(note => {
    const backlinks = getBacklinks(note.slug)
    nodeMap.set(note.slug, {
      id: note.slug,
      title: note.title,
      linkCount: backlinks.length
    })
  })
  
  // Create links from wiki links in content
  notes.forEach(note => {
    const linkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
    let match
    
    while ((match = linkRegex.exec(note.content)) !== null) {
      const targetSlug = match[1].toLowerCase().replace(/\s+/g, '-')
      
      // Only create link if target exists
      if (nodeMap.has(targetSlug) && targetSlug !== note.slug) {
        const linkKey = [note.slug, targetSlug].sort().join('->')
        
        if (!linkSet.has(linkKey)) {
          linkSet.add(linkKey)
          links.value.push({
            source: note.slug,
            target: targetSlug,
            strength: 1
          })
        } else {
          // Increase strength for bidirectional links
          const existingLink = links.value.find(
            l => (l.source === targetSlug && l.target === note.slug) ||
                 (l.source === note.slug && l.target === targetSlug)
          )
          if (existingLink) {
            existingLink.strength += 1
          }
        }
      }
    }
  })
  
  nodes.value = Array.from(nodeMap.values())
}

function initGraph() {
  if (!svgRef.value || !graphContainer.value) return
  
  const width = graphContainer.value.clientWidth
  const height = graphContainer.value.clientHeight
  
  // Clear existing
  d3.select(svgRef.value).selectAll('*').remove()
  
  // Create SVG
  svg = d3.select(svgRef.value)
    .attr('viewBox', [0, 0, width, height])
  
  // Create zoom behavior
  zoom = d3.zoom()
    .scaleExtent([0.1, 4])
    .on('zoom', (event) => {
      g.attr('transform', event.transform)
    })
  
  svg.call(zoom)
  
  // Create main group
  g = svg.append('g')
  
  // Create gradient definitions
  const defs = svg.append('defs')
  
  // Create glow filter
  const filter = defs.append('filter')
    .attr('id', 'glow')
    .attr('x', '-50%')
    .attr('y', '-50%')
    .attr('width', '200%')
    .attr('height', '200%')
  
  filter.append('feGaussianBlur')
    .attr('stdDeviation', '3')
    .attr('result', 'coloredBlur')
  
  const feMerge = filter.append('feMerge')
  feMerge.append('feMergeNode').attr('in', 'coloredBlur')
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic')
  
  // Create gradient for links
  const linkGradient = defs.append('linearGradient')
    .attr('id', 'link-gradient')
    .attr('gradientUnits', 'userSpaceOnUse')
  
  linkGradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#ff00ff')
    .attr('stop-opacity', 0.6)
  
  linkGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#00fff5')
    .attr('stop-opacity', 0.6)
  
  // Create arrow marker
  defs.append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 25)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#ff00ff')
    .attr('opacity', 0.6)
  
  // Prepare data
  const nodeData = nodes.value.map(d => ({ ...d }))
  const linkData = links.value.map(d => ({ ...d }))
  
  // Create force simulation
  simulation = d3.forceSimulation(nodeData)
    .force('link', d3.forceLink(linkData).id(d => d.id).distance(120))
    .force('charge', d3.forceManyBody().strength(-400))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(40))
  
  // Create links
  const link = g.append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(linkData)
    .join('line')
    .attr('stroke', 'url(#link-gradient)')
    .attr('stroke-width', d => Math.min(d.strength * 2, 6))
    .attr('stroke-opacity', 0.6)
    .attr('marker-end', 'url(#arrow)')
  
  // Create nodes
  const node = g.append('g')
    .attr('class', 'nodes')
    .selectAll('g')
    .data(nodeData)
    .join('g')
    .attr('class', 'node')
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended))
    .on('click', (event, d) => {
      router.push(`/note/${d.id}`)
    })
    .on('mouseenter', (event, d) => {
      hoveredNode.value = d
      tooltipX.value = event.offsetX + 10
      tooltipY.value = event.offsetY + 10
    })
    .on('mouseleave', () => {
      hoveredNode.value = null
    })
  
  // Node circles with glow
  node.append('circle')
    .attr('r', d => 15 + Math.min(d.linkCount * 3, 15))
    .attr('fill', '#0d0d0d')
    .attr('stroke', '#00fff5')
    .attr('stroke-width', 2)
    .attr('filter', 'url(#glow)')
    .style('cursor', 'pointer')
  
  // Node labels
  node.append('text')
    .text(d => d.title.length > 15 ? d.title.substring(0, 15) + '...' : d.title)
    .attr('dy', d => 25 + Math.min(d.linkCount * 3, 15))
    .attr('text-anchor', 'middle')
    .attr('fill', '#e0e0e0')
    .attr('font-size', '11px')
    .attr('font-family', 'Inter, sans-serif')
    .style('pointer-events', 'none')
  
  // Animation for nodes
  node.selectAll('circle')
    .style('animation', 'pulse 2s ease-in-out infinite')
  
  // Update positions on tick
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
    
    node.attr('transform', d => `translate(${d.x},${d.y})`)
  })
  
  // Add styles
  const style = document.createElement('style')
  style.textContent = `
    @keyframes pulse {
      0%, 100% { stroke-opacity: 1; }
      50% { stroke-opacity: 0.6; }
    }
    .node:hover circle {
      stroke-width: 3 !important;
      stroke: #ff00ff !important;
    }
  `
  document.head.appendChild(style)
}

function dragstarted(event) {
  if (!event.active && simulationRunning.value) simulation.alphaTarget(0.3).restart()
  event.subject.fx = event.subject.x
  event.subject.fy = event.subject.y
}

function dragged(event) {
  event.subject.fx = event.x
  event.subject.fy = event.y
}

function dragended(event) {
  if (!event.active && simulationRunning.value) simulation.alphaTarget(0)
  event.subject.fx = null
  event.subject.fy = null
}

function resetZoom() {
  if (svg && zoom) {
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
    )
  }
}

function togglePhysics() {
  simulationRunning.value = !simulationRunning.value
  
  if (simulation) {
    if (simulationRunning.value) {
      simulation.restart()
    } else {
      simulation.stop()
    }
  }
}

function handleResize() {
  if (graphContainer.value && svg) {
    const width = graphContainer.value.clientWidth
    const height = graphContainer.value.clientHeight
    
    svg.attr('viewBox', [0, 0, width, height])
    
    if (simulation) {
      simulation.force('center', d3.forceCenter(width / 2, height / 2))
      simulation.alpha(0.3).restart()
    }
  }
}

onMounted(() => {
  buildGraphData()
  initGraph()
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (simulation) {
    simulation.stop()
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.graph-page {
  background: 
    radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d0d 100%),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 50px,
      rgba(0, 255, 245, 0.03) 50px,
      rgba(0, 255, 245, 0.03) 51px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 50px,
      rgba(0, 255, 245, 0.03) 50px,
      rgba(0, 255, 245, 0.03) 51px
    );
}

.graph-container {
  background: transparent;
}

.tooltip {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.neon-text-cyan {
  text-shadow: 0 0 10px #00fff5, 0 0 20px #00fff5, 0 0 30px #00fff5;
}

.neon-border {
  box-shadow: 0 0 5px #00fff5, 0 0 10px #00fff5;
}
</style>
