import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import { Alert, Box } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';

import { DataTable } from '~/components/DataTable';
import RowActions from '~/components/RowActions';
import { useQueryParams } from '~/hooks/useQueryParams';
import { useListingFilters } from '~/pages/shared/hooks/useListingFilters';
import { routes } from '~/router/routes';

export default function UsersListing() {
  const { route } = useQueryParams();
  const { filters, handleSortModelChange, handlePaginationModelChange } = useListingFilters();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rowCount, setRowCount] = useState(0);

  const fetchUsers = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const skip = filters.page * filters.pageSize;
      const res = await fetch(`https://dummyjson.com/users/search?q=${''}&limit=${filters.pageSize}&skip=${skip}`);
      const data = await res.json();
      setUsers(data?.users || []);
      setRowCount(data?.total || 0);
    } catch (err) {
      console.error(err);
      setIsError(true);
      setError('Failed to fetch users.');
    } finally {
      setIsLoading(false);
    }
  }, [filters.page, filters.pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 80 },
      { field: 'firstName', headerName: 'First Name', flex: 1 },
      { field: 'lastName', headerName: 'Last Name', flex: 1 },
      { field: 'email', headerName: 'Email', flex: 1.5 },

      {
        field: 'actions',
        headerName: 'Actions',
        headerAlign: 'right',
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: (params) => <RowActions onEdit={() => route({ url: routes.user.edit(params.row.id) })} />,
      },
    ],
    [route],
  );

  return (
    <Box sx={{ p: 3 }}>
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <DataTable
        pagination
        columns={columns}
        filterMode="server"
        sortingMode="server"
        paginationMode="server"
        filterDebounceMs={500}
        isLoading={isLoading}
        rows={users}
        getRowId={(row) => row.id}
        rowCount={rowCount}
        pageSizeOptions={[10, 20, 50]}
        onSortModelChange={handleSortModelChange}
        onPaginationModelChange={handlePaginationModelChange}
        paginationModel={{
          page: filters.page,
          pageSize: filters.pageSize,
        }}
        noDataFound="No users found"
        rowClickUrl={(row) => routes.user.detail(row.id.toString())}
      />
    </Box>
  );
}
