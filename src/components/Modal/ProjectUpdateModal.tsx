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
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useProjects } from '../../hooks/useProjects';
import { Project } from '../../pages/Home';
import { Input } from '../Form/Input';

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
        <ModalBody>
          <Stack spacing="4">
            <Input
              name="title"
              label="Título do Projeto"
              value={newProject.title}
              onChange={(event) =>
                setNewProject({ ...project, title: event.target.value })
              }
            />
            <Input
              name="zip_code"
              label="CEP"
              value={newProject.zip_code}
              onChange={(event) => {
                setNewProject({ ...project, zip_code: event.target.value });
              }}
            />
            <Input
              name="cost"
              label="Custo"
              value={newProject.cost.toString()}
              onChange={(event) => {
                setNewProject({
                  ...project,
                  cost: Number(event.target.value),
                });
              }}
            />
            <Input
              name="deadline"
              type="date"
              label="Prazo"
              value={newProject.deadline.split('T')[0]}
              onChange={(event) =>
                setNewProject({
                  ...project,
                  deadline: event.target.value + 'T00:00:00.000Z',
                })
              }
            />
          </Stack>
        </ModalBody>
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
