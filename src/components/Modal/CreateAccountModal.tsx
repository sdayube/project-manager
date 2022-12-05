import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useUsers } from '../../hooks/useUsers';
import { Input } from '../Form/Input';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAccountModal = ({
  isOpen,
  onClose,
}: CreateAccountModalProps) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const toast = useToast();
  const { createUser } = useUsers();

  const handleCloseModal = () => {
    setName('');
    setUsername('');
    setPassword('');
    setPasswordConfirmation('');
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    await createUser(name, username, password).then(() => {
      handleCloseModal();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.800" as="form" onSubmit={handleSubmit}>
        <ModalHeader>Novo usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="4">
            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              name="username"
              label="Nome de Usuário"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Input
              name="passwordConfirmation"
              type="password"
              label="Confirmação da Senha"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            colorScheme="orange"
            mr={3}
            disabled={!name || !username || !password || !passwordConfirmation}
          >
            Criar Conta
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
