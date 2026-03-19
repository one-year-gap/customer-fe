import type { ProductType } from "@/models/plan";

export interface ApiResponse<T> {
  status: string;
  data: T;
  timestamp: string;
}

export interface CustomerProfile {
  name: string;
  membership: string;
  phone: string;
  email: string;
  address: string;
  birthDate: string;

  contract: CustomerContract | null;

  subscriptions: CustomerSubscription[];
  mobilePlan: CustomerMobilePlan | null;
}

export interface CustomerContract {
  contractStartDate: string | null;
  contractEndDate: string | null;
  contractMonths: number | null;
}

export interface CustomerSubscription {
  subscriptionId: number;
  productName: string;
  productType: ProductType;
}

export interface CustomerMobilePlan {
  dataAmount: string | null;
  isDay: boolean | null;
  benefitSms: string | null;
  benefitVoiceCall: string | null;
  usageDetails: CustomerUsageDetails | null;
}

export interface CustomerUsageDetails {
  dataGb: number | null;
  smsCnt: number | null;
  voiceMin: number | null;
}
