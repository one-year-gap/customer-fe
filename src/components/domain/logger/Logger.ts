import { api } from "@/lib/axios";
import type { LogDTO } from "@/models/log";

import { Storage } from "./Storage";

export class Logger {
  private storage = new Storage();
  private interval = 5000;
  private isSending = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    setInterval(() => this.flush(), this.interval);
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") this.flush();
    });
  }

  async log(formattedLog: LogDTO) {
    await this.storage.store(formattedLog);
  }

  async flush() {
    if (this.isSending) return;

    // Storage에서 모든 LogDTO를 가져옴
    const logs: LogDTO[] = await this.storage.getAll();
    if (logs.length === 0) return;

    this.isSending = true;
    const sentIds = logs.map((l) => l.event_id);

    try {
      //  LogDTO[] 전송
      await api.post("/api/v1/customer/user-logs", logs);

      // 성공 시에만 해당 event_id 목록 삭제
      await this.storage.clear(sentIds);
    } catch (e) {
      console.log("[Logger] 전송 지연 또는 실패. 다음 주기 재시도.");
    } finally {
      this.isSending = false;
    }
  }
}

export const logger = new Logger();
