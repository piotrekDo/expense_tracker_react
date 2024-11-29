import { Box, VStack } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet } from 'react-router-dom';
import { BG_GRADIENT } from '../../library';
import Navbar from '../components/Navbar';

export const App = () => {
  return (
    <VStack w={'100vw'} minH={'100vh'} bgImage={BG_GRADIENT} color={'whiteAlpha.800'}>
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <Box w={'100%'} h={'100%'} px={5}>
          <Outlet />
        </Box>
      </DndProvider>
    </VStack>
  );
};
