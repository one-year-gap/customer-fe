"use client";

import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

import { isAxiosError } from "axios";
import { X } from "lucide-react";
import { toast } from "sonner";

import { useGoogleSignup } from "@/lib/tanstack/mutation/user";
import { useOnboardingMe } from "@/lib/tanstack/query/user";
import type { GoogleSignupRequestDTO } from "@/models/user";
import type { DaumPostcodeData } from "@/types/daum";

export default function SignupGoogle() {
  const { data: onboardingData, isLoading } = useOnboardingMe();
  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <p className="text-sm text-neutral-500">회원 정보를 불러오는 중입니다...</p>
      </div>
    );
  }
  const initialUser = onboardingData
    ? { name: onboardingData.name, email: onboardingData.email }
    : undefined;

  return <SignupGoogleForm initialUser={initialUser} />;
}

function SignupGoogleForm({ initialUser }: { initialUser?: { name: string; email: string } }) {
  const [formData, setFormData] = useState({
    phone: "",
    year: "",
    month: "",
    day: "",
    gender: "",
  });
  const [gender, setGender] = useState<"male" | "female">("male");
  const [addressInfo, setAddressInfo] = useState({
    zonecode: "", //우편번호
    roadAddress: "", //도로명 주소
    sido: "",
    sigungu: "",
  });

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { mutate: googleSignup } = useGoogleSignup({
    onSuccess: () => {
      toast.success("회원가입 완료!");
      router.push("/tos");
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message;

        toast.error(message ?? "입력 정보를 다시 확인해주세요.");
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleOpenPostcode = () => {
    setIsPostcodeOpen(true);
    setTimeout(() => {
      if (wrapRef.current && window.daum) {
        new window.daum.Postcode({
          oncomplete: (data: DaumPostcodeData) => {
            setAddressInfo((prev) => ({
              ...prev,
              zonecode: data.zonecode,
              roadAddress: data.roadAddress,
              sido: data.sido,
              sigungu: data.sigungu,
            }));
            setIsPostcodeOpen(false);
          },
          onresize: (size) => {
            if (wrapRef.current) {
              wrapRef.current.style.height = `${size.height}px`;
            }
          },
          width: "100%",
          height: "100%",
        }).embed(wrapRef.current);
      }
    }, 0);
  };

  const handleClickSign = () => {
    if (
      !formData.phone ||
      !formData.year ||
      !formData.month ||
      !formData.day ||
      !addressInfo.zonecode ||
      !addressInfo.roadAddress
    ) {
      toast.warning("필수 정보를 모두 입력해주세요.");
      return;
    }
    const streetAddress = addressInfo.roadAddress
      .replace(addressInfo.sido, "")
      .replace(addressInfo.sigungu, "")
      .trim();

    const payload: GoogleSignupRequestDTO = {
      phone: formData.phone,
      birthDate: `${formData.year}-${formData.month.padStart(2, "0")}-${formData.day.padStart(2, "0")}`,
      gender: gender === "male" ? "M" : "F",
      address: {
        province: addressInfo.sido,
        city: addressInfo.sigungu,
        streetAddress: streetAddress,
        postalCode: addressInfo.zonecode,
      },
    };
    googleSignup(payload);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center overflow-y-auto px-6 py-10">
      <Script src="//t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />

      {isPostcodeOpen && (
        <div
          role="dialog"
          className="bg-card fixed inset-0 z-[100] mx-auto flex max-w-sm flex-col overflow-hidden">
          <div className="border-muted bg-card flex h-14 items-center justify-between border-b px-4">
            <div className="font-bold">주소 검색</div>
            <button type="button" onClick={() => setIsPostcodeOpen(false)}>
              <X className="text-muted-foreground h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pt-2">
            <div ref={wrapRef} className="w-full" />
          </div>
        </div>
      )}
      <div className="bg-card text-card-foreground h-fit w-full max-w-sm rounded-xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-primary-500 font-display2 font-regular text-lg">LG U+NIVERSE</h1>
          <button type="button" onClick={handleBack}>
            <X className="text-muted-foreground h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-primary-500 mb-1 block text-sm font-bold">이름</div>
            <div className="bg-input text-foreground focus:ring-ring w-full rounded-md px-4 py-3 text-sm outline-none focus:ring-2">
              {initialUser?.name || "정보 없음"}
            </div>
          </div>

          <div>
            <div className="text-primary-500 mb-1 block text-sm font-bold">전화번호</div>
            <input
              id="phone"
              type="text"
              placeholder="휴대전화 번호 - 빼고 작성"
              value={formData.phone}
              onChange={handleInputChange}
              className="bg-input text-foreground focus:ring-ring w-full rounded-md px-4 py-3 text-sm outline-none focus:ring-2"
            />
          </div>

          <fieldset>
            <div className="text-primary-700 mb-2 block text-sm font-bold">성별</div>
            <div className="text-foreground flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="accent-secondary-500"
                />
                남자
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="accent-secondary-500"
                />
                여자
              </div>
            </div>
          </fieldset>

          <fieldset>
            <div className="text-primary-700 mb-2 block text-sm font-bold">생년월일</div>
            <div className="flex gap-2">
              <input
                type="number"
                id="year"
                placeholder="연도"
                value={formData.year}
                onChange={handleInputChange}
                className="bg-input text-foreground focus:ring-ring w-1/3 rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
              />
              <input
                type="number"
                id="month"
                placeholder="월"
                value={formData.month}
                onChange={handleInputChange}
                className="bg-input text-foreground focus:ring-ring w-1/3 rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
              />
              <input
                type="number"
                id="day"
                placeholder="일"
                value={formData.day}
                onChange={handleInputChange}
                className="bg-input text-foreground focus:ring-ring w-1/3 rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="text-primary-500 mb-2 block text-sm font-bold">주소</div>
            <div className="mb-2 flex gap-2">
              <input
                type="text"
                placeholder="우편번호"
                value={addressInfo.zonecode}
                readOnly
                className="bg-input text-foreground focus:ring-ring flex-1 rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
              />
              <button
                type="button"
                onClick={handleOpenPostcode}
                className="text-primary-300 hover:bg-accent hover:text-accent-foreground rounded-md px-4 text-sm font-medium">
                우편번호 찾기
              </button>
            </div>
            <input
              type="text"
              placeholder="도로명 주소"
              value={addressInfo.roadAddress}
              readOnly
              className="bg-input text-foreground focus:ring-ring mb-2 w-full rounded-md px-3 py-3 text-sm outline-none focus:ring-2"
            />
          </fieldset>

          <div>
            <div className="text-primary-500 mb-1 block text-sm font-bold">아이디 (이메일)</div>
            <div className="bg-input text-foreground focus:ring-ring w-full rounded-md px-4 py-3 text-sm outline-none focus:ring-2">
              {initialUser?.email || "정보 없음"}
            </div>
          </div>

          <button
            type="button"
            onClick={handleClickSign}
            className="bg-primary-500 text-primary-foreground mt-4 w-full rounded-md px-4 py-3 text-sm font-semibold hover:opacity-90">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
