import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { map, slice } from 'lodash';

interface IBreadcrumbItems {
  label: string;
  path: string;
}

interface IBreadcrumbsProps {
  items: IBreadcrumbItems[];
}

const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ items }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.length > 0 &&
          map(slice(items, 0, -1), (item, idx) => (
            <div key={idx} className='flex items-center gap-1'>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          ))}
        <BreadcrumbItem>
          <BreadcrumbPage className='font-medium'>
            {items[items.length - 1].label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
