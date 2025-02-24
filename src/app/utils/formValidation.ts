import { DocumentFields, FormState, RegimeType } from '../types/form';

interface DocumentValidation {
  id: DocumentFields;
  label: string;
  required: boolean | ((regimeType: RegimeType) => boolean);
}

const documentValidations: DocumentValidation[] = [
  {
    id: 'businessPlan',
    label: 'Business Plan',
    required: true
  },
  {
    id: 'technicalDocuments',
    label: 'Documentazione Tecnica',
    required: true
  },
  {
    id: 'permits',
    label: 'Autorizzazioni e Permessi',
    required: true
  },
  {
    id: 'financialStatements',
    label: 'Bilanci',
    required: (regimeType) => regimeType === 'exemption'
  }
];

export const validateCompanyInfo = (formData: Pick<FormState, 'companyName' | 'vatNumber' | 'atecoCode' | 'companySize'>): string[] => {
  const errors: string[] = [];
  
  if (!formData.companyName) errors.push('Ragione sociale è obbligatoria');
  if (!formData.vatNumber) errors.push('Partita IVA è obbligatoria');
  if (!formData.atecoCode) errors.push('Codice ATECO è obbligatorio');
  if (!formData.companySize) errors.push('Dimensione azienda è obbligatoria');

  return errors;
};

export const validateRequirements = (requirements: FormState['requirements']): string[] => {
  const errors: string[] = [];
  
  if (!requirements.businessRegistry) errors.push('Iscrizione al registro imprese è obbligatoria');
  if (!requirements.sicilianLocation) errors.push('Sede in Sicilia è obbligatoria');
  if (!requirements.buildingCompliance) errors.push('Conformità edilizia è obbligatoria');
  if (!requirements.financialCapacity) errors.push('Capacità finanziaria è obbligatoria');
  if (!requirements.contributionRegularity) errors.push('Regolarità contributiva è obbligatoria');

  return errors;
};

export const validateProjectDetails = (formData: Pick<FormState, 'projectType' | 'projectDescription' | 'projectLocation' | 'projectDuration'>): string[] => {
  const errors: string[] = [];

  if (!formData.projectType) errors.push('Tipologia progetto è obbligatoria');
  if (!formData.projectDescription) errors.push('Descrizione progetto è obbligatoria');
  if (!formData.projectLocation) errors.push('Ubicazione progetto è obbligatoria');
  if (!formData.projectDuration) errors.push('Durata progetto è obbligatoria');

  return errors;
};

export const validateExpenses = (expenses: Record<string, number>, totalAmount: number): string[] => {
  const errors: string[] = [];

  if (Object.keys(expenses).length === 0) {
    errors.push('È necessario inserire almeno una spesa');
  }

  if (totalAmount <= 0) {
    errors.push('Il totale delle spese deve essere maggiore di zero');
  }

  if (totalAmount > 1000000) {
    errors.push('Il totale delle spese non può superare 1.000.000€');
  }

  return errors;
};

export const validateFundingAmount = (amount: number, regimeType: RegimeType): string[] => {
  const errors: string[] = [];

  if (amount <= 0) {
    errors.push('L\'importo del finanziamento deve essere maggiore di zero');
  }

  if (regimeType === 'deMinimis' && amount > 200000) {
    errors.push('In regime de minimis il finanziamento non può superare 200.000€');
  }

  return errors;
};

export const validateDocuments = (
  documents: FormState['documents'],
  regimeType: RegimeType
): string[] => {
  const errors: string[] = [];

  documentValidations.forEach((validation) => {
    const isRequired = typeof validation.required === 'function'
      ? validation.required(regimeType)
      : validation.required;

    if (isRequired && !documents[validation.id]) {
      errors.push(`${validation.label} è obbligatorio`);
    }
  });

  return errors;
};

export const validateStep = (step: number, formData: FormState): string[] => {
  const errors: string[] = [];

  switch (step) {
    case 0: // Company Info
      errors.push(...validateCompanyInfo(formData));
      break;

    case 1: // Requirements
      errors.push(...validateRequirements(formData.requirements));
      break;

    case 2: // Project Details
      errors.push(...validateProjectDetails(formData));
      break;

    case 3: // Budget
      errors.push(...validateExpenses(formData.expenses, formData.totalAmount));
      break;

    case 4: // Documents
      errors.push(...validateDocuments(formData.documents, formData.regimeType));
      break;

    default:
      break;
  }

  return errors;
};

export const canSubmitForm = (formData: FormState): boolean => {
  const allValidations = [
    ...validateCompanyInfo(formData),
    ...validateRequirements(formData.requirements),
    ...validateProjectDetails(formData),
    ...validateExpenses(formData.expenses, formData.totalAmount),
    ...validateDocuments(formData.documents, formData.regimeType),
    ...validateFundingAmount(formData.fundingAmount, formData.regimeType)
  ];

  return allValidations.length === 0 && formData.gdprConsent;
};
