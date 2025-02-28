import { DocumentFields, FormState, RegimeType } from '@/types/form';

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

export const validateStep = (step: number, formData: FormState): string[] => {
  const errors: string[] = [];

  switch (step) {
    case 0: // Personal Info
      if (!formData.firstName) errors.push('Il nome è obbligatorio');
      if (!formData.lastName) errors.push('Il cognome è obbligatorio');
      if (!formData.email) errors.push('L\'email è obbligatoria');
      if (!formData.phone) errors.push('Il telefono è obbligatorio');
      break;

    case 1: // Project Details
      if (!formData.projectTitle) errors.push('Il titolo del progetto è obbligatorio');
      if (!formData.projectDescription) errors.push('La descrizione del progetto è obbligatoria');
      if (!formData.projectStartDate) errors.push('La data di inizio è obbligatoria');
      if (!formData.projectEndDate) errors.push('La data di fine è obbligatoria');
      if (!formData.totalAmount) errors.push('L\'importo totale è obbligatorio');
      break;

    case 2: // Budget
      if (formData.equipmentCosts < 0) errors.push('I costi per attrezzature non possono essere negativi');
      if (formData.consultingCosts < 0) errors.push('I costi di consulenza non possono essere negativi');
      if (formData.trainingCosts < 0) errors.push('I costi di formazione non possono essere negativi');
      if (formData.marketingCosts < 0) errors.push('I costi di marketing non possono essere negativi');
      break;

    default:
      break;
  }

  return errors;
};

export const canSubmitForm = (formData: FormState): boolean => {
  const allValidations = validateStep(0, formData).concat(
    validateStep(1, formData),
    validateStep(2, formData)
  );

  return allValidations.length === 0;
};
