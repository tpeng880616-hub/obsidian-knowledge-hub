import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Note from '../pages/Note.vue'
import Tags from '../pages/Tags.vue'
import TagDetail from '../pages/TagDetail.vue'
import Search from '../pages/Search.vue'
import Graph from '../pages/Graph.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/note/:slug', name: 'Note', component: Note },
  { path: '/tags', name: 'Tags', component: Tags },
  { path: '/tags/:tag', name: 'TagDetail', component: TagDetail },
  { path: '/search', name: 'Search', component: Search },
  { path: '/graph', name: 'Graph', component: Graph },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
