import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

interface FeedbackQuery {
  email?: string;
}

interface OrderQuery {
  search?: string;
  ordering?: string;
}

// 查询反馈记录
export const getFeedbackList = (query?: FeedbackQuery) => {
  return http.request<any>(
    "get",
    baseUrlApi("/operation/feedback/list_feedback/"),
    { params: query }
  );
};
// 获取订单列表
export const getOperationOrders = (query?: OrderQuery) => {
  return http.request<any>("get", baseUrlApi("/operation/orders/"), {
    params: query
  });
};

// 获取订单统计
// export const getOperationOrdersStats = () => {
//   return http.request<any>("get", baseUrlApi("/operation/orders/stats/"));
// };

// 获取订单详情
export const getOperationOrderById = (id: string | number) => {
  return http.request<any>("get", baseUrlApi(`/operation/orders/${id}/`));
};

// 删除订单文件 为什么还可以删除订单
export const cleanupOrderFile = (id: string | number) => {
  return http.request<any>(
    "delete",
    baseUrlApi(`/operation/orders/${id}/cleanup_file/`)
  );
};

// 标记订单失败
export const markOrderFailed = (id: string | number) => {
  return http.request<any>(
    "post",
    baseUrlApi(`/operation/orders/${id}/mark_failed/`)
  );
};

// 获取支付列表
export const getPaymentList = () => {
  return http.request<any>("get", baseUrlApi("/operation/payment/"));
};

// // 获取支付回调历史
// export const getPaymentCallbackHistory = () => {
//   return http.request<any>("get", baseUrlApi("/operation/payment/callback_history/"));
// };

// 获取支付统计
// export const getPaymentStats = () => {
//   return http.request<any>("get", baseUrlApi("/operation/payment/stats/"));
// };

// 获取支付详情
export const getPaymentById = (id: string | number) => {
  return http.request<any>("get", baseUrlApi(`/operation/payment/${id}/`));
};

// 退款 需要详细研究一下
export const refundPayment = (id: string | number, data: any) => {
  return http.request<any>(
    "post",
    baseUrlApi(`/operation/payment/${id}/refund/`),
    { data }
  );
};

// 价格暂时还没有数据信息
// 获取所有价格配置
export const getPricingList = () => {
  return http.request<any>("get", baseUrlApi("/operation/pricing/"));
};

// 创建价格配置
export const createPricing = (data: any) => {
  return http.request<any>("post", baseUrlApi("/operation/pricing/"), { data });
};
// 获取单个价格配置详情
export const getPricingById = (id: string | number) => {
  return http.request<any>("get", baseUrlApi(`/operation/pricing/${id}/`));
};

// 整体更新价格配置（PUT）
export const updatePricing = (id: string | number, data: Pricing) => {
  return http.request<any>("put", baseUrlApi(`/operation/pricing/${id}/`), {
    data
  });
};

// 部分更新价格配置（PATCH）
export const patchPricing = (id: string | number, data: Partial<Pricing>) => {
  return http.request<any>("patch", baseUrlApi(`/operation/pricing/${id}/`), {
    data
  });
};

// 删除价格配置
export const deletePricing = (id: string | number) => {
  return http.request<any>("delete", baseUrlApi(`/operation/pricing/${id}/`));
};

// 激活价格配置
export const activatePricing = (id: string | number) => {
  return http.request<any>(
    "post",
    baseUrlApi(`/operation/pricing/${id}/activate/`)
  );
};

// 停用价格配置
export const deactivatePricing = (id: string | number) => {
  return http.request<any>(
    "post",
    baseUrlApi(`/operation/pricing/${id}/deactivate/`)
  );
};
