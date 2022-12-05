import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

import { Header } from '../components/Header';
import { ProjectCreateModal } from '../components/Modal/ProjectCreateModal';
import { ProjectDetailsModal } from '../components/Modal/ProjectDetailsModal';
import { ProjectUpdateModal } from '../components/Modal/ProjectUpdateModal';
import { MainTable } from '../components/Table/MainTable';
import { useAuth } from '../hooks/useAuth';
import { useProjects } from '../hooks/useProjects';

export interface Project {
  id: string;
  title: string;
  zip_code: number;
  deadline: string;
  cost: number;
  done: boolean;
}

export const Home = () => {
  const [hasError, setHasError] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const [detailsId, setDetailsId] = useState('');
  const [projectToUpdate, setProjectToUpdate] = useState<Project | null>(null);

  const { authData, logout } = useAuth();
  const { fetchProjects, finishProject, deleteProject, isLoading } =
    useProjects();

  const handleFetchProjects = async () => {
    await fetchProjects().then((response) => {
      setProjects(response);
    });
  };

  useEffect(() => {
    handleFetchProjects();
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
            onClick={() => setCreateModalOpen(true)}
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
            <MainTable
              projects={projects}
              setDetailsId={setDetailsId}
              setIsDetailsModalOpen={setIsDetailsModalOpen}
              setProjectToUpdate={setProjectToUpdate}
              setUpdateModalOpen={setUpdateModalOpen}
              handleFetchProjects={handleFetchProjects}
            />
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
      {projectToUpdate && (
        <ProjectUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setUpdateModalOpen(false);
            setProjectToUpdate(null);
          }}
          project={projectToUpdate}
          refreshProjects={() => handleFetchProjects()}
        />
      )}
      <ProjectCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
        }}
        refreshProjects={() => handleFetchProjects()}
      />
    </>
  );
};
