import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput } from 'react-native';
import { useField } from '@unform/core';

function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      getValue(ref) {
        return ref._lastNativeText || '';
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        ref.setNativeProps({ text: '' });
        ref._lastNativeText = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {!!label && <Text>{label}</Text>}

      <TextInput ref={inputRef} defaultValue={defaultValue} {...rest} />
    </>
  );
}

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Input.defaultProps = {
  label: null,
};
