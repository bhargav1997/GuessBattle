import React, { memo, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import Input, { FormGroup, Label, ErrorMessage } from './Input';

interface OptimizedInputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

// Using React.memo to prevent unnecessary re-renders
const OptimizedInput: React.FC<OptimizedInputProps> = memo(({
  id,
  type,
  placeholder,
  value,
  onChange,
  fullWidth = false,
  error = false,
  errorMessage,
  label
}) => {
  return (
    <FormGroup>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
        error={error}
      />
      {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FormGroup>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to determine if the component should re-render
  // Only re-render if these props change
  return (
    prevProps.value === nextProps.value &&
    prevProps.error === nextProps.error &&
    prevProps.errorMessage === nextProps.errorMessage
  );
});

export default OptimizedInput;
