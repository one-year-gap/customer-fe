export interface PlanContent {
  dataAmount: string;
  tetheringSharingData: string | null;
  benefitVoiceCall: string;
  benefitSms: string;
  benefitBrands: string | null;
  benefitMedia: string | null;
  benefitPremium: string | null;
  benefitSignatureFamilyDiscount: string | null;
}

export interface Plan {
  productId: number;
  name: string;
  productType: string;
  price: number;
  salePrice: number;
  discountType: string;
  productCode: string;
  content: PlanContent;
  isBest: boolean;
  tags: string[];
}

export interface PlansData {
  page: {
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
  content: Plan[];
}

export interface PlansResponse {
  status: string;
  data: PlansData;
  timestamp: string;
}
