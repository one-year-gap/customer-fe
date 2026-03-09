"use client";

import { useCallback } from "react";

import { useLogContext } from "@/context/LogContext";
import { api } from "@/lib/axios";
import type { EventProperties, LogRequestDTO } from "@/models/log";

const generateEventId = (): number => {
  // 현재 밀리초와 무작위 수를 조합하여 겹치지 않는 정수값 생성
  return Number(BigInt(Date.now()) * BigInt(1000) + BigInt(Math.floor(Math.random() * 1000)));
};

export const useLogger = () => {
  const commonProps = useLogContext(); // Context에서 공통 데이터를 가져옴

  const trackClick = useCallback(
    async (eventName: string, actionProps?: EventProperties) => {
      const payload: LogRequestDTO = {
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
        // 1. 서버로 로그 데이터 전송
        await api.post("/api/v1/user-logs", payload);

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
