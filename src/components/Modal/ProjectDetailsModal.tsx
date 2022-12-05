import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import { Input } from '../Form/Input';
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

  const { isLoading, getProjectDetails } = useProjects();

  useEffect(() => {
    getProjectDetails(id).then((response) => {
      setProject(response);
    });
  }, [id]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <ModalHeader>Detalhes do Projeto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Text>Titulo: {project?.title}</Text>
              <Text>Cidade: {project?.city}</Text>
              <Text>Preço: {project?.cost}</Text>
              <Text>Prazo: {project?.deadline}</Text>
              <Text>Concluído: {project?.done ? 'Sim' : 'Não'}</Text>
              <Text>Criado em: {project?.created_at}</Text>
              <Text>Atualizado em: {project?.updated_at}</Text>
            </>
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
