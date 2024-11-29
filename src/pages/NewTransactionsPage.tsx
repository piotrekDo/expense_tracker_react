import React, { useEffect, useState } from 'react';
import useNewTransactions from '../hooks/useNewTransactions';
import { Button, VStack, Text, Flex, HStack, Badge } from '@chakra-ui/react';
import useCategories from '../hooks/useCategories';
import { DragableCategory } from '../components/DragableCategory';
import { DropableTransactionCard } from '../components/DropableTransactionCard';

export const NewTransactionsPage = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [from, setFrom] = useState<Date>(firstDay);
  const [to, setTo] = useState<Date>(lastDay);

  const { data: categories } = useCategories();
  const { data: newTransactions, refetch: refetchNewTransactions } = useNewTransactions(
    from.toLocaleString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    to.toLocaleString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  );

  useEffect(() => {
    console.log(newTransactions);
  }, [newTransactions]);

  useEffect(() => {
    refetchNewTransactions();
  }, [from, to]);

  const minusMonth = () => {
    setFrom(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setTo(prev => new Date(prev.getFullYear(), prev.getMonth(), 0));
  };

  return (
    <VStack>
      <Button onClick={minusMonth}>+</Button>
      <Text>{from.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}</Text>
      <HStack>
        <Text>Ilość: {newTransactions?.quantity}</Text>
        <Text>Min wartość: {newTransactions?.minValue ? newTransactions.minValue.toFixed(2) : 0}</Text>
        <Text>Mix wartość: {newTransactions?.maxValue ? newTransactions.maxValue.toFixed(2) : 0}</Text>
        <Text>Uznania: {newTransactions?.debits}</Text>
        <Text>Obciążenia: {newTransactions?.credits}</Text>
        <Text>Suma uznań: {newTransactions?.debitsSum ? newTransactions.debitsSum.toFixed(2) : 0}</Text>
        <Text>Suma obciążeń: {newTransactions?.creditsSum ? newTransactions.creditsSum.toFixed(2) : 0}</Text>
        <Text>Różnica: {newTransactions?.difference ? newTransactions.difference.toFixed(2) : 0}</Text>
        <Text>Iość sprzedawców: {newTransactions?.merchantCount}</Text>
      </HStack>
      <HStack w={'90vw'}>
        <Flex w={'100%'} wrap={'wrap'} mt={5} maxW={'1200px'}>
          {newTransactions?.data.map(t => (
              <DropableTransactionCard key={t.tranSystemId} t={t}/>
          ))}
        </Flex>
        <Flex wrap={'wrap'} w={'20vw'}  position={'fixed'} right={'100px'} top={'200px'} border={'solid'}>
          {categories?.map(c => (
            <DragableCategory key={c.id} c={c} alreadySelected={false} />
          ))}
        </Flex>
      </HStack>
    </VStack>
  );
};
