"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  BookUser,
  ChevronRight,
  Clock,
  FileText,
  Headset,
  LogOut,
  Search,
  Settings2,
  Ticket,
} from "lucide-react";

import hole from "@/assets/images/HoleMan.png";
import logo from "@/assets/images/Logo.png";
import { useCustomerProfile } from "@/lib/tanstack/query/customer/useCustomerProfile";

export default function My() {
  const router = useRouter();

  const { data, isLoading, isError } = useCustomerProfile();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러</div>;

  const recentActivities = [
    { title: "데이터 쿠폰 사용", desc: "1GB 쿠폰 적용", time: "23:35", icon: Ticket },
    { title: "요금제 조회", desc: "5G 프리미어 에센셜 조회", time: "23:40", icon: Search },
    { title: "요금제 변경", desc: "5G 프리미어 에센셜 변경", time: "23:45", icon: Settings2 },
  ];

  const supportMenus = [
    { title: "내 가입 정보", icon: BookUser, path: "/my/info" },
    { title: "고객 센터", icon: Headset, path: "/support" },
    { title: "로그아웃", icon: LogOut, path: "/logout" },
    { title: "약관 및 정책", icon: FileText, path: "/policy" },
  ];

  const membershipChip = (membership: string | undefined) => {
    if (membership === "GOLD") {
      return {
        text: "우수",
        style: "bg-secondary-300 text-neutral-0",
      };
    }
    if (membership === "VIP") {
      return {
        text: "VIP",
        style: "bg-secondary-500 text-neutral-0",
      };
    }
    if (membership === "VVIP") {
      return {
        text: "VVIP",
        style: "bg-secondary-700 text-neutral-0",
      };
    }
    return {
      text: membership || "우수",
      style: "bg-secondary-300 text-neutral-0",
    };
  };
  const { text, style } = membershipChip(data?.membership);

  return (
    <div className="flex min-h-full flex-col bg-neutral-50">
      {/* 헤더 섹션 */}
      <section className="bg-primary-500 text-neutral-0 relative rounded-b-[40px] p-4 text-center font-medium">
        <Image src={logo} alt="LG U+NIVERSE 로고" width={95} height={95} className="h-9 w-9" />
        <div className="\ mx-auto flex flex-col items-center justify-center gap-2">
          <Image src={hole} alt="holeMan image" width={96} height={96} className="h-24 w-24" />

          <div className="flex items-center justify-center gap-2">
            <h2 className="text-lg">{data?.name}</h2>
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${style}`}>{text}</span>
          </div>

          <p className="text-md text-neutral-300">{data?.phone}</p>
        </div>
      </section>

      <div className="space-y-6 px-5 py-8">
        {/* 최근 활동 섹션 */}
        <section>
          <div className="mb-4 ml-4 flex items-center gap-2">
            <Clock size={20} />
            <h3 className="text-md font-semibold">최근 활동</h3>
          </div>
          <div className="bg-neutral-0 space-y-5 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-neutral-400">23 월요일</p>
            {recentActivities.map((item, idx) => {
              const Icon = item.icon;

              return (
                <div key={idx} className="flex items-center justify-between font-medium">
                  <div className="flex items-center gap-4">
                    <div className="text-secondary-500 flex h-10 w-10 items-center justify-center rounded-full">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm">{item.title}</p>
                      <p className="text-xs text-neutral-400">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400">{item.time}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 지원 메뉴 섹션 */}
        <section>
          <h3 className="text-md mb-4 ml-4 font-semibold">지원 메뉴</h3>
          <div className="bg-neutral-0 divide-y divide-neutral-100 rounded-2xl text-sm shadow-sm">
            {supportMenus.map((menu) => {
              const Icon = menu.icon;
              return (
                <button
                  type="button"
                  key={menu.title}
                  onClick={() => router.push(menu.path)}
                  className="flex w-full cursor-pointer items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-secondary-500 bg-secondary-100 ml-2 flex h-8 w-8 items-center justify-center rounded-lg">
                      <Icon size={20} />
                    </div>
                    <span className="font-medium">{menu.title}</span>
                  </div>
                  <ChevronRight size={20} className="text-neutral-300" />
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
