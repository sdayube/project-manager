import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from './useAuth';

export const useProjects = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const headers = {
    Authorization: `Bearer ${authData.token}`,
    username: authData.username,
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    setHasError(false);

    const data = await axios
      .get('http://localhost:3333/projects', { headers })
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
          ...headers,
          id,
        },
      })
      .then((response) => response.data)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));

    return details;
  };

  const createProject = async (
    title: string,
    zip_code: number,
    cost: number,
    deadline: string,
  ) => {
    setIsLoading(true);

    const data = await axios
      .post(
        'http://localhost:3333/project',
        {
          title,
          zip_code,
          cost,
          deadline,
        },
        { headers },
      )
      .then((response) => response.data)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));

    return data;
  };

  const updateProject = async (
    id: string,
    title: string,
    zip_code: number,
    cost: number,
    deadline: string,
  ) => {
    setIsLoading(true);

    await axios
      .put(
        `http://localhost:3333/projects/${id}`,
        {
          title,
          zip_code,
          cost,
          deadline,
        },
        {
          headers,
        },
      )
      .then((response) => response.data)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  };

  return {
    isLoading,
    hasError,
    fetchProjects,
    getProjectDetails,
    createProject,
    updateProject,
  };
};
