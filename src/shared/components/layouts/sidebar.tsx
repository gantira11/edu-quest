import { useSidebarStore } from '@/shared/stores/sidebar-store';
import {
  RiBookLine,
  RiBrainLine,
  RiContactsBook2Line,
  RiContactsLine,
  RiDashboardLine,
  RiFileChartLine,
  RiHomeLine,
  RiSparkling2Line,
  RiSurveyLine,
  RiTodoLine,
  RiUser3Line,
  RiVideoLine,
} from '@remixicon/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Separator } from '../ui/separator';
import { map } from 'lodash';
import { cn } from '@/shared/utils/cn';

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
    id: 'objectives-menu',
    name: 'Tujuan Pembelajaran',
    path: '/objectives',
    icon: <RiSparkling2Line size={18} />,
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
    id: 'reports-menu',
    name: 'Report',
    path: '/reports',
    icon: <RiFileChartLine size={18} />,
  },
  // {
  //   id: 'roles-menu',
  //   name: 'Manajemen Role',
  //   path: '/roles',
  //   icon: <RiUserSettingsLine size={18} />,
  // },
];

const studentMenus: Menu[] = [
  {
    id: 'home-menu',
    name: 'Home',
    path: '/student/home',
    icon: <RiHomeLine size={18} />,
  },
  {
    id: 'simulation-menu',
    name: 'Simulasi Rangkaian Dasar Kelistrikan',
    path: '/student/simulation',
    icon: <RiBrainLine size={18} />,
  },
  {
    id: 'subject-menu',
    name: 'Materi',
    path: '/student/subjects',
    icon: <RiBookLine size={18} />,
  },
  {
    id: 'video-menu',
    name: 'Video Pembelajaran',
    path: '/student/videos',
    icon: <RiVideoLine size={18} />,
  },
  {
    id: 'pratest-menu',
    name: 'Pra Test',
    path: '/student/pra-tests',
    icon: <RiSurveyLine size={18} />,
  },
  {
    id: 'evaluasi-menu',
    name: 'Evaluasi',
    path: '/student/evaluasi',
    icon: <RiTodoLine size={18} />,
  },
  {
    id: 'about-us-menu',
    name: 'Tentang Kami',
    path: '/student/about-us',
    icon: <RiContactsLine size={18} />,
  },
  {
    id: 'contact-menu',
    name: 'Kontak Kami',
    path: '/student/contact-us',
    icon: <RiContactsBook2Line size={18} />,
  },
];

const Sidebar = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState<boolean>();

  const open = useSidebarStore((state) => state.open);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  useEffect(() => {
    setTimeout(() => setIsOpen(open), 300);
  }, [open]);

  const isStudent = location.pathname.split('/').includes('student');

  return (
    <>
      <div
        className={cn(
          'fixed z-40 hidden h-screen w-full overflow-hidden bg-black/45',
          open && 'block lg:hidden'
        )}
        onClick={() => {
          setIsOpen(false);
          setTimeout(() => toggleSidebar(), 300);
        }}
      >
        <aside
          className={cn(
            'fixed z-50 min-h-screen w-72 -translate-x-72 bg-white shadow-xl transition-all duration-200 lg:block',
            isOpen && 'translate-x-0'
          )}
        >
          <div className='flex h-20 items-center justify-center'>
            <h3 className='text-lg font-semibold'>Edu Quest</h3>
          </div>

          <Separator className='mx-auto mb-2 w-36' />

          {map(isStudent ? studentMenus : menus, (menu) => (
            <Link
              key={menu.id}
              className={cn(
                'mx-2 flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 text-sm font-medium hover:bg-secondary',
                location.pathname === menu.path && 'bg-secondary'
              )}
              to={menu.path}
            >
              {menu.icon}
              {menu.name}
            </Link>
          ))}
        </aside>
      </div>
      <aside className='fixed hidden min-h-screen w-72 bg-white shadow-xl lg:block'>
        <div className='flex h-20 items-center justify-center'>
          <h3 className='text-lg font-semibold'>Edu Quest</h3>
        </div>

        <Separator className='mx-auto mb-2 w-36' />

        {map(isStudent ? studentMenus : menus, (menu) => {
          return (
            <Link
              key={menu.id}
              className={cn(
                'mx-2 flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 text-sm font-medium hover:bg-secondary',
                location.pathname.includes(menu.path) && 'bg-secondary'
              )}
              to={menu.path}
            >
              {menu.icon}
              {menu.name}
            </Link>
          );
        })}
      </aside>
    </>
  );
};

export default Sidebar;
