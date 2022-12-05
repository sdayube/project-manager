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
import { upsertProjectFormSchema } from '../../schemas';

interface ProjectCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshProjects: () => void;
}

const generateInitialValues = () => ({
  id: '',
  title: '',
  zip_code: 0,
  deadline: '',
  cost: 0,
  done: false,
});

export const ProjectCreateModal = ({
  isOpen,
  onClose,
  refreshProjects,
}: ProjectCreateModalProps) => {
  const toast = useToast();
  const { authData, logout } = useAuth();
  const [newProject, setNewProject] = useState<Project>(
    generateInitialValues(),
  );

  const { createProject } = useProjects();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { title, zip_code, cost, deadline } = newProject;

    await createProject(title, zip_code, cost, deadline).then(() => {
      refreshProjects();
      onClose();
      setNewProject(generateInitialValues());
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.800" as="form" onSubmit={handleSubmit}>
        <ModalHeader>Criar Novo Projeto</ModalHeader>
        <ModalCloseButton />
        <UpsertBody newProject={newProject} setNewProject={setNewProject} />
        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            type="submit"
            disabled={!upsertProjectFormSchema.isValidSync(newProject)}
          >
            Criar Projeto
          </Button>
          <Button colorScheme="orange" mr={3} onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
