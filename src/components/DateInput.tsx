import { HStack, Input, Select, Box } from '@chakra-ui/react';
import React from 'react';

const months = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lispiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

interface Props {
  date: Date;
  onYearChange: (year: number) => void;
  onMonthChange: (year: number) => void;
  onDayChange: (year: number) => void;
}

export const DateInput = ({ date, onDayChange, onMonthChange, onYearChange }: Props) => {
  return (
    <HStack>
      <Input
        type='number'
        border={'none'}
        width={'50px'}
        p={1}
        value={date.getDate()}
        onChange={e => onDayChange(+e.target.value)}
      />
      <Select
        border={'none'}
        w={'130px'}
        icon={<Box />}
        value={date.getMonth()}
        onChange={e => onMonthChange(+e.target.value)}

      >
        {months.map((m, index) => (
          <option key={m} value={index} style={{ background: '#203A43' }}>
            {m}
          </option>
        ))}
      </Select>
      <Input
        type='number'
        border={'none'}
        width={'100px'}
        value={date.getFullYear()}
        onChange={e => onYearChange(+e.target.value)}
      />
    </HStack>
  );
};
