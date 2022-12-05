import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useProjects } from '../../hooks/useProjects';

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

interface ProjectDetails {
  title: string;
  city: string;
  cost: number;
  deadline: string;
  done: boolean;
  created_at: string;
  updated_at: string;
}

export const ProjectDetailsModal = ({
  isOpen,
  onClose,
  id,
}: ProjectDetailsModalProps) => {
  const toast = useToast();
  const { authData, logout } = useAuth();
  const [project, setProject] = useState<ProjectDetails | null>(null);

  const { isLoading, hasError, getProjectDetails } = useProjects();

  useEffect(() => {
    getProjectDetails(id).then((response) => {
      setProject(response);
    });
  }, [id]);

  const handleDate = (date: string | undefined) => {
    if (date) {
      const newDate = new Date(date);
      return newDate.toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <ModalHeader>Detalhes do Projeto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Spinner />
          ) : hasError ? (
            <Text>Erro ao carregar os dados</Text>
          ) : (
            <Stack spacing="4">
              <Box>
                <Heading fontSize="sm">Titulo:</Heading>
                <Text>{project?.title}</Text>
              </Box>
              <Box>
                <Heading fontSize="sm">Cidade:</Heading>
                <Text>{project?.city}</Text>
              </Box>
              <Box>
                <Heading fontSize="sm">Custo:</Heading>
                <Text>{project?.cost}</Text>
              </Box>
              <Box>
                <Heading fontSize="sm">Prazo:</Heading>
                <Text>{handleDate(project?.deadline)}</Text>
              </Box>
              <Box>
                <Heading fontSize="sm">Status:</Heading>
                <Text>{project?.done ? 'Concluído' : 'Em andamento'}</Text>
              </Box>
              <Box>
                <Heading fontSize="sm">Criado em:</Heading>
                <Text>{handleDate(project?.created_at)}</Text>
              </Box>
              <Box>
                <Heading fontSize="sm">Atualizado em:</Heading>
                <Text>{handleDate(project?.updated_at)}</Text>
              </Box>
            </Stack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="orange" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
