import { createWebHistory, createRouter } from "vue-router";

import MainLayout from "../components/MainLayout.vue";
import CasteStudyView from "../views/CaseStudyView.vue";

const routes = [
  { path: "/", component: MainLayout },
  {
    path: "/study/:code",
    component: CasteStudyView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
