import { ModalBody, Stack } from '@chakra-ui/react';
import { Project } from '../../pages/Home';
import { upsertProjectFormSchema } from '../../schemas';
import { Input } from '../Form/Input';

interface UpsertBodyProps {
  newProject: Project;
  setNewProject: (project: Project) => void;
}

export const UpsertBody = ({ newProject, setNewProject }: UpsertBodyProps) => {
  return (
    <ModalBody>
      <Stack spacing="4">
        <Input
          name="title"
          label="Título do Projeto"
          value={newProject.title}
          onChange={(event) =>
            setNewProject({ ...newProject, title: event.target.value })
          }
          isRequired
          schema={upsertProjectFormSchema.fields.title}
        />
        <Input
          name="zip_code"
          label="CEP"
          type="number"
          value={newProject.zip_code.toString()}
          onChange={(event) => {
            setNewProject({
              ...newProject,
              zip_code: Number(event.target.value),
            });
          }}
          isRequired
          schema={upsertProjectFormSchema.fields.zip_code}
        />
        <Input
          name="cost"
          label="Custo"
          type="number"
          value={newProject.cost.toString()}
          onChange={(event) => {
            setNewProject({
              ...newProject,
              cost: Number(event.target.value),
            });
          }}
          isRequired
          schema={upsertProjectFormSchema.fields.cost}
        />
        <Input
          name="deadline"
          type="date"
          label="Prazo"
          value={newProject.deadline.split('T')[0]}
          onChange={(event) =>
            setNewProject({
              ...newProject,
              deadline: event.target.value + 'T00:00:00.000Z',
            })
          }
          isRequired
          schema={upsertProjectFormSchema.fields.deadline}
        />
      </Stack>
    </ModalBody>
  );
};
