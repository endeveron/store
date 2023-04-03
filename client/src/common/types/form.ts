export interface FormFieldData {
  value: string;
  error: string | null;
}

type FormFieldType = 'text' | 'email' | 'password';

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  validator: (fieldData: FormFieldData) => void;
  isRequired?: boolean;
  autoFocus?: boolean;
}

export interface FormInputValues {
  [name: string]: string;
}

export interface FormInputValuesMap {
  [name: string]: FormFieldData;
}
