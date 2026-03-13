export interface EventProperties {
  page_url?: string;
  product_id?: number;
  product_name?: string;
  product_type?: "mobile" | "tab-watch" | "internet" | "iptv";
  tags?: string[];
  [key: string]: any;
}

export interface LogDTO {
  event_id: number; // TSID 정수값
  timestamp: string; // ISO8601
  event: "click"; // 향후 확장 가능
  event_name: string;
  event_properties?: EventProperties;
}
export interface LogLogRequestDTO {
  logs: LogDTO[]; // 백엔드에게 전송할 로그 배열
}
