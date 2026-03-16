import type { IDBPDatabase } from "idb";
import { openDB } from "idb";

import type { LogDTO } from "@/models/log";

export class Storage {
  private dbName = "LogDatabase";
  private storeName = "logs";

  private async getDB(): Promise<IDBPDatabase> {
    return openDB(this.dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("logs")) {
          db.createObjectStore("logs", { keyPath: "event_id" });
        }
      },
    });
  }

  // 단건 적재 (LogDTO)
  async store(log: LogDTO) {
    const db = await this.getDB();
    await db.put(this.storeName, log);
  }

  // 모든 적재 로그 배열 호출
  async getAll(): Promise<LogDTO[]> {
    const db = await this.getDB();
    return await db.getAll(this.storeName);
  }

  // 전송 완료된 ID들만 삭제
  async clear(eventIds: string[]) {
    const db = await this.getDB();
    const tx = db.transaction(this.storeName, "readwrite");
    await Promise.all(eventIds.map((id) => tx.store.delete(id)));
    await tx.done;
  }
}
