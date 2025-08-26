import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

interface Printer {
  code: string;
  name: string;
  model: string;
  location: string;
  is_active: boolean;
}

interface Paper {
  terminal: number;
  added_count: number;
}

interface Notification {
  terminal_id: number;
  notification_id: number;
}

export const getPrinterList = () => {
  return http.request<any>("get", baseUrlApi("/printers/printers"));
};
//添加打印机
export const addPrinter = (data: Printer) => {
  return http.request<any>("post", baseUrlApi("/printers/printers/"), { data });
};

//根据id获取打印机
export const getPrinterById = (id: string) => {
  return http.request<any>("get", baseUrlApi(`/printers/printers/${id}/`));
};

//整体更新
export const updatePrinterByWhole = (id: string, data: Printer) => {
  return http.request<any>("put", baseUrlApi(`/printers/printers/${id}/`), {
    data
  });
};
//部分更新
export const updatePrinter = (id: string, data: Partial<Printer>) => {
  return http.request<any>("patch", baseUrlApi(`/printers/printers/${id}/`), {
    data
  });
};
//删除打印机
export const deletePrinter = (id: string) => {
  return http.request<any>("delete", baseUrlApi(`/printers/printers/${id}/`));
};
//获取打印机JWT密钥
export const getPrinterSecretKey = (id: string) => {
  return http.request<any>(
    "get",
    baseUrlApi(`/printers/printers/${id}/get_secret_key/`)
  );
};

//增加纸张
export const addPaper = (data: Paper) => {
  return http.request<any>(
    "post",
    baseUrlApi("/printers/printers/notify_add_paper/"),
    { data }
  );
};
// 检查某个通知是否已发送给某台打印机
export const checkNotification = (data: Notification) => {
  return http.request<any>(
    "post",
    baseUrlApi("/printers/printers/confirm_notification/"),
    { data }
  );
};

//metrics
//1、缺少页码内容

// types 可按需细化
export interface PrinterMetricList {
  ordering: string;
  page: number;
  page_size: number;
}

export interface PrinterMetric {
  terminal: number;
  printer_type?: string;
  power_status?: string;
  network_status?: string;
  system_status?: string;
  paper_jam_status?: boolean;
  printer_head_status?: string;
  paper_tray_status?: string;
  toner_level?: number;
  paper_remaining?: number;
  error_status?: string;
  error_code?: string;
  print_quality?: number;
  print_density?: number;
  print_speed?: number;
  paper_path_status?: string;
  scanner_status?: string;
  temperature?: number;
  waste_toner_level?: number;
  service_status?: string;
  print_queue?: number;
  storage_space?: number;
  memory_usage?: number;
  cpu_usage?: number;
  power_status_code?: number;
  system_status_code?: number;
  paper_jam_status_code?: number;
  printer_head_status_code?: number;
  paper_tray_status_code?: number;
  service_status_code?: number;
  network_status_code?: number;
  error_status_code?: number;
  error_message?: string;
  uploaded?: boolean;
  uploaded_at?: string;
  terminal_id?: number;
}

// 1) 获取列表（可带分页/筛选参数）
export const getMetricsList = (data: PrinterMetricList) => {
  return http.request<any>("get", baseUrlApi("/printers/metrics/"), { data });
};

// // 2) 创建指标
// export const createMetric = (data: PrinterMetric) => {
//   return http.request<any>("post", baseUrlApi("/printers/metrics/"), { data });
// };

// 3) 获取最新快照
export const getLatestMetrics = (data: PrinterMetricList) => {
  return http.request<any>("get", baseUrlApi("/printers/metrics/latest/"), {
    data
  });
};

// 4) 根据 terminal_id 获取快照
export const getMetricsByTerminal = (
  terminalId: number | string,
  data: PrinterMetricList
) => {
  return http.request<any>(
    "get",
    baseUrlApi(`/printers/metrics/terminal/${terminalId}/`),
    { data }
  );
};

// 5) 读取单条（id）
export const getMetricById = (id: string | number) => {
  return http.request<any>("get", baseUrlApi(`/printers/metrics/${id}/`));
};

// 6) 全量更新（PUT）
export const updateMetric = (id: number | string, data: PrinterMetric) => {
  return http.request<any>("put", baseUrlApi(`/printers/metrics/${id}/`), {
    data
  });
};

// 7) 局部更新（PATCH）
export const patchMetric = (
  id: number | string,
  data: Partial<PrinterMetric>
) => {
  return http.request<any>("patch", baseUrlApi(`/printers/metrics/${id}/`), {
    data
  });
};

// 8) 删除
export const deleteMetric = (id: number | string) => {
  return http.request<any>("delete", baseUrlApi(`/printers/metrics/${id}/`));
};
