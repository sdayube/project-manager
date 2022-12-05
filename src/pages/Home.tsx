import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

import { Header } from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { ProjectDetailsModal } from '../components/Modal/ProjectDetailsModal';
import { useProjects } from '../hooks/useProjects';

interface Project {
  id: string;
  title: string;
  zip_code: string;
  deadline: string;
  cost: number;
  done: boolean;
}

export const Home = () => {
  const [hasError, setHasError] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailsId, setDetailsId] = useState('');

  const { authData, logout } = useAuth();
  const { fetchProjects, isLoading } = useProjects();

  useEffect(() => {
    fetchProjects().then((response) => {
      setProjects(response);
    });
  }, []);

  return (
    <>
      <Header />
      <Box flex="1" borderRadius={8} bg="gray.800" p="8" marginX="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Projetos
          </Heading>

          <Button
            size="sm"
            fontSize="sm"
            colorScheme="orange"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          >
            Novo projeto
          </Button>
        </Flex>

        {isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : hasError ? (
          <Flex justify="center">
            <Text>Falha ao obter dados dos projetos.</Text>
          </Flex>
        ) : projects.length === 0 ? (
          <Flex justify="center">
            <Text>Nenhum projeto encontrado.</Text>
          </Flex>
        ) : (
          <>
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
                          {new Date(project.deadline).toLocaleDateString()}
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
                          {!project.done && (
                            <Button size="sm" fontSize="xs" colorScheme="green">
                              Concluir
                            </Button>
                          )}
                          <Button size="sm" fontSize="xs" colorScheme="red">
                            Remover
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </>
        )}
      </Box>
      {detailsId && (
        <ProjectDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          id={detailsId}
        />
      )}
    </>
  );
};
