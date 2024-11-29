import { Tag } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';
import { Category } from '../model/Category';
import itemTypes from '../model/Dragable';

interface Props {
  c: Category;
  alreadySelected: boolean
}

export const DragableCategory = ({ c, alreadySelected }: Props) => {

    const [{ isDragging }, drag] = useDrag({
        type: itemTypes.CATEGORY,
        item: c,
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      });

  return (
    <Tag ref={drag} key={c.id} colorScheme={alreadySelected ? 'green' : 'teal'} variant={'solid'} size={'lg'} mx={1} cursor={'pointer'} m={1}>
      {c.name}
    </Tag>
  );
};
