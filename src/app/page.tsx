"use client";

import { useState } from "react";

const TEST_API_URL = "https://api.holliverse.site/api/v1/test";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  // 배포 테스트용
  const handleTestRequest = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch(TEST_API_URL, {
        method: "GET",
      });

      const text = await response.text();

      setResult(`status: ${response.status}\n${text || "(empty response body)"}`);
    } catch (error) {
      setResult(`request failed: ${error instanceof Error ? error.message : "unknown error"}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* customer-web */}
      <div className="font-display flex flex-col">
        <p className="font-display2 text-3xl">test1</p>
        <p className="font-sans text-2xl">test2</p>
        <p className="text-xl">test3</p>
      </div>
      {/* Server Test */}
      <button
        type="button"
        onClick={handleTestRequest}
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50">
        {loading ? "요청 중..." : "GET /api/v1/test"}
      </button>

      {result && (
        <pre className="max-w-3xl overflow-auto rounded bg-gray-100 p-4 text-sm">{result}</pre>
      )}
    </div>
  );
}
