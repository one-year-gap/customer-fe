export interface ApiResponse<T> {
  status: string;
  data: T;
  timestamp: string;
}

export interface CustomerProfile {
  name: string;
  membership: string;
  phone: string;
  subscriptions: CustomerSubscription[];
  mobilePlan: CustomerMobilePlan;
}

export interface CustomerSubscription {
  subscriptionId: number;
  productName: string;
  productType: string;
}

export interface CustomerMobilePlan {
  dataAmount: string;
  isDay: boolean;
  benefitSms: string;
  benefitVoiceCall: string;
  usageDetails: Record<string, unknown>;
}
