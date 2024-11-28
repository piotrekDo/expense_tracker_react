import { Box, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export const App = () => {
  return (
    <VStack
      w={'100vw'}
      minH={'100vh'}
      bgImage={'linear-gradient(234deg, rgba(32,58,67,1) 81%, rgba(0,0,0,1) 98%, rgba(15,32,39,1) 100%)'}
      color={'whiteAlpha.800'}
    >
      <Navbar />
      <Box w={'100%'} h={'100%'} px={5}>
        <Outlet />
      </Box>
    </VStack>
  );
};
