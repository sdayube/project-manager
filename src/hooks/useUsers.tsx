import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const createUser = async (
    name: string,
    username: string,
    password: string,
  ) => {
    setIsLoading(true);
    await axios
      .post('http://localhost:3333/users', {
        name,
        username,
        password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          toast({
            title: 'Erro',
            description:
              error.response!.status === 400
                ? 'Usuário já cadastrado'
                : error.response!.data.error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, createUser };
};
