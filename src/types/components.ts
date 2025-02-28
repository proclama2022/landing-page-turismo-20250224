import { FormState } from './form';

export interface BaseStepProps {
  formData: FormState;
  onUpdate: (field: keyof FormState, value: any) => void;
}

export type StepUpdateFunction = (field: keyof FormState, value: any) => void; 