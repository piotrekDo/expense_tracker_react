import { Box, Button, HStack, Input, Select, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { PAGE_MIN_HEIGHT } from '../../library';
import useReport from '../hooks/useReport';
import { toDateString } from '../utils';
import { DateInput } from '../components/DateInput';

type Preset = 'current' | 'prev' | 'prev2';

export const ReportPage = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState<Date>(firstDay);
  const [endDate, setEndDate] = useState<Date>(lastDay);

  const { data: report, refetch: refetchReport } = useReport(toDateString(startDate), toDateString(endDate));

  const onPresetChange = (preset: Preset) => {
    switch (preset) {
      case 'current':
        {
          setStartDate(firstDay);
          setEndDate(lastDay);
        }
        break;
      case 'prev':
        {
          setStartDate(new Date(today.getFullYear(), today.getMonth() - 1, 1));
          setEndDate(new Date(today.getFullYear(), today.getMonth(), 0));
        }
        break;
      case 'prev2':
        {
          setStartDate(new Date(today.getFullYear(), today.getMonth() - 2, 1));
          setEndDate(new Date(today.getFullYear(), today.getMonth() - 1, 0));
        }
        break;
    }
  };

  useEffect(() => {
    console.log(report);
  }, [report]);

  return (
    <VStack w={'100%'} minH={PAGE_MIN_HEIGHT}>
      <HStack w={'100%'} justify={'center'}>
        <Select w={'fit-content'} mr={10} onChange={e => onPresetChange(e.target.value as Preset)}>
          <option value={'current'} style={{ background: '#203A43' }}>
            preset
          </option>
          <option value={'prev'} style={{ background: '#203A43' }}>
            Poprzedni miesiąc
          </option>
          <option value={'prev2'} style={{ background: '#203A43' }}>
            2 do tyłu
          </option>
        </Select>
        <Box>OD</Box>
        <Input
          w={'200px'}
          value={toDateString(startDate)}
          type='date'
          onChange={e => setStartDate(new Date(e.target.value))}
        />
        {/* <DateInput
          date={startDate}
          onDayChange={day => setStartDate(prev => new Date(prev.getFullYear(), prev.getMonth(), day))}
          onMonthChange={month => setStartDate(prev => new Date(prev.getFullYear(), month, prev.getDate()))}
          onYearChange={year => setStartDate(prev => new Date(year, prev.getMonth(), prev.getDate()))}
        /> */}
        <Box>DO</Box>
        <Input
          w={'200px'}
          value={toDateString(endDate)}
          type='date'
          onChange={e => setEndDate(new Date(e.target.value))}
        />
        {/* <DateInput
          date={endDate}
          onDayChange={day => setEndDate(prev => new Date(prev.getFullYear(), prev.getMonth(), day))}
          onMonthChange={month => setEndDate(prev => new Date(prev.getFullYear(), month, prev.getDate()))}
          onYearChange={year => setEndDate(prev => new Date(year, prev.getMonth(), prev.getDate()))}
        /> */}
        <Button onClick={() => refetchReport()} colorScheme='green'>
          Pobierz
        </Button>
      </HStack>
    </VStack>
  );
};
