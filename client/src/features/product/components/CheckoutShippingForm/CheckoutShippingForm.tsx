import { useEffect, useState } from 'react';

import { useDebounce } from 'common/hooks/useDebounce';
import { useForm } from 'common/hooks/useForm';
import { FormField as IFormField, FormInputValuesMap } from 'common/types/form';
import { validateAddress, validateCity } from 'common/utils/validate';
import { Button, FormField } from 'components';
import { ShippingFormData } from 'features/product';
import { CheckmarkIcon } from 'assets/ui';

import './CheckoutShippingForm.scss';

const fields: IFormField[] = [
  {
    name: 'city',
    label: 'City',
    type: 'text',
    isRequired: true,
    validator: validateCity,
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    isRequired: true,
    validator: validateAddress,
  },
];

type CheckoutShippingFormProps = {
  onSubmitted: (shippingData: ShippingFormData) => void;
};

const CheckoutShippingForm = ({ onSubmitted }: CheckoutShippingFormProps) => {
  const { inputValues, handleInputChange, updateInputValues, validateInputs } =
    useForm(fields);
  const debouncedInputValues = useDebounce<FormInputValuesMap>(
    inputValues,
    1000
  );

  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Restore the shipping data from the session storage
  if (!inputValues?.city?.value) {
    const restoredShippingData = restoreDataFromStorage();

    if (restoredShippingData) {
      updateInputValues(restoredShippingData);
      setIsValid(true);
    }
  }

  const handleFormTouch = () => {
    if (!isTouched) setIsTouched(true);
  };

  // Validate inputs
  useEffect(() => {
    if (!isTouched || isReady) return;
    let isFormValid = validateInputs();
    setIsValid(isFormValid);

    // eslint-disable-next-line
  }, [debouncedInputValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = validateInputs();
    if (!isValid) return;

    const prepareOutputData = (inputValues: FormInputValuesMap) => {
      let result = {} as ShippingFormData;

      for (let name in inputValues) {
        const fieldData = inputValues[name];
        result = {
          ...result,
          [name]: fieldData.value,
        };
      }
      return result;
    };

    const shippingData = prepareOutputData(inputValues);
    onSubmitted(shippingData);
    saveDataToStorage(shippingData);
    setIsReady(true);
  };

  function restoreDataFromStorage() {
    const savedData = sessionStorage.getItem('shippingData');
    return savedData ? JSON.parse(savedData) : null;
  }

  function saveDataToStorage(shippingData: ShippingFormData) {
    sessionStorage.setItem('shippingData', JSON.stringify(shippingData));
  }

  const submitButtonEl = (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={!isValid || isReady}
      fullWidth={false}
      startIcon={
        isReady && <CheckmarkIcon className="checkout-shipping-form__icon" />
      }
      className="checkout-shipping-form__button fade"
    >
      {isReady ? 'Confirmed' : 'Confirm'}
    </Button>
  );

  return (
    <form
      className="checkout-shipping-form"
      autoComplete="off"
      onClick={handleFormTouch}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="checkout-shipping-form__fields">
        {fields.map((data) => (
          <FormField
            variant="outlined"
            disabled={isReady}
            label={data.label}
            name={data.name}
            type={data.type}
            inputData={inputValues[data.name]}
            onChange={handleInputChange}
            fullWidth={true}
            required={data.isRequired ? data.isRequired : false}
            key={data.name}
          />
        ))}
      </div>
      <div className="checkout-shipping-form__action">{submitButtonEl}</div>
    </form>
  );
};

export { CheckoutShippingForm };
