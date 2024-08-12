import { createRouter, createWebHistory } from 'vue-router';
import SelectBook from './components/SelectBook.vue';
import Book from './components/Book.vue';

const routes = [
  {
    path: '/',
    name: 'SelectBook',
    component: SelectBook
  },
  {
    path: '/Book/:index',
    name: 'Book',
    component: Book,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;