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

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ['GET_DASHBOARD'],
    queryFn: getDashboard,
    select: (data) => data?.data.data,
  });

  console.log(data);

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
            <h1 className='text-2xl font-semibold'>10</h1>
          </CardContent>
        </Card>

        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              Quiz <RiSurveyLine size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='text-2xl font-semibold'>10</h1>
          </CardContent>
        </Card>

        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              User <RiUser3Line size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='text-2xl font-semibold'>10</h1>
          </CardContent>
        </Card>

        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              Quiz Dikerjakan <RiBookOpenLine size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='text-2xl font-semibold'>10</h1>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
