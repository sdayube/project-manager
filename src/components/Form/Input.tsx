import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (event: any) => void;
}

export const Input = ({
  name,
  label,
  type = 'text',
  value,
  onChange,
  ...rest
}: InputProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraInput
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        variant="filled"
        focusBorderColor="orange.500"
        bgColor="gray.900"
        _hover={{
          bgColor: 'gray.900',
        }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
};
