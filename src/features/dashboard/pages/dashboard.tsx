import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/shared/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  RiBookLine,
  RiBookOpenLine,
  RiSurveyLine,
  RiUser3Line,
} from '@remixicon/react';
import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '../services';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ['GET_DASHBOARD'],
    queryFn: getDashboard,
    select: (data) => data?.data.data,
  });

  const [dataChart, setDataChart] = useState();

  function convertToMonthNameYear(monthString: string) {
    const [year, month] = monthString.split('-');
    const monthName = new Date(`${year}-${month}-01`).toLocaleString('en-us', {
      month: 'short',
    });
    return `${monthName} ${year}`;
  }

  useEffect(() => {
    if (data) {
      const mapData = data?.count?.answer.map(
        (entry: { month: string; total: number; average_point: number }) => ({
          ...entry,
          month: convertToMonthNameYear(entry.month),
        })
      );

      setDataChart(mapData);
    }
  }, [data]);

  return (
    <div className='flex flex-col gap-5'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className='font-medium'>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              Materi <RiBookLine size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='text-2xl font-semibold'>{data?.subjects.current}</h1>
          </CardContent>
        </Card>

        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              Quiz <RiSurveyLine size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='text-2xl font-semibold'>{data?.quizzes.current}</h1>
          </CardContent>
        </Card>

        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              User <RiUser3Line size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='text-2xl font-semibold'>{data?.users.current}</h1>
          </CardContent>
        </Card>

        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              Quiz Dikerjakan <RiBookOpenLine size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='text-2xl font-semibold'>{data?.answers.total}</h1>
          </CardContent>
        </Card>
      </div>

      <div className='flex min-h-[80vh] w-full flex-col rounded-xl bg-white shadow-md'>
        <div className='mt-5 h-10 w-full px-10'>
          <h5 className='text-xl font-medium'>Nilai Rata Rata</h5>
        </div>
        <ResponsiveContainer width='99%' height={500}>
          <LineChart data={dataChart}>
            <Line
              type='monotone'
              name='Nilai rata-rata'
              dataKey='average_point'
              fontSize={10}
              stroke='#8884d8'
            />
            <Line
              type='monotone'
              name='Total quiz dikerjakan'
              dataKey='total'
              label='Nilai rata-rata'
              fontSize={10}
              stroke='#DC2626'
            />
            <CartesianGrid stroke='#ccc' />
            <Tooltip />
            <XAxis
              dataKey='month'
              angle={-40}
              textAnchor='end'
              height={40}
              fontSize={10}
            />
            <YAxis domain={[0, 100]} fontSize={10} />
            <Legend verticalAlign='top' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
