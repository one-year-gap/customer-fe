export default function FAQPage() {
  const faqs = [
    {
      q: "U+NIVERSE는 어떤 서비스인가요?",
      a: "U+NIVERSE는 고객 데이터를 기반으로 서비스 이용 현황과 고객 특성을 분석할 수 있는 관리 서비스이며 분석 리포트를 제공해 맞춤형 마케팅을 지원합니다.",
    },
    {
      q: "내 데이터 사용량은 어디에서 확인할 수 있나요?",
      a: "마이페이지 또는 대시보드에서 데이터 사용량, 통화 사용량, 문자 사용량을 확인할 수 있습니다.",
    },
    {
      q: "데이터 사용량은 언제 갱신되나요?",
      a: "데이터 사용량은 통신 시스템과 연동되어 일정 주기로 업데이트되며 실시간 반영이 아닐 수 있습니다.",
    },
    {
      q: "내 정보가 다른 사람에게 공개되나요?",
      a: "아니요. 고객의 개인정보 및 이용 정보는 안전하게 보호되며 서비스 정책에 따라 관리됩니다.",
    },
    {
      q: "요금제 정보는 어디에서 확인할 수 있나요?",
      a: "현재 이용 중인 요금제는 마이페이지에서 확인할 수 있습니다.",
    },
    {
      q: "데이터가 표시되지 않는 경우는 왜 그런가요?",
      a: `다음과 같은 경우 데이터가 표시되지 않을 수 있습니다.
• 데이터 수집 지연
• 시스템 점검
• 네트워크 환경 문제`,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-[#1E3A6D] px-6 py-10 text-white">
        <h1 className="text-2xl font-bold">FAQ</h1>
        <p className="mt-2 text-sm text-white/80">자주하는 질문을 확인해보세요.</p>

        <div className="absolute -top-20 -right-20 h-55 w-55 rounded-full border border-white/20" />
      </div>

      <div className="px-6 py-8">
        <h2 className="mb-6 text-center text-lg font-semibold">자주 묻는 질문</h2>

        <div className="border-t border-gray-300">
          <div className="flex border-b border-gray-300 py-3 text-sm text-gray-500">
            <span className="w-8">No</span>
            <span>제목</span>
          </div>

          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 py-4">
              <div className="flex gap-3">
                <span className="w-8 text-gray-500">{index + 1}</span>

                <div>
                  <p className="font-medium">{faq.q}</p>

                  <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-gray-500">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
