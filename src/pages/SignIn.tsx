import { Button, Flex, Stack, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Input } from '../components/Form/Input';
import { CreateAccountModal } from '../components/Modal/CreateAccountModal';
import { useAuth } from '../hooks/useAuth';
import { signInFormSchema } from '../schemas';

export const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authData, login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (authData) {
      navigate('/home');
    }
  }, [authData, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login({ username, password });
  };

  return (
    <>
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit}
        >
          <Stack spacing="4">
            <Input
              name="username"
              label="Usuário"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              isRequired
              schema={signInFormSchema.fields.username}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              isRequired
              schema={signInFormSchema.fields.password}
            />
          </Stack>
          <Button
            type="submit"
            mt="6"
            colorScheme="orange"
            size="lg"
            disabled={!username || !password}
          >
            Login
          </Button>
          <Button
            type="button"
            mt="6"
            colorScheme="orange"
            size="lg"
            onClick={() => setIsModalOpen(true)}
          >
            Criar conta
          </Button>
        </Flex>
      </Flex>
      <CreateAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
