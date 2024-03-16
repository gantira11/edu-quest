import React from 'react';
import {
  RiBookLine,
  RiDashboardLine,
  RiUser3Line,
  RiUserLine,
  RiUserSettingsLine,
} from '@remixicon/react';
import { map } from 'lodash';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { cn } from '../utils/cn';

const CmsLayout = () => {
  return (
    <section className='flex min-h-screen'>
      <Sidebar />
      <div className='flex w-full flex-col'>
        <Header />
        <React.Suspense>
          <div className='container mx-auto p-5'>
            <Outlet />
          </div>
        </React.Suspense>
      </div>
    </section>
  );
};

interface Menu {
  id: string;
  name: string;
  path: string;
  icon?: React.ReactNode;
}

const menus: Menu[] = [
  {
    id: 'dashboard-menu',
    name: 'Dashboard',
    path: '/dashboard',
    icon: <RiDashboardLine size={18} />,
  },
  {
    id: 'subjects-menu',
    name: 'Manajemen Materi',
    path: '/subjects',
    icon: <RiBookLine size={18} />,
  },
  {
    id: 'users-menu',
    name: 'Manajemen User',
    path: '/users',
    icon: <RiUser3Line size={18} />,
  },
  {
    id: 'roles-menu',
    name: 'Manajemen Role',
    path: '/roles',
    icon: <RiUserSettingsLine size={18} />,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className='hidden w-72 bg-white shadow-xl lg:block'>
      <div className='flex h-20 items-center justify-center'>
        <h3 className='text-lg font-semibold'>Edu Quest</h3>
      </div>

      <Separator className='mx-auto mb-2 w-36' />

      {map(menus, (menu) => (
        <Link
          key={menu.id}
          className={cn(
            'mx-2 flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 text-sm font-medium hover:bg-secondary',
            location.pathname.split('/').includes(menu.path.replace('/', '')) &&
              'bg-secondary'
          )}
          to={menu.path}
        >
          {menu.icon}
          {menu.name}
        </Link>
      ))}
    </aside>
  );
};

const Header = () => {
  return (
    <div className='container flex h-20 w-full items-center justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='icon'
            className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 focus-visible:ring-0'
            variant='outline'
          >
            <RiUserLine size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CmsLayout;
