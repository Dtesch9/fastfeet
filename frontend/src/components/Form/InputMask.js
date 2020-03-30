import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactInputMask from 'react-input-mask';

import { useField } from '@unform/core';

const InputMask = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref) {
        ref.setInputValue('');
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
  );
};

export default InputMask;

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
};
