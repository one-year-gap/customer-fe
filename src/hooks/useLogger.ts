"use client";

import { useCallback } from "react";

import { getTsid } from "tsid-ts";

import { logger } from "@/components/domain/logger/Logger";
import { useLogContext } from "@/context/LogContext";
import type { EventProperties, LogDTO } from "@/models/log";

const generateEventId = (): string => {
  const tsid = getTsid().toString();
  return tsid;
};

export const useLogger = () => {
  const commonProps = useLogContext(); // Context에서 공통 데이터를 가져옴

  const trackClick = useCallback(
    async (eventName: string, actionProps?: EventProperties) => {
      const payload: LogDTO = {
        event_id: generateEventId(),
        timestamp: new Date().toISOString(),
        event: "click",
        event_name: eventName,
        event_properties: {
          ...commonProps, // 1. 공통 데이터 (page_url 등)
          ...actionProps, // 2. 클릭 시점 데이터 (product_id 등)
        },
      };

      try {
        // await api.post("/api/v1/user-logs", payload); 매 요청 시마다 전송
        await logger.log(payload); //로그를 적재해서 n초마다 보내도록 Storage로 적재

        if (process.env.NODE_ENV === "development") {
          console.log(`[Log Success: ${eventName}]`, payload);
        }
      } catch (error) {
        // 로그 전송 실패가 사용자 경험(UI)을 방해하지 않도록 에러 처리만 수행
        console.error("[Log Failed]", error);
      }
    },
    [commonProps],
  );

  return { trackClick };
};
