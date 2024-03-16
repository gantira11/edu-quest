import {
  ColumnDef,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { RiLoader4Line } from '@remixicon/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { head, map } from 'lodash';

type PaginatorType = {
  itemCount: number;
  limit: number;
  pageCount: number;
  page: number;
  slNo: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  paginator?: PaginatorType;
  onLimitChange?: (value: string) => void;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  loading,
  paginator,
  onLimitChange,
}: DataTableProps<TData, TValue>) => {
  const [columnPinning, _] = useState<ColumnPinningState>({
    left: [],
    right: ['actions'],
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning,
    },
    getCoreRowModel: getCoreRowModel(),
    enableColumnPinning: true,
  });

  return (
    <>
      <div className='borderF overflow-hidden rounded-md'>
        <Table className='overflow-x-auto'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  console.log(header.getSize());
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'bg-primary text-white whitespace-nowrap',
                        header.column.getIsPinned() === 'right' &&
                          'sticky right-0 bg-primary text-white drop-shadow-lg'
                      )}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  <div className='flex items-center justify-center'>
                    <RiLoader4Line className='animate-spin text-center text-primary' />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!loading && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'whitespace-nowrap',
                        cell.column.getIsPinned() === 'right'
                          ? 'sticky right-0 bg-white drop-shadow-lg'
                          : ''
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center font-semibold text-slate-600'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-col items-end justify-between gap-4 lg:flex-row'>
        <div className='flex w-full items-center justify-start gap-3 text-sm font-medium'>
          <Select
            defaultValue={`${paginator?.limit ?? 10}`}
            onValueChange={onLimitChange}
          >
            <SelectTrigger className='w-[60px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='w-max'>
              <SelectGroup>
                <SelectItem value='5'>5</SelectItem>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='25'>25</SelectItem>
                <SelectItem value='50'>50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p>
            {paginator?.page} dari {paginator?.itemCount} data.
          </p>
        </div>

        <Pagination className='flex justify-end'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                className={cn(!paginator?.prevPage && 'cursor-not-allowed')}
              />
            </PaginationItem>
            {map(new Array(paginator?.pageCount).fill(''), (_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink href='#' isActive={paginator?.page === idx + 1}>
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href='#'
                className={cn(!paginator?.prevPage && 'cursor-not-allowed')}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default DataTable;
