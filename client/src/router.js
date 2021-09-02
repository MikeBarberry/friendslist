import Home from './components/Home.vue'
import List from './components/List.vue'
import Edit from './components/Edit.vue'

export default [
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