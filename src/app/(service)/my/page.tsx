"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  BookUser,
  ChevronRight,
  Clock,
  FileText,
  Gift,
  Headset,
  Info,
  LogOut,
  Search,
  Signal,
  Smartphone,
  Tv,
  Wifi,
} from "lucide-react";

import hole from "@/assets/images/HoleMan.png";
import logo from "@/assets/images/Logo.png";
import LogoutModal from "@/components/domain/my/LogoutModal";
import { useLogger } from "@/hooks/useLogger";
import { useLogout } from "@/lib/tanstack/query/my/useLogout";
import { useRecentProducts } from "@/lib/tanstack/query/my/useRecentProducts";
import { useCustomerProfile } from "@/lib/tanstack/query/profile/useCustomerProfile";
import type { ProductType } from "@/models/my/RecentProducts";

export default function My() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { trackClick } = useLogger();

  const { data: me, isLoading: meLoading, isError: meError } = useCustomerProfile();
  const {
    data: recentProduct,
    isLoading: recentProductLoading,
    isError: recentProductError,
  } = useRecentProducts();
  const { mutate: logoutMutate } = useLogout();

  if (meLoading || recentProductLoading) return <div>로딩중...</div>;
  if (meError || recentProductError) return <div>에러</div>;

  /* 지원 메뉴 */
  const supportMenus = [
    { title: "내 가입 정보", icon: BookUser, path: "/my/info" },
    { title: "고객 센터", icon: Headset, path: "/faq" },
    { title: "로그아웃", icon: LogOut, path: "/logout" },
    { title: "약관 및 정책", icon: FileText, path: "/policy" },
  ];

  /* 회원 기본 정보 */
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
  const { text, style } = membershipChip(me?.membership);

  const formatPhoneNumber = (phone?: string) => {
    return phone?.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  /* 최근에 본 상품 */
  const recentItems = recentProduct?.data?.items ?? [];

  const latestByProductId = recentItems.reduce((acc, item) => {
    const prev = acc.get(item.productId);

    if (!prev || new Date(item.viewedAt).getTime() > new Date(prev.viewedAt).getTime()) {
      acc.set(item.productId, item);
    }

    return acc;
  }, new Map<(typeof recentItems)[number]["productId"], (typeof recentItems)[number]>());

  const uniqueRecentProducts = Array.from(latestByProductId.values()).sort(
    (a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime(),
  );

  const productTypeIcon = {
    mobile: Signal,
    tablet: Smartphone,
    internet: Wifi,
    iptv: Tv,
    addon: Gift,
  };

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const productTypeLabel: Record<ProductType, string> = {
    mobile: "모바일",
    tablet: "태블릿/스마트워치",
    internet: "인터넷",
    iptv: "IPTV",
    addon: "부가서비스",
  };

  return (
    <div className="bg-neutral-0 flex min-h-full flex-col">
      {/* 헤더 섹션 */}
      <section className="bg-primary-500 flex flex-col gap-2 rounded-b-[40px] p-4">
        <div className="flex justify-between">
          <div className="flex-1">
            <Image src={logo} alt="LG U+NIVERSE 로고" width={95} height={95} className="h-9 w-9" />
          </div>
          <div className="flex flex-1 justify-center">
            <Image src={hole} alt="holeMan image" width={96} height={96} className="h-24 w-24" />
          </div>
          <div className="flex-1" />
        </div>

        <div className="text-neutral-0 mx-auto flex flex-col items-center justify-center gap-2 text-center font-medium">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-lg">{me?.name}</h2>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${style}`}>
              {text}
            </span>
          </div>
          <p className="text-md text-neutral-300">{formatPhoneNumber(me?.phone)}</p>
        </div>
      </section>

      <div className="flex flex-col gap-6 px-5 py-8">
        {/* 최근에 본 상품 */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <h3 className="text-md font-semibold">최근에 본 상품</h3>
          </div>

          <div className="bg-neutral-0 space-y-5 rounded-2xl border border-neutral-300 p-5 shadow-sm">
            {uniqueRecentProducts.length === 0 ? (
              <div className="flex flex-col items-center gap-2 font-medium">
                <p className="text-center text-sm text-neutral-500">최근 조회한 상품이 없습니다</p>
                <button
                  onClick={() => router.push("/products")}
                  className="text-primary-500 font cursor-pointer text-xs underline">
                  상품 보러가기
                </button>
              </div>
            ) : (
              uniqueRecentProducts.map((item) => {
                const Icon = productTypeIcon[item.productType] ?? Search;

                return (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between font-medium">
                    <div className="flex items-center gap-4">
                      <div className="text-secondary-500 flex h-10 w-10 items-center justify-center rounded-full">
                        <Icon size={20} />
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-neutral-900">{item.productName}</p>
                        <p className="text-xs text-neutral-500">
                          {productTypeLabel[item.productType]}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-neutral-500">{formatTime(item.viewedAt)}</span>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* 지원 메뉴 섹션 */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Info size={20} />
            <h3 className="text-md font-semibold">지원 메뉴</h3>
          </div>

          <div className="bg-neutral-0 divide-y divide-neutral-100 rounded-2xl border border-neutral-300 text-sm shadow-sm">
            {supportMenus.map((menu) => {
              const Icon = menu.icon;
              return (
                <button
                  type="button"
                  key={menu.title}
                  onClick={() => {
                    if (menu.title === "약관 및 정책") {
                      trackClick("click_penalty", { page_url: "/my" });
                    }
                    if (menu.title === "로그아웃") {
                      setIsModalOpen(true);
                    } else {
                      router.push(menu.path);
                    }
                  }}
                  className="flex w-full items-center justify-between p-4">
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

      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          logoutMutate(undefined, {
            onSuccess: () => {
              router.replace("/login");
            },
          });
        }}
      />
    </div>
  );
}
