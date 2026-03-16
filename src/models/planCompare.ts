export interface PlanContent {
  dataAmount?: string;
  tetheringSharingData?: string;
  benefitBrands?: string | null;
  benefitVoiceCall?: string | null;
  benefitSms?: string | null;
  benefitMedia?: string | null;
  benefitPremium?: string | null;
  benefitSignatureFamilyDiscount?: string | null;
}

export interface PlanInfo {
  productId: number;
  name: string;
  price: number;
  salePrice: number;
  discountType?: string;
  productCode?: string;
  content: PlanContent;
  isBest?: boolean;
}

export interface BenefitChange {
  item: string;
  is_changed: boolean;
  desc: string;
  added_brands: string[];
  removed_brands: string[];
}

export interface PlanComparisonResult {
  price_diff: number;
  message?: string;
  benefit_changes?: BenefitChange[];
}

export interface PlanCompareResponseDTO {
  current_plan: PlanInfo;
  target_plan: PlanInfo;
  comparison: PlanComparisonResult;
}
