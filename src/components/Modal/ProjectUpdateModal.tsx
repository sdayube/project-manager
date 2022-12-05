import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useProjects } from '../../hooks/useProjects';
import { Project } from '../../pages/Home';
import { UpsertBody } from './UpsertBody';

interface ProjectUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  refreshProjects: () => void;
}

export const ProjectUpdateModal = ({
  isOpen,
  onClose,
  project,
  refreshProjects,
}: ProjectUpdateModalProps) => {
  const toast = useToast();
  const { authData, logout } = useAuth();
  const [newProject, setNewProject] = useState<Project>(project);

  const { updateProject } = useProjects();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { id, title, zip_code, cost, deadline } = newProject;

    await updateProject(id, title, zip_code, cost, deadline).then(() => {
      refreshProjects();
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.800" as="form" onSubmit={handleSubmit}>
        <ModalHeader>Editar Projeto</ModalHeader>
        <ModalCloseButton />
        <UpsertBody newProject={newProject} setNewProject={setNewProject} />
        <ModalFooter>
          <Button colorScheme="green" mr={3} type="submit">
            Encerrar Edição
          </Button>
          <Button colorScheme="orange" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
