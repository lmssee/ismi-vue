import { createRouter, createWebHistory } from 'vue-router';
import MiPagePage from '../page/MiPagePage';
import TestButtonPage from '../page/TestButtonPage';
import MiButtonPage from '../page/MiButtonPage';
import MiCenterPage from '../page/MiCenterPage';
import MiColResizePage from '../page/MiColResizePage';
import MiFloatBackPage from '../page/MiFloatBackPage';
import MiCodeBlockPage from '../page/MiCodeBlockPage';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: '/', path: '/', redirect: 'testButton' },
    { name: 'testButton', component: TestButtonPage, path: '/testButton' },
    { name: 'miButton', component: MiButtonPage, path: '/miButton' },
    { name: 'miCenter', component: MiCenterPage, path: '/miCenter' },
    { name: 'miColResize', component: MiColResizePage, path: '/miColResize' },
    { name: 'miFloatBack', component: MiFloatBackPage, path: '/miFloatBack' },
    { name: 'miPage', component: MiPagePage, path: '/miPage' },
    { name: 'miCodeBlock', component: MiCodeBlockPage, path: '/miCodeBlock' },
  ],
});

export default router;
