export default {
  path: "/printer",
  redirect: "/printer/index",
  meta: {
    title: "打印机",
    rank: 1
  },
  children: [
    {
      path: "/printer/index",
      name: "Printer",
      component: () => import("@/views/printer/index.vue"),
      meta: {
        title: "打印机",
        hiddenTag: true
      }
    }
  ]
} satisfies RouteConfigsTable;
