import { Button, Flex, Input, InputGroup, InputRightAddon, Tag, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { PAGE_MIN_HEIGHT } from '../../library';
import useCategories from '../hooks/useCategories';
import useNewCategory from '../hooks/useNewCategory';

export const CategoryPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPosting, setIsPosting] = useState(false);
  const { data: categories } = useCategories();
  const { mutate: postCategory } = useNewCategory();

  const onPostHanddler = () => {
    if (!inputRef.current?.value) return;
    postCategory(inputRef.current?.value);
  };

  return (
    <VStack w={'100%'} minH={PAGE_MIN_HEIGHT}>
      {!isPosting && (
        <Button w={'100%'} h={'40px'} colorScheme='green' onClick={() => setIsPosting(s => !s)}>
          Dodaj nową kategorię
        </Button>
      )}
      {isPosting && (
        <InputGroup size='sm' h={'40px'}>
          <Input placeholder='nazwa' ref={inputRef} />
          <InputRightAddon>
            <Button w='100%' h='100%' onClick={onPostHanddler}>
              Wyślij
            </Button>
          </InputRightAddon>
        </InputGroup>
      )}
      <Flex w={'100%'} mt={5} justifyContent={'start'} alignItems={'center'} wrap={'wrap'}>
        {categories?.map(c => (
          <Tag key={c.id} colorScheme='teal' variant={'solid'} size={'lg'} m={1}>
            {c.name}
          </Tag>
        ))}
      </Flex>
    </VStack>
  );
};
