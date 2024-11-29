import { RepeatIcon } from '@chakra-ui/icons';
import { Badge, Box, Flex, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import useManageTranCategories from '../hooks/useManageTranCategories';
import { Category } from '../model/Category';
import itemTypes from '../model/Dragable';
import { ManageCategories, Transaction } from '../model/Transaction';
import { trim } from '../utils';

interface Props {
  t: Transaction;
}

export const DropableTransactionCard = ({ t }: Props) => {
  const [tranCategories, setTranCategories] = useState<Category[]>(t.categories);
  const { mutate: manage } = useManageTranCategories();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: itemTypes.CATEGORY,
    drop: (category: Category, monitor) => {
      setTranCategories(prev => [...prev, category]);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleMutate = () => {
    const request: ManageCategories = {
      transaction: t.tranSystemId,
      categories: tranCategories.map(c => c.id),
    };
    manage(request);
  };

  const handleRemoveCategory = (id: number) => {
    setTranCategories(prev => [...prev.filter(c => c.id != id)]);
  };

  return (
    <VStack
      ref={drop}
      position={'relative'}
      w={'200px'}
      h={'250px'}
      borderRadius={'5px'}
      p={2}
      m={1}
      bg={t.amount > 0 ? 'teal.400' : 'teal.600'}
      opacity={isOver ? 0.8 : 1}
    >
      {tranCategories.length > 0 && (
        <Box
          pos={'absolute'}
          right={2}
          cursor={'pointer'}
          _hover={{ transform: 'rotate(180deg)' }}
          transition={'transform .25s'}
          onClick={handleMutate}
        >
          <RepeatIcon fontSize={'1.5rem'} color={'green.200'} />
        </Box>
      )}
      <Text flex={'0 0 20%'} fontWeight={700} fontSize={'1.3rem'}>
        <Tooltip label={t.merchantData}>
          {t.knownVendorName ? trim(t.knownVendorName, 15) : trim(t.merchantData, 15)}
        </Tooltip>
      </Text>
      <Text>
        {t.tranDate.toLocaleDateString('pl-PL', { weekday: 'short', day: '2-digit', month: 'short', year: '2-digit' })}
      </Text>
      <Tooltip label={t.title}>
        <Text flex={'0 0 20%'}>{trim(t.title, 20)}</Text>
      </Tooltip>
      <Text flex={'0 0 15%'} fontWeight={700} fontSize={'1.2rem'} as={'em'}>
        {t.amount} PLN
      </Text>
      <Flex w={'100%'} wrap={'wrap'} p={1} justify={'center'} align={'center'}>
        {tranCategories.map(c => (
          <Box key={c.id} pos={'relative'} onClick={() => handleRemoveCategory(c.id)}>
            <Badge variant={'solid'} m={1} colorScheme='green' p={1} _hover={{ color: 'red' }} cursor={'pointer'}>
              {c.name}
            </Badge>
          </Box>
        ))}
      </Flex>
    </VStack>
  );
};
