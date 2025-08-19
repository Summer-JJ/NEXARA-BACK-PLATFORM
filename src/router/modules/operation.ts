export default {
  path: "/operation",
  redirect: "/operation/index",
  meta: {
    title: "运营",
    rank: 2
  },
  children: [
    {
      path: "/operation/index",
      name: "Operation",
      component: () => import("@/views/operation/index.vue"),
      meta: {
        title: "订单",
        hiddenTag: true
      }
    },
    {
      path: "/operation/feedback",
      name: "Feedback",
      component: () => import("@/views/operation/feedback.vue"),
      meta: {
        title: "反馈",
        hiddenTag: true
      }
    },
    {
      path: "/operation/payment",
      name: "Payment",
      component: () => import("@/views/operation/payment.vue"),
      meta: {
        title: "支付",
        hiddenTag: true
      }
    },
    {
      path: "/operation/price",
      name: "Price",
      component: () => import("@/views/operation/price.vue"),
      meta: {
        title: "价格",
        hiddenTag: true
      }
    }
  ]
} satisfies RouteConfigsTable;
