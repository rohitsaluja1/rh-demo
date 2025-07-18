import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { useInboxStore, InboxItem } from '@/store/inboxStore';
import { StatusPill } from './StatusPill';

const columnHelper = createColumnHelper<InboxItem>();

export const InboxTable: React.FC = () => {
  const { 
    filteredItems, 
    selectedItems, 
    toggleItemSelection, 
    selectAllItems, 
    clearSelection 
  } = useInboxStore();
  
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'datetime', desc: true }
  ]);

  const columns = useMemo(() => [
    columnHelper.display({
      id: 'select',
      header: () => (
        <input
          type="checkbox"
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={selectedItems.length === filteredItems().length && filteredItems().length > 0}
          onChange={(e) => {
            if (e.target.checked) {
              selectAllItems();
            } else {
              clearSelection();
            }
          }}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={selectedItems.includes(row.original.id)}
          onChange={() => toggleItemSelection(row.original.id)}
        />
      ),
      size: 40,
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: (info) => (
        <span className="text-sm text-gray-900">{info.getValue()}</span>
      ),
      size: 100,
    }),
    columnHelper.accessor('from', {
      header: 'From',
      cell: (info) => (
        <span className="text-sm text-gray-900">{info.getValue()}</span>
      ),
      size: 200,
    }),
    columnHelper.accessor('source', {
      header: 'Source',
      cell: (info) => (
        <span className="text-sm text-gray-900">{info.getValue()}</span>
      ),
      size: 150,
    }),
    columnHelper.accessor('subject', {
      header: 'Subject',
      cell: (info) => (
        <span className="text-sm text-gray-900 max-w-xs truncate block">
          {info.getValue() || '-'}
        </span>
      ),
      size: 250,
    }),
    columnHelper.accessor('client', {
      header: 'Client',
      cell: (info) => (
        <span className="text-sm text-gray-900">{info.getValue() || '-'}</span>
      ),
      size: 180,
    }),
    columnHelper.accessor('recordRef', {
      header: 'Record ref.',
      cell: (info) => (
        <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
          {info.getValue() || '-'}
        </span>
      ),
      size: 150,
    }),
    columnHelper.accessor('datetime', {
      header: 'Date and time',
      cell: (info) => {
        const date = new Date(info.getValue());
        return (
          <span className="text-sm text-gray-900">
            {date.toLocaleDateString('en-GB')} {date.toLocaleTimeString('en-GB', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        );
      },
      size: 150,
    }),
    columnHelper.accessor('event', {
      header: 'Event',
      cell: (info) => (
        <span className="text-sm text-gray-900">{info.getValue() || '-'}</span>
      ),
      size: 120,
    }),
    columnHelper.accessor('attachments', {
      header: 'Attachments',
      cell: (info) => (
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4 text-gray-400" />
          {info.getValue() > 0 && (
            <span className="text-sm text-gray-600">+{info.getValue()}</span>
          )}
        </div>
      ),
      size: 120,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => <StatusPill status={info.getValue()} />,
      size: 120,
    }),
  ], [selectedItems, filteredItems, toggleItemSelection, selectAllItems, clearSelection]);

  const table = useReactTable({
    data: filteredItems(),
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={`flex items-center gap-1 ${
                        header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <div className="flex flex-col">
                          {header.column.getIsSorted() === 'asc' ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <div className="h-3 w-3" />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr 
              key={row.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                console.log('Row clicked:', row.original);
              }}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {table.getRowModel().rows.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found</p>
        </div>
      )}
    </div>
  );
};