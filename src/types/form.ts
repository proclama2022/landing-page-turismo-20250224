import { type } from "os";

const filteredAtecoCodes: string[] = [
  '55 - ALLOGGIO',
  '55.1 - ALBERGHI E STRUTTURE SIMILI',
  '55.10 - Alberghi e strutture simili',
  '55.10.0 - Alberghi',
  '55.10.00 - Alberghi',
  '55.2 - ALLOGGI PER VACANZE E ALTRE STRUTTURE PER BREVI SOGGIORNI',
  '55.20 - Alloggi per vacanze e altre strutture per brevi soggiorni',
  '55.20.1 - Villaggi turistici',
  '55.20.10 - Villaggi turistici',
  '55.20.2 - Ostelli della gioventù',
  '55.20.20 - Ostelli della gioventù',
  '55.20.3 - Rifugi di montagna',
  '55.20.30 - Rifugi di montagna',
  '55.20.4 - Affittacamere per brevi soggiorni, case ed appartamenti per vacanze, bed and breakfast, residence, alloggio connesso alle aziende agricole e ittiche',
  '55.20.51 - Affittacamere per brevi soggiorni, case ed appartamenti per vacanze, bed and breakfast, residence',
  '55.3 - AREE DI CAMPEGGIO E AREE ATTREZZATE PER CAMPER E ROULOTTE',
  '55.30 - Aree di campeggio e aree attrezzate per camper e roulotte'
].filter(code => /^\d{2}\.\d{2}(\.\d{2})?$/.test(code.split(' - ')[0]));

export const ATECO_CODES: typeof filteredAtecoCodes = filteredAtecoCodes;

export type Role = 'imprenditore' | 'collaboratore' | 'altro';

export interface Contact {
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: Role[];
}

export interface Eligibility {
  isRegisteredOrWillBe: boolean;
  hadGrantRevocation: boolean;
  hasRelocated24Months: boolean;
  willNotRelocate24Months: boolean;
  isPartOfGroup: boolean;
}

export interface LocalUnit {
  municipality: string;
  province: string;
  address: string;
  postalCode: string;
}

export interface Requirements {
  businessRegistry: boolean;
  sicilianLocation: boolean;
  buildingCompliance: boolean;
  financialCapacity: boolean;
  contributionRegularity: boolean;
}

export type CompanySize = 'micro' | 'piccola' | 'media' | 'grande';

export type ProjectType = 'expansion' | 'newConstruction' | 'completion';

export type RegimeType = 'normal' | 'deMinimis' | 'exemption';

export type InvestmentType = 'ampliamento' | 'nuova_struttura' | 'recupero_immobile';

export type InvestmentPurpose = 'enhanceTourism' | 'qualityStandards' | 'serviceImprovement' | 'reuseProperty';

export type ExpenseType = 
  | 'propertyPurchase' 
  | 'construction' 
  | 'projectManagement' 
  | 'equipment' 
  | 'consulting' 
  | 'feasibilityStudy' 
  | 'environmentalCert' 
  | 'energyCert' 
  | 'intellectualProperty' 
  | 'rainwaterSystem' 
  | 'ledLighting' 
  | 'homeAutomation' 
  | 'solarThermal' 
  | 'photovoltaic' 
  | 'thermalEfficiency';

export type InvestmentAmount = 'under100k' | '100k-500k' | '500k-1M' | 'over1M' | 'custom';

export type AtecoCode = 
  | '55'
  | '55.1'
  | '55.10'
  | '55.10.0'
  | '55.10.00'
  | '55.2'
  | '55.20'
  | '55.20.1'
  | '55.20.10'
  | '55.20.2'
  | '55.20.20'
  | '55.20.3'
  | '55.20.30'
  | '55.20.4'
  | '55.20.51'
  | '55.3'
  | '55.30'
  | 'altro';

export type DocumentFields = 'businessPlan' | 'technicalDocuments' | 'permits' | 'financialStatements';

export interface FormState {
  // Informazioni personali
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Informazioni aziendali
  company?: {
    companyName?: string;
  };
  vatNumber: string;
  constitutionDate?: string;
    atecoCode?: AtecoCode;
  companySize?: CompanySize;
  
  // Informazioni di contatto
  contact?: Contact;
  
  // Requisiti di ammissibilità
  eligibility?: Eligibility;
  
  // Unità locale
  localUnit?: LocalUnit;
  
  // Requisiti
  requirements: Requirements;
  
  // Informazioni sul progetto
  investmentType?: InvestmentType;
  investmentPurpose?: InvestmentPurpose;
  expenseTypes: ExpenseType[];
  investmentAmount?: InvestmentAmount;
  customInvestmentAmount?: number;
  projectDescription: string;
  projectType: string;
  projectLocation?: string;
  projectDuration?: string;
  newPersonnel?: boolean;
  degradedBuilding?: boolean;
  historicalBuilding?: boolean;
  
  // Budget
  expenses: Record<string, number>;
  totalAmount: number;
  fundingAmount: number;
  regimeType: RegimeType;
  
  // Documenti
  documents: Record<DocumentFields, boolean>;

  // Informazioni aggiuntive
  discoveryChannel: string;
  otherDiscoveryChannel?: string;
  gdprConsent: boolean;
  marketingConsent: boolean;
  score: number;
}

export const DEFAULT_FORM_STATE: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: {},
  vatNumber: '',
  contact: {
    name: '',
    surname: '',
    email: '',
    phone: '',
    role: [],
  },
  eligibility: {
    isRegisteredOrWillBe: false,
    hadGrantRevocation: false,
    hasRelocated24Months: false,
    willNotRelocate24Months: false,
    isPartOfGroup: false,
  },
  localUnit: {
    municipality: '',
    province: '',
    address: '',
    postalCode: '',
  },
  requirements: {
    businessRegistry: false,
    sicilianLocation: false,
    buildingCompliance: false,
    financialCapacity: false,
    contributionRegularity: false,
  },
  investmentType: 'ampliamento',
  investmentPurpose: 'enhanceTourism',
  expenseTypes: [],
  investmentAmount: 'under100k',
  customInvestmentAmount: undefined,
  projectDescription: '',
  projectType: 'expansion',
  projectLocation: '',
  projectDuration: '',
  newPersonnel: false,
  degradedBuilding: false,
  historicalBuilding: false,
  expenses: {},
  totalAmount: 0,
  fundingAmount: 0,
  regimeType: 'normal',
  documents: {
    businessPlan: false,
    technicalDocuments: false,
    permits: false,
    financialStatements: false,
  },
  discoveryChannel: '',
  otherDiscoveryChannel: '',
  gdprConsent: false,
  marketingConsent: false,
  score: 0,
};
