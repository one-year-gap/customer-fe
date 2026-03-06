export interface SignupRequestDTO {
  email: string;
  password: string;
  name: string;
  phone: string;
  birthDate: string;
  gender: "M" | "F";
  membership: "GOLD" | "VIP" | "VVIP";
  address: {
    province: string;
    city: string;
    streetAddress: string; // roadAddress에서 sido, sigungu 제외한 나머지
    postalCode: string;
  };
}
export interface SignupResponseDTO {
  username: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

export interface OnboardingMeData {
  name: string;
  email: string;
}
export type OnboardingMeResponseDTO = ApiResponse<OnboardingMeData>;

export interface GoogleSignupRequestDTO {
  phone: string;
  birthDate: string;
  gender: "M" | "F";
  address: {
    province: string;
    city: string;
    streetAddress: string; // roadAddress에서 sido, sigungu 제외한 나머지
    postalCode: string;
  };
}
