import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Tag, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { CategoryGroup } from '../model/Category';

interface Props {
  g: CategoryGroup;
  handleStartUpdating: (g: CategoryGroup) => void;
}

export const CategoryGroupCard = ({ g, handleStartUpdating }: Props) => {
  const [hovering, setHovering] = useState(false);
  return (
    <VStack
      justify={'start'}
      align={'start'}
      key={g.categoryGroupId}
      mx={1}
      minW={'200px'}
      minH={'300px'}
      bg={'teal.600'}
      borderRadius={'15px'}
      p={3}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <HStack w={'100%'} position={'relative'}>
        <Text>{g.categoryGroupName}</Text>
        <Box
          pos={'absolute'}
          top={0}
          right={hovering ? 0 : -10}
          opacity={hovering ? 1 : 0}
          transitionProperty={'right opacity'}
          transitionDuration={'.2s'}
          cursor={'pointer'}
          onClick={() => handleStartUpdating(g)}
        >
          <EditIcon fontSize={'1.5rem'} />
        </Box>
      </HStack>
      <VStack align={'start'} justify={'start'} pl={2}>
        {g.categories.map(c => (
          <Tag key={c.id} colorScheme='teal' variant={'solid'} size={'lg'} mx={1}>
            {c.name}
          </Tag>
        ))}
      </VStack>
    </VStack>
  );
};
