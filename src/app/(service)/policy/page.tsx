export default function PolicyPage() {
  const policies = [
    {
      title: "제1조 (목적)",
      content:
        "이 약관은 LG U+가 제공하는 U+NIVERSE 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.",
    },
    {
      title: "제2조 (정의)",
      content: `U+NIVERSE 서비스는 고객의 통신 서비스 이용 정보를 기반으로 다음과 같은 기능을 제공합니다.
• 데이터 사용량 조회
• 통화 및 문자 이용 현황 확인
• 이용 패턴 기반 정보 제공
• 요금제 비교 및 추천 서비스

회사는 서비스의 품질 향상을 위해 기능을 추가하거나 변경할 수 있습니다.`,
    },
    {
      title: "제3조 (서비스 이용)",
      content:
        "이용자는 본 약관에 동의하고 회원 가입을 완료한 후 서비스를 이용할 수 있습니다. 회사는 서비스의 원활한 운영을 위해 일부 기능의 이용을 제한할 수 있습니다.",
    },
    {
      title: "제4조 (서비스 변경 및 중단)",
      content:
        "회사는 시스템 점검, 서비스 개선, 또는 기타 불가피한 사유가 발생한 경우 서비스의 일부 또는 전부를 변경하거나 중단할 수 있습니다.",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary-700 relative overflow-hidden px-6 py-10 text-white">
        <div className="text-2xl font-bold">약관 및 정책</div>
        <p className="mt-2 text-sm text-white/80">약관을 확인해보세요.</p>

        <div className="absolute -top-20 -right-20 h-55 w-55 rounded-full border border-white/20" />
      </div>

      <div className="px-6 py-8">
        <div className="mb-6 text-center text-lg font-semibold">약관 및 정책</div>

        <div className="space-y-6 border-t border-neutral-300 pt-6">
          {policies.map((policy, index) => (
            <div key={index}>
              <div className="text-md mb-2 font-semibold text-neutral-800">{policy.title}</div>
              <div className="rounded-md bg-neutral-200 p-4 text-sm leading-relaxed whitespace-pre-line text-neutral-700">
                {policy.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
