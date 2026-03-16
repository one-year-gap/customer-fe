"use client";

import React, { createContext, useContext, useMemo } from "react";

import type { EventProperties } from "@/models/log";

const LogContext = createContext<EventProperties>({});

interface LogProviderProps {
  value: EventProperties;
  children: React.ReactNode;
}

export const LogProvider = ({ value, children }: LogProviderProps) => {
  // 2. 상위 LogProvider가 있다면 그 값을 가져옴(중첩 지원) page_url이나 이런쪽에 사용
  const parentValue = useContext(LogContext);

  const mergedValue = useMemo(
    () => ({
      ...parentValue,
      ...value,
    }),
    [parentValue, value],
  );

  return <LogContext.Provider value={mergedValue}>{children}</LogContext.Provider>;
};

/**
 * 현재 컨텍스트에 쌓인 로그 속성들을 가져오는 Hook
 */
export const useLogContext = () => {
  return useContext(LogContext);
};
