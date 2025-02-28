export type FormState = {
  // Informazioni personali
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;

  // Informazioni aziendali
  isCompanyEstablished: boolean;
  meetsSmeRequirements: boolean;
  hasReceivedFunding: boolean;
  willRelocateToSicily: boolean;
  isPartOfGroup: boolean;

  // Dettagli progetto
  projectDescription: string;
  interventionType: 'new' | 'expansion' | 'renovation';
  investmentAmount: 'fino400' | 'fino1000' | 'oltre1000';
  willHireEmployees: boolean;
  isRundownProperty: boolean;
  isHistoricalBuilding: boolean;

  // Spese
  equipmentCosts: number;
  consultingCosts: number;
  trainingCosts: number;
  marketingCosts: number;

  // Città di intervento
  selectedCity: string;
};

export const DEFAULT_FORM_STATE: FormState = {
  // Informazioni personali
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',

  // Informazioni aziendali
  isCompanyEstablished: false,
  meetsSmeRequirements: false,
  hasReceivedFunding: false,
  willRelocateToSicily: false,
  isPartOfGroup: false,

  // Dettagli progetto
  projectDescription: '',
  interventionType: 'new',
  investmentAmount: 'fino400',
  willHireEmployees: false,
  isRundownProperty: false,
  isHistoricalBuilding: false,

  // Spese
  equipmentCosts: 0,
  consultingCosts: 0,
  trainingCosts: 0,
  marketingCosts: 0,

  // Città di intervento
  selectedCity: '',
};
