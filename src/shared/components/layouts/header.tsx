import { useSidebarStore } from '@/shared/stores/sidebar-store';
import { useAuthStore } from '@/shared/stores/user-store';
import { RiMenuLine, RiUserLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const Header = () => {
  const navigate = useNavigate();

  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const removeUser = useAuthStore((state) => state.removeUser);

  const handleLogout = () => {
    removeUser();
    navigate('/', { replace: true });
  };

  return (
    <div className='container flex h-20 w-full items-center justify-between text-gray-600 lg:justify-end'>
      <RiMenuLine size={20} onClick={toggleSidebar} className='lg:hidden' />
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
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
