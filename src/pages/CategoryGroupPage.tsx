import { Button, Flex, Input, InputGroup, InputRightAddon, Tag, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { PAGE_MIN_HEIGHT } from '../../library';
import useCategoryGroups from '../hooks/useCategoryGroups';
import useNewCategoryGroup from '../hooks/useNewCategoryGroup';
import useCategories from '../hooks/useCategories';
import { CategoryGroupCard } from '../components/CategoryGroupCard';
import { UpdatingCategoryGroupCard } from '../components/UpdatingCategoryGroupCard';
import { DragableCategory } from '../components/DragableCategory';
import { Category, CategoryGroup } from '../model/Category';

export const CategoryGroupPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [isUpdating, setIsUpdating] = useState<number>(-1);
  const [categoriesIncludedInUpdate, setCategoriesIncluded] = useState<Category[]>([]);
  const { data: groups, refetch: refetchGroups } = useCategoryGroups();
  const { data: categories } = useCategories();
  const { mutate: postGroup } = useNewCategoryGroup();

  const onPostHanddler = () => {
    if (!inputRef.current?.value) return;
    postGroup(inputRef.current?.value);
    setIsPosting(false);
  };

  const handleStartUpdating = (group: CategoryGroup) => {
    setIsUpdating(group.categoryGroupId), setCategoriesIncluded(group.categories);
  };

  const handleCancelUpdating = () => {
    setIsUpdating(-1);
    setCategoriesIncluded([]);
    refetchGroups();
  };

  return (
    <VStack w={'100%'} h={PAGE_MIN_HEIGHT}>
      {!isPosting && isUpdating === -1 && (
        <Button w={'100%'} h={'40px'} colorScheme='green' onClick={() => setIsPosting(s => !s)}>
          Dodaj nową grupę
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

      {isUpdating > -1 && (
        <Flex w={'100%'}  m={5} justifyContent={'start'} alignItems={'center'} wrap={'wrap'}>
          {categories?.map(c => {
            const isAlreadySelected = categoriesIncludedInUpdate.some(cat => cat.id === c.id) || false;
            return <DragableCategory key={c.id} c={c} alreadySelected={isAlreadySelected} />;
          })}
        </Flex>
      )}

      <Flex w={'100%'} mt={5} justifyContent={'center'} alignItems={'start'} wrap={'wrap'}>
        {isUpdating === -1 &&
          groups?.map(g => (
            <CategoryGroupCard key={g.categoryGroupId} g={g} handleStartUpdating={handleStartUpdating} />
          ))}
        {isUpdating > -1 &&
          groups
            ?.filter(g => g.categoryGroupId === isUpdating)
            .map(g => (
              <UpdatingCategoryGroupCard
                key={g.categoryGroupId}
                g={g}
                categoriesIncluded={categoriesIncludedInUpdate}
                setCategoriesIncl={setCategoriesIncluded}
                onCancel={handleCancelUpdating}
              />
            ))}
      </Flex>
    </VStack>
  );
};
