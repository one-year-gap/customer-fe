export interface SignupRequestDTO {
  email: string;
  password?: string;
  name: string;
  phone: string;
  birthDate: string;
  gender: "M" | "F";
  membership: "BASIC" | "VIP" | "VVIP";
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
