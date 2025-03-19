export interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  discoveryChannel: string;
  otherDiscoveryChannel?: string;
  privacyConsent: boolean;
  eligibility?: {
    isRegisteredOrWillBe: boolean;
    hadGrantRevocation: boolean;
    hasRelocated24Months: boolean;
    willNotRelocate24Months: boolean;
    isPartOfGroup: boolean;
  };
  atecoCode?: string;
  localUnit?: {
    municipality: string;
  };
  investmentType?: string;
  customInvestmentAmount?: number;
  projectDescription?: string;
  expenseTypes: string[];
}

export const DEFAULT_FORM_STATE: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  discoveryChannel: '',
  privacyConsent: false,
  expenseTypes: []
}; 