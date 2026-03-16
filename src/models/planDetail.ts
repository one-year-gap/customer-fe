export interface PlanDetail {
  productId: number;
  name: string;
  price: number;
  salePrice: number;
  discountType: string;
  productCode: string;

  content: {
    dataAmount?: string;
    tetheringSharingData?: number;
    benefitBrands?: string;
    benefitVoiceCall?: string;
    benefitSms?: string;
    benefitMedia?: string;
    benefitPremium?: string;
    benefitSignatureFamilyDiscount?: string;
  };
}
