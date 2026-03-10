"use client";

import { type ReactNode, useState } from "react";

import { PencilLine } from "lucide-react";

import UpdateButton from "@/components/common/CommonButton";

function InfoRow({
  label,
  value,
  editable,
  isEditing,
}: {
  label: string;
  value: ReactNode;
  editable?: boolean;
  isEditing?: boolean;
}) {
  return (
    <div className="text-md grid w-full grid-cols-4 items-center gap-3 border-b border-neutral-300 px-3 py-2 font-medium">
      <div className="text-primary-500 col-span-1">{label}</div>
      <div className="col-span-3 text-neutral-900">
        {isEditing && editable ? (
          <input
            defaultValue={String(value)}
            className="w-full rounded border border-neutral-300 px-2 py-1"
          />
        ) : (
          <span className="truncate">{value ?? "-"}</span>
        )}
      </div>
    </div>
  );
}

export default function MyInfoPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="flex flex-col gap-4">
      <header className="bg-primary-500 font-display2 flex flex-col gap-2 px-6 py-4">
        <span className="text-neutral-0 text-lg">회원 정보</span>
        <span className="text-xs text-neutral-500">내 정보를 확인하고 수정하는 곳입니다.</span>
      </header>

      <section className="flex flex-col px-6">
        <div className="flex items-center justify-between border-b border-neutral-500 p-2 text-lg font-semibold">
          <span>내 가입 정보</span>
          {!isEditing && (
            <button type="button" onClick={() => setIsEditing(true)}>
              <PencilLine className="h-5 w-5 cursor-pointer text-neutral-500 hover:text-neutral-900" />
            </button>
          )}
        </div>
        <InfoRow label="이름" value="박준형" />
        <InfoRow label="이메일" value="asdf@gmail.com" />
        <InfoRow label="전화번호" value="010-1234-5678" editable isEditing={isEditing} />
        <InfoRow label="주소" value="서울시 강남구 역삼동 000-11" editable isEditing={isEditing} />
        <InfoRow label="생년월일" value="1998.08.25" editable isEditing={isEditing} />
        <InfoRow label="약정여부" value="24개월" />
        <InfoRow label="약정기간" value="2025.03.10 - 2027.03.10" />
      </section>

      <section className="flex flex-col px-6">
        <div className="border-b border-neutral-500 p-2 text-lg font-semibold">가입 요금제</div>
        <InfoRow label="모바일" value="5G 슬림+" />
        <InfoRow label="태블릿/스마트워치" value="5G 슬림+" />
        <InfoRow label="인터넷" value="5G 슬림+" />
        <InfoRow label="IPTV" value="5G 슬림+" />
        <InfoRow label="부가서비스" value="5G 슬림+" />
      </section>

      {isEditing && (
        <section className="flex items-center justify-center">
          <UpdateButton variant="secondary" size="md" onClick={() => setIsEditing(false)}>
            수정완료
          </UpdateButton>
        </section>
      )}
    </main>
  );
}
