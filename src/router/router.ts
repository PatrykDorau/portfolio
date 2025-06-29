import { createWebHistory, createRouter } from "vue-router";

import MainLayout from "../components/MainLayout.vue";

const routes = [
  { path: "/", component: MainLayout },
  {
    path: "/study/:code",
    component: () => import("../views/CaseStudyView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(() => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// });

export default router;
