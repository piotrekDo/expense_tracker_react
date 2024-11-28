import { NotAllowedIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Tag, Text, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import useManageCategoryGroup from '../hooks/useManageCategoryGroup';
import { Category, CategoryGroup, ManageGroupRequest } from '../model/Category';
import itemTypes from '../model/Dragable';

interface Props {
  g: CategoryGroup;
  categoriesIncluded: Category[];
  setCategoriesIncl: Dispatch<SetStateAction<Category[]>>;
  onCancel: () => void;
}

export const UpdatingCategoryGroupCard = ({ g, categoriesIncluded, setCategoriesIncl, onCancel }: Props) => {
  const { mutate: updateGroup, isSuccess: isUpdateSuccess } = useManageCategoryGroup();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: itemTypes.CATEGORY,
    drop: (category: Category, monitor) => {
      setCategoriesIncl(prev => {
        if (!prev.some(c => c.id === category.id)) {
          return [...prev, category];
        }
        return prev;
      });
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleCancel = () => {
    setCategoriesIncl([...g.categories]);
    onCancel();
  };

  const handleRemove = (id: number) => {
    setCategoriesIncl(prev => [...prev.filter(c => c.id != id)]);
  };

  const onUpdateGroup = () => {
    const request: ManageGroupRequest = {
      groupId: g.categoryGroupId,
      categories: categoriesIncluded.map(c => c.id),
    };
    updateGroup(request);
  };

  useEffect(() => {
    if(isUpdateSuccess) {
      onCancel();
    }
  }, [isUpdateSuccess]);

  return (
    <VStack
      ref={drop}
      position={'relative'}
      justify={'start'}
      align={'start'}
      key={g.categoryGroupId}
      mx={1}
      minW={'200px'}
      minH={'300px'}
      bg={'teal.600'}
      borderRadius={'15px'}
      p={3}
      pb={'50px'}
    >
      <HStack w={'100%'} justify={'space-between'}>
        <Text>{g.categoryGroupName}</Text>
        <NotAllowedIcon color={'red.300'} fontSize={'1.3rem'} cursor={'pointer'} onClick={handleCancel} />
      </HStack>
      <VStack align={'start'} justify={'start'} pl={2}>
        {categoriesIncluded.map(c => (
          <Box key={c.id} pos={'relative'}>
            <Tag colorScheme='green' variant={'solid'} size={'lg'} mx={1}>
              {c.name}
            </Tag>
            <NotAllowedIcon
              pos={'absolute'}
              top={0}
              right={0}
              color={'red.300'}
              cursor={'pointer'}
              onClick={() => handleRemove(c.id)}
            />
          </Box>
        ))}
      </VStack>
      <Button pos={'absolute'} left={0} bottom={0} w={'100%'} colorScheme='green' onClick={onUpdateGroup}>
        Update
      </Button>
    </VStack>
  );
};
