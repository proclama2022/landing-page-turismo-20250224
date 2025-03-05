import { DocumentFields, FormState, RegimeType } from '@/types/form';
import * as z from 'zod';

// Validazione dell'investimento con zod
export const InvestmentValidation = z.object({
  customInvestmentAmount: z.number()
    .min(62500, "L'importo minimo ammissibile è €62.500 (80% di €50.000)")
    .max(3500000, "L'importo massimo ammissibile è €3.500.000"),
  companySize: z.enum(['micro', 'piccola', 'media', 'grande'], {
    required_error: "Seleziona la dimensione aziendale"
  })
}).refine((data: {
  companySize: 'micro' | 'piccola' | 'media' | 'grande';
  customInvestmentAmount: number;
}) => {
  // Verifica combinata dimensione aziendale e importo
  if (data.companySize === 'grande') {
    if (data.customInvestmentAmount <= 300000) {
      throw new Error("Le grandi imprese non sono ammissibili al regime De Minimis (importi ≤ €300.000)");
    }
    return data.customInvestmentAmount <= 3500000;
  }
  return true;
}, {
  message: "Per grandi imprese l'importo deve essere compreso tra €300.001 e €3.500.000",
  path: ["customInvestmentAmount"]
});

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

export const validateCompanyInfo = (formData: Pick<FormState, 'vatNumber' | 'atecoCode' | 'companySize'> & { company?: { companyName?: string } }): string[] => {
  const errors: string[] = [];

  if (!formData.vatNumber) errors.push('Partita IVA è obbligatoria');
  if (!formData.atecoCode) errors.push('Codice ATECO è obbligatorio');
  if (!formData.companySize) errors.push('Dimensione azienda è obbligatoria');

  return errors;
};

export const validateRequirements = (requirements: FormState['requirements']): string[] => {
  const errors: string[] = [];

  if (!requirements.businessRegistry) errors.push('Iscrizione al registro imprese è obbligatoria');
  if (!requirements.buildingCompliance) errors.push('Conformità edilizia è obbligatoria');
  if (!requirements.financialCapacity) errors.push('Capacità finanziaria è obbligatoria');
  if (!requirements.contributionRegularity) errors.push('Regolarità contributiva è obbligatoria');

  return errors;
};

export const validateEligibility = (eligibility: FormState['eligibility']): string[] => {
    const errors: string[] = [];
    if (eligibility && !eligibility.isRegisteredOrWillBe) errors.push('La società deve essere costituita o in via di costituzione');
    return errors
}

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
      errors.push(...validateCompanyInfo({ ...formData.company, vatNumber: formData.vatNumber, atecoCode: formData.atecoCode, companySize: formData.companySize }));
      break;

    case 1: // Eligibility
      errors.push(...validateEligibility(formData.eligibility));
      break;

    case 2: // Requirements
      errors.push(...validateRequirements(formData.requirements));
      break;
      
    case 3: // Company Info
      errors.push(...validateCompanyInfo({ ...formData.company, vatNumber: formData.vatNumber, atecoCode: formData.atecoCode, companySize: formData.companySize }));
      break;

    case 4: // Project Details
      errors.push(...validateProjectDetails(formData));
      break;

    case 5: // Documents
      errors.push(...validateDocuments(formData.documents, formData.regimeType));
      break;
      
    default:
      break;
  }

  return errors;
};

export const canSubmitForm = (formData: FormState): boolean => {
  const allValidations = [
    ...validateCompanyInfo({ ...formData.company, vatNumber: formData.vatNumber, atecoCode: formData.atecoCode, companySize: formData.companySize }),
    ...validateEligibility(formData.eligibility),
    ...validateRequirements(formData.requirements),
    ...validateProjectDetails(formData),
    ...validateExpenses(formData.expenses, formData.totalAmount),
    ...validateDocuments(formData.documents, formData.regimeType),
    ...validateFundingAmount(formData.fundingAmount, formData.regimeType)
  ];

  return allValidations.length === 0 && formData.gdprConsent;
};

export const validateInvestment = (value: number, companySize: string) => {
  const MIN_DE_MINIMIS = 62500;  // 80% di 50.000€
  const MAX_DE_MINIMIS = 375000; // 80% di 300.000€
  
  // Calcolo massimo regime ordinario
  const ordinaryLimits: Record<string, number> = {
    micro: 3500000 * 0.6,  // 2.100.000€
    small: 3500000 * 0.6,  // 2.100.000€
    medium: 3500000 * 0.5, // 1.750.000€
    large: 3500000 * 0.4   // 1.400.000€
  };

  if (value < MIN_DE_MINIMIS) {
    return `Importo minimo richiesto: €${MIN_DE_MINIMIS.toLocaleString('it-IT')}`;
  }

  if (value <= MAX_DE_MINIMIS) return true;
  
  // Supera de minimis, applica regime ordinario
  if (!companySize) return "Selezionare la dimensione aziendale al punto 3";
  
  const maxOrdinary = ordinaryLimits[companySize];
  return value <= maxOrdinary || 
    `Supera il massimo per ${companySize} (€${maxOrdinary.toLocaleString('it-IT')})`;
};
