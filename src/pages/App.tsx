import { Box, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
  return (
    <VStack
      w={'100vw'}
      minH={'100vh'}
      bgImage={'linear-gradient(234deg, rgba(32,58,67,1) 81%, rgba(0,0,0,1) 98%, rgba(15,32,39,1) 100%)'}
      color={'whiteAlpha.800'}
    >
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <Box w={'100%'} h={'100%'} px={5}>
          <Outlet />
        </Box>
      </DndProvider>
    </VStack>
  );
};
