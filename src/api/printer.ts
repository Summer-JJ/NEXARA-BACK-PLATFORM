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
    baseUrlApi(`/printers/printers/${id}/get_secret-key/`)
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