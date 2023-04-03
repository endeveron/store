import { useCallback, useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import classNames from 'classnames';

import { Loading } from 'components';
import { useDebounce } from 'common/hooks/useDebounce';
import { CloseIcon, SearchIcon } from 'assets/ui';

import './SearchForm.scss';

type SearchFormProps = {
  isLoading: boolean;
  onSubmit: (query: string) => void;
  onClear: () => void;
};

const SearchForm = ({ isLoading, onClear, onSubmit }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedValue = useDebounce<string>(inputValue, 1000);

  const inputRef = useRef();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleClear = () => {
    setInputValue('');
    inputRef?.current && (inputRef.current as HTMLInputElement).focus();
    onClear();
  };

  const handleInputSubmit = useCallback(
    (value: string) => {
      if (!value) return;
      // Validate the input value
      const query = value.replace(/[^a-z\d\s"]+/gi, '');

      query && onSubmit(query);
    },
    [onSubmit]
  );

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!inputValue) return;
  //   handleInputSubmit(inputValue)
  // };

  useEffect(() => {
    handleInputSubmit(debouncedValue);
  }, [debouncedValue, handleInputSubmit]);

  const iconEl = (
    <div className="search-form__icon">
      {isLoading ? (
        <Loading size="1.25rem" />
      ) : (
        <SearchIcon className="search-form__icon--search icon icon--inverse" />
      )}
    </div>
  );

  const fieldEl = (
    <div className="search-form__field form-field form-field--text">
      <TextField
        inputRef={inputRef}
        id="query"
        label="Find a product"
        name="query"
        type="text"
        onChange={handleInputChange}
        value={inputValue}
        fullWidth
        autoFocus
      />
    </div>
  );

  const clearEl = (
    <CloseIcon
      onClick={handleClear}
      className={classNames('search-form__clear icon icon--inverse', {
        'search-form__clear--active': inputValue,
      })}
    />
  );

  return (
    <form
      className="search-form"
      // onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      {iconEl}
      {fieldEl}
      {clearEl}
    </form>
  );
};

export { SearchForm };
