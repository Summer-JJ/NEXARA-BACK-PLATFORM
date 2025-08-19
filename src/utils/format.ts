// src/utils/time.ts
import dayjs from "dayjs";

/** 格式化时间 */
export function formatTime(
  date?: string | number | Date,
  format = "YYYY-MM-DD HH:mm:ss"
) {
  return dayjs(date).format(format);
}
