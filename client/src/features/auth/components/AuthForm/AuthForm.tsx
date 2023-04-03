import { useForm } from 'common/hooks/useForm';
import { FormField as IFormField, FormInputValuesMap } from 'common/types/form';
import { LoginFormData, SignupFormData } from 'features/auth';
import { Loading, FormField, Button } from 'components';

import './AuthForm.scss';

type AuthFormProps = {
  fields: IFormField[];
  isLoading: boolean;
  submitBtnLabel: string;
  onSubmitted: (authData: LoginFormData | SignupFormData) => void;
};

const AuthForm = ({
  fields,
  isLoading,
  submitBtnLabel,
  onSubmitted,
}: AuthFormProps) => {
  const {
    inputValues,
    handleInputChange,
    handleClickShowPassword,
    showPassword,
    validateInputs,
  } = useForm(fields);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = validateInputs();
    if (!isValid) return;

    const prepareOutputData = (inputValues: FormInputValuesMap) => {
      let result = {} as LoginFormData | SignupFormData;

      for (let name in inputValues) {
        const fieldData = inputValues[name];
        result = {
          ...result,
          [name]: fieldData.value,
        };
      }
      return result;
    };

    const outputData = prepareOutputData(inputValues);
    onSubmitted(outputData);
  };

  const loadingEl = (
    <div className="auth-form__loading">
      <Loading />
    </div>
  );

  const submitButtonEl = (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isLoading}
      fullWidth={false}
      className="auth-form__button fade"
    >
      {submitBtnLabel}
    </Button>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="auth-form"
      autoComplete="off"
      noValidate
    >
      <div className="auth-form__fields-wrapper">
        {fields.map((data) => (
          <FormField
            variant="outlined"
            label={data.label}
            name={data.name}
            type={data.type}
            inputData={inputValues[data.name]}
            onChange={handleInputChange}
            fullWidth={true}
            autoFocus={data.autoFocus}
            required={data.isRequired ? data.isRequired : false}
            key={data.name}
            showPassword={showPassword}
            onPasswordToggle={handleClickShowPassword}
          />
        ))}
      </div>
      <div className="auth-form__actions-wrapper">
        <div className="auth-form__submit-button-wrapper">
          {isLoading ? loadingEl : submitButtonEl}
        </div>
      </div>
    </form>
  );
};

export { AuthForm };
