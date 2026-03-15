import MarkdownIt from 'markdown-it'
import frontMatter from 'front-matter'

// Create markdown-it instance
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
})

// Custom wiki link plugin
const wikiLinkPlugin = (md) => {
  const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    const href = tokens[idx].attrGet('href')
    
    // Check if it's a wiki link [[link]] or [[link|display]]
    if (href && href.startsWith('[[') && href.endsWith(']]')) {
      const inner = href.slice(2, -2)
      let link, text
      
      if (inner.includes('|')) {
        [link, text] = inner.split('|')
      } else {
        link = inner
        text = inner
      }
      
      // Convert to slug
      const slug = link.toLowerCase().replace(/\s+/g, '-')
      
      tokens[idx].attrSet('href', `/note/${slug}`)
      tokens[idx].attrAdd('class', 'wiki-link')
    }
    
    return defaultRender(tokens, idx, options, env, self)
  }
}

md.use(wikiLinkPlugin)

// Process tags (#tag)
const tagPlugin = (md) => {
  const defaultRender = md.renderer.rules.text || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.text = function(tokens, idx, options, env, self) {
    const text = tokens[idx].content
    
    // Match #tag pattern
    const tagRegex = /#([a-zA-Z0-9_-]+)/g
    if (tagRegex.test(text)) {
      return text.replace(tagRegex, (match, tag) => {
        return `<a href="/tags/${tag}" class="tag-link">#${tag}</a>`
      })
    }
    
    return defaultRender(tokens, idx, options, env, self)
  }
}

md.use(tagPlugin)

export function parseMarkdown(content) {
  // Parse front matter
  const { attributes, body } = frontMatter(content)
  
  // Render markdown
  const html = md.render(body)
  
  return {
    html,
    ...attributes
  }
}

export function extractWikiLinks(content) {
  const links = []
  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
  let match
  
  while ((match = regex.exec(content)) !== null) {
    const link = match[1]
    const text = match[2] || link
    const slug = link.toLowerCase().replace(/\s+/g, '-')
    links.push({ slug, text, original: match[0] })
  }
  
  return links
}

export function extractTags(content) {
  const tags = []
  const regex = /#([a-zA-Z0-9_-]+)/g
  let match
  
  while ((match = regex.exec(content)) !== null) {
    if (!tags.includes(match[1])) {
      tags.push(match[1])
    }
  }
  
  return tags
}

export default { parseMarkdown, extractWikiLinks, extractTags }
