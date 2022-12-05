import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AnySchema } from 'yup';

interface InputProps extends ChakraInputProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  schema?: AnySchema | null;
  onChange: (event: any) => void;
}

export const Input = ({
  name,
  label,
  type = 'text',
  value,
  schema = null,
  onChange,
  ...rest
}: InputProps) => {
  const [hasBlurredOnce, setHasBlurredOnce] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBlur = () => {
    setHasBlurredOnce(true);
    if (schema) {
      schema
        .validate(value)
        .then(() => {
          setHasError(false);
        })
        .catch((error) => {
          setHasError(true);
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <FormControl isInvalid={hasError && hasBlurredOnce}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraInput
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        variant="filled"
        focusBorderColor="orange.500"
        bgColor="gray.900"
        _hover={{
          bgColor: 'gray.900',
        }}
        size="lg"
        {...rest}
      />
      {hasError && hasBlurredOnce && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};
