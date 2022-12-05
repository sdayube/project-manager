import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from './useAuth';

export const useProjects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const toast = useToast();
  const { authData, logout } = useAuth();

  const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        logout();
      } else {
        toast({
          title: 'Erro',
          description: error.response!.data.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setHasError(true);
      }
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    setHasError(false);

    const data = await axios
      .get('http://localhost:3333/projects', {
        headers: {
          Authorization: `Bearer ${authData.token}`,
          username: authData.username,
        },
      })
      .then((response) => response.data)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));

    return data;
  };

  const getProjectDetails = async (id: string) => {
    setIsLoading(true);

    const details = await axios
      .get('http://localhost:3333/project', {
        headers: {
          Authorization: `Bearer ${authData.token}`,
          username: authData.username,
          id,
        },
      })
      .then((response) => response.data)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));

    return details;
  };

  return { isLoading, hasError, fetchProjects, getProjectDetails };
};
