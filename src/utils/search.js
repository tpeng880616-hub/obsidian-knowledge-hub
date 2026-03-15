import FlexSearch from 'flexsearch'
import { notes } from '../data/notes'

// Create search index
const index = new FlexSearch.Document({
  document: {
    id: 'slug',
    index: ['title', 'content'],
    store: ['title', 'slug', 'tags', 'content']
  },
  tokenize: 'forward',
  cache: true
})

// Add documents to index
notes.forEach(note => {
  index.add({
    slug: note.slug,
    title: note.title,
    content: note.content,
    tags: note.tags || []
  })
})

export function search(query) {
  if (!query || query.trim().length === 0) {
    return []
  }
  
  const results = index.search(query, {
    limit: 20,
    enrich: true
  })
  
  // Process results
  const seen = new Set()
  const searchResults = []
  
  results.forEach(fieldResult => {
    fieldResult.result.forEach(item => {
      if (!seen.has(item.id)) {
        seen.add(item.id)
        const note = item.doc
        // Create snippet
        const queryLower = query.toLowerCase()
        const contentLower = note.content.toLowerCase()
        const idx = contentLower.indexOf(queryLower)
        let snippet = ''
        
        if (idx !== -1) {
          const start = Math.max(0, idx - 50)
          const end = Math.min(note.content.length, idx + query.length + 50)
          snippet = (start > 0 ? '...' : '') + 
                    note.content.slice(start, idx) + 
                    '<mark class="bg-cyber-primary/30 text-cyber-primary">' + 
                    note.content.slice(idx, idx + query.length) + 
                    '</mark>' + 
                    note.content.slice(idx + query.length, end) + 
                    (end < note.content.length ? '...' : '')
        }
        
        searchResults.push({
          slug: note.slug,
          title: note.title,
          tags: note.tags || [],
          snippet: snippet || note.content.slice(0, 100) + '...',
          matchType: fieldResult.field
        })
      }
    })
  })
  
  return searchResults
}

export default { search }
