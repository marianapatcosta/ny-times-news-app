import { createRouter, createWebHistory } from "vue-router";
import NewsList from "../views/news-list/NewsList.vue";

const routes = [
  {
    path: "/",
    name: "news-list",
    component: NewsList,
  },
  {
    path: "/news/:id",
    name: "news-details",
    component: () => import("../views/news-details/NewsDetails.vue"),
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
