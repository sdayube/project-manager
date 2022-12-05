import {
  Button,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useProjects } from '../../hooks/useProjects';
import { Project } from '../../pages/Home';

interface MainTableProps {
  projects: Project[];
  setDetailsId: (id: string) => void;
  setIsDetailsModalOpen: (isOpen: boolean) => void;
  setProjectToUpdate: (project: Project | null) => void;
  setUpdateModalOpen: (isOpen: boolean) => void;
  handleFetchProjects: () => void;
}

export const MainTable = ({
  projects,
  setDetailsId,
  setIsDetailsModalOpen,
  setProjectToUpdate,
  setUpdateModalOpen,
  handleFetchProjects,
}: MainTableProps) => {
  const { finishProject, deleteProject } = useProjects();

  return (
    <Table colorScheme="whiteAlpha">
      <Thead>
        <Tr>
          <Th>Título</Th>
          <Th>CEP</Th>
          <Th>Custo</Th>
          <Th>Prazo</Th>
          <Th>Status</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {projects.map((project) => {
          return (
            <Tr key={project.id}>
              <Td>
                <Text>{project.title}</Text>
              </Td>
              <Td>
                <Text>{project.zip_code}</Text>
              </Td>
              <Td>
                <Text>R$ {project.cost}</Text>
              </Td>
              <Td>
                <Text>
                  {new Date(project.deadline).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })}
                </Text>
              </Td>
              <Td>
                <Text>
                  {project.done
                    ? 'Terminado'
                    : new Date(project.deadline) < new Date()
                    ? 'Atrasado'
                    : 'Em andamento'}
                </Text>
              </Td>
              <Td>
                <HStack spacing="2">
                  <Button
                    size="sm"
                    fontSize="xs"
                    colorScheme="orange"
                    onClick={() => {
                      setDetailsId(project.id);
                      setIsDetailsModalOpen(true);
                    }}
                  >
                    Detalhes
                  </Button>
                  <Button
                    size="sm"
                    fontSize="xs"
                    colorScheme="purple"
                    onClick={() => {
                      setProjectToUpdate(project);
                      setUpdateModalOpen(true);
                    }}
                  >
                    Editar
                  </Button>
                  {!project.done && (
                    <Button
                      size="sm"
                      fontSize="xs"
                      colorScheme="green"
                      onClick={() =>
                        finishProject(project.id).then(() => {
                          handleFetchProjects();
                        })
                      }
                    >
                      Concluir
                    </Button>
                  )}
                  <Button
                    size="sm"
                    fontSize="xs"
                    colorScheme="red"
                    onClick={() =>
                      deleteProject(project.id).then(() => {
                        handleFetchProjects();
                      })
                    }
                  >
                    Remover
                  </Button>
                </HStack>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
