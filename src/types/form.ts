export const ATECO_CODES = [
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
  '55.3 AREE DI CAMPEGGIO E AREE ATTREZZATE PER CAMPER E ROULOTTE',
  '55.30 Aree di campeggio e aree attrezzate per camper e roulotte'
] as const;

export type Role = 'imprenditore' | 'collaboratore' | 'altro';

export type CompanySize = 'micro' | 'piccola' | 'media' | 'grande';

export type ProjectType = 
  | 'expansion'
  | 'newConstruction'
  | 'completion';

export type RegimeType = 'normal' | 'deMinimis' | 'exemption';

export type InvestmentType = 
  | 'ampliamento'
  | 'nuova_struttura'
  | 'recupero_immobile';

export type InvestmentPurpose = 
  | 'enhanceTourism'      // Potenziamento dell'offerta turistica
  | 'qualityStandards'    // Innalzamento degli standard qualitativi
  | 'serviceImprovement'  // Ampliamento e miglioramento dei servizi
  | 'reuseProperty';      // Riutilizzo produttivo di beni immobili

export type ExpenseType = 
  | 'propertyPurchase'        // acquisto di suolo aziendale, fabbricati
  | 'construction'            // demolizioni e ricostruzioni
  | 'projectManagement'       // oneri di progettazione
  | 'equipment'              // nuovi macchinari, impianti, arredi
  | 'consulting'             // consulenze specialistiche
  | 'feasibilityStudy'       // studi di fattibilità
  | 'environmentalCert'      // certificazioni ambientali
  | 'energyCert'            // attestati prestazione energetica
  | 'intellectualProperty'   // brevetti, licenze
  | 'rainwaterSystem'       // impianti recupero acque
  | 'ledLighting'           // relamping LED
  | 'homeAutomation'        // gestione domotica
  | 'solarThermal'          // solare termico
  | 'photovoltaic'          // impianti fotovoltaici
  | 'thermalEfficiency';    // miglioramento prestazioni termiche

export type InvestmentAmount = 
  | '100k'
  | '400k'
  | '1m'
  | 'over_1m';

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
  // Step 1: Dati di contatto
  contact: {
    email: string;
    name: string;
    surname: string;
    phone: string;
    role: Role[];
  };

  // Step 2: Requisiti di ammissibilità
  eligibility: {
    isRegistered: boolean;
    hasClassificationRequirements: boolean;
    hadGrantRevocation: boolean;
    hasRelocated24Months: boolean;
    willNotRelocate24Months: boolean;
    isPartOfGroup: boolean;
  };

  // Step 3: Anagrafica aziendale
  companyName: string;
  vatNumber: string;
  constitutionDate?: string;
  registrationDate?: string;
  atecoCode: string;
  companySize: CompanySize;

  // Step 4: Unità locale
  localUnit: {
    municipality: string;
    province: string;
    address: string;
    postalCode: string;
  };

  // Step 5: Dettagli investimento
  project: {
    description: string;
    investmentType: InvestmentType;
    purposes: string[];
    expenses: string[];
    willHireStaff: boolean;
    involvesDegradedProperty: boolean;
    isHistoricalProperty: boolean;
    investmentAmount: InvestmentAmount;
  };

  // Step 6: Altro
  discoveryChannel: string;
  gdprConsent: boolean;
}

export const DEFAULT_FORM_STATE: FormState = {
  contact: {
    email: '',
    name: '',
    surname: '',
    phone: '',
    role: []
  },
  eligibility: {
    isRegistered: false,
    hasClassificationRequirements: false,
    hadGrantRevocation: false,
    hasRelocated24Months: false,
    willNotRelocate24Months: false,
    isPartOfGroup: false
  },
  companyName: '',
  vatNumber: '',
  atecoCode: '',
  companySize: 'micro',
  localUnit: {
    municipality: '',
    province: '',
    address: '',
    postalCode: ''
  },
  project: {
    description: '',
    investmentType: 'ampliamento',
    purposes: [],
    expenses: [],
    willHireStaff: false,
    involvesDegradedProperty: false,
    isHistoricalProperty: false,
    investmentAmount: '100k'
  },
  discoveryChannel: '',
  gdprConsent: false
};
