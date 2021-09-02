import Home from './components/Home.vue'
import List from './components/List.vue'
import Edit from './components/Edit.vue'

export default [
  // Redirects to /route-one as the default route.
  {
    path: '/',
    component: Home,
  },
  {
    path: '/list',
    component: List,
    
  },
  {
    path: '/edit/:id',
    component: Edit,
    
  },
];