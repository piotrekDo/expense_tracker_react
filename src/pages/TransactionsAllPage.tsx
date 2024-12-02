import { NotAllowedIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, Input, InputGroup, InputRightAddon, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { PAGE_MIN_HEIGHT } from '../../library';
import { DragableCategory } from '../components/DragableCategory';
import { DropableTransactionCard } from '../components/DropableTransactionCard';
import useCategories from '../hooks/useCategories';
import useTransactions from '../hooks/useTransactions';
import { Category } from '../model/Category';
import { toDateString } from '../utils';

export const TransactionsAllPage = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [from, setFrom] = useState<Date>(firstDay);
  const [to, setTo] = useState<Date>(lastDay);
  const [filterValue, setFilterValue] = useState<string>('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  const { data: categories } = useCategories();
  const { data: transactions, refetch: refetchNewTransactions } = useTransactions(toDateString(from), toDateString(to));

  useEffect(() => {
    setFilteredCategories(categories || []);
  }, [categories]);

  useEffect(() => {
    refetchNewTransactions();
  }, [from, to]);

  useEffect(() => {
    console.log(filterValue);
    setFilteredCategories(
      categories ? categories.filter(c => c.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())) : []
    );
  }, [filterValue]);

  const minusMonth = () => {
    setFrom(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setTo(prev => new Date(prev.getFullYear(), prev.getMonth(), 0));
  };

  return (
    <VStack w={'100%'} maxW={'100vw'} minH={PAGE_MIN_HEIGHT} p={5}>
      <Button onClick={minusMonth}>+</Button>
      <Text>{from.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}</Text>
      <HStack>
        <Text>Ilość: {transactions?.quantity}</Text>
        <Text>Min wartość: {transactions?.minValue ? transactions.minValue.toFixed(2) : 0}</Text>
        <Text>Mix wartość: {transactions?.maxValue ? transactions.maxValue.toFixed(2) : 0}</Text>
        <Text>Uznania: {transactions?.debits}</Text>
        <Text>Obciążenia: {transactions?.credits}</Text>
        <Text>Suma uznań: {transactions?.debitsSum ? transactions.debitsSum.toFixed(2) : 0}</Text>
        <Text>Suma obciążeń: {transactions?.creditsSum ? transactions.creditsSum.toFixed(2) : 0}</Text>
        <Text>Różnica: {transactions?.difference ? transactions.difference.toFixed(2) : 0}</Text>
        <Text>Iość sprzedawców: {transactions?.merchantCount}</Text>
      </HStack>
      <HStack w={'100%'} justify={'center'}>
        <Flex w={'25%'} h={'100%'}>
          <VStack pos={'fixed'} left={'5vw'} top={'30%'} maxH={'50vh'} w={'20vw'} overflowY={'scroll'}>
            <HStack>
              <InputGroup>
                <Input value={filterValue} placeholder='filter' onChange={e => setFilterValue(e.target.value)} />
                <InputRightAddon
                  bg={'transparent'}
                  cursor={'pointer'}
                  onClick={() => {
                    setFilterValue('');
                    setFilteredCategories(categories || []);
                  }}
                >
                  <NotAllowedIcon color={'red.300'} />
                </InputRightAddon>
              </InputGroup>
            </HStack>
            <Flex w='100%' h='100%' wrap='wrap' justify='flex-start' align='flex-start' gap={0}>
              {filteredCategories?.map(c => (
                <DragableCategory key={c.id} c={c} alreadySelected={false} />
              ))}
            </Flex>
          </VStack>
        </Flex>
        <Flex w={'100%'} wrap={'wrap'} mt={5} maxW={'1200px'}>
          {transactions?.data.map(t => (
            <DropableTransactionCard key={t.tranSystemId} t={t} />
          ))}
        </Flex>
      </HStack>
    </VStack>
  );
};
