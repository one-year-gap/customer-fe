export type ProductType = "mobile" | "tab-watch" | "internet" | "iptv";

export interface EventProperties {
  page_url?: string;
  product_id?: number;
  product_name?: string;
  product_type?: ProductType;
  tags?: string[];
  [key: string]: any;
}

export interface LogDTO {
  event_id: string; // TSID값은 number에 안담겨서 문자열로 전송
  timestamp: string;
  event: "click"; // 향후 확장 가능
  event_name: string;
  event_properties?: EventProperties;
}
export interface LogLogRequestDTO {
  logs: LogDTO[]; // 백엔드에게 전송할 로그 배열
}
