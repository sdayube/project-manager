import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  const { username } = useAuth().authData;

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text
        fontSize={['2xl', '3xl']}
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
      >
        project-manager
      </Text>
      <Flex align="center" ml="auto">
        {isWideVersion && <Text mr="4">{username}</Text>}
      </Flex>
    </Flex>
  );
};
