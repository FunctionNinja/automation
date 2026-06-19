import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
  type SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { supabase } from '@/providers/supabaseClient';
import { useProfile } from '@/services/hooks/useProfile';

type Role = 'user' | 'group_lead' | 'admin';

interface Employee {
  id: string;
  fullname: string | null;
  email: string;
  role: Role | null;
  group_id: number | null;
}

interface Group {
  id: number;
  name: string;
}

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: 'user', label: 'Сотрудник' },
  { value: 'group_lead', label: 'Руководитель группы' },
  { value: 'admin', label: 'Администратор' },
];

const ROLE_COLOR: Record<Role, 'default' | 'primary' | 'success'> = {
  user: 'default',
  group_lead: 'primary',
  admin: 'success',
};

const Employees = () => {
  const { data: profile, isLoading: profileLoading } = useProfile();
  
  const isAdmin = profile && typeof profile === 'object' && !Array.isArray(profile) 
    ? profile.role === 'admin' 
    : false;

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updatingField, setUpdatingField] = useState<'role' | 'group' | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('id, fullname, email, role, group_id')
      .order('fullname', { ascending: true });

    if (fetchError) {
      console.error('Ошибка загрузки сотрудников:', fetchError);
      setError('Не удалось загрузить список сотрудников');
      setLoading(false);
      return;
    }

    setEmployees((data as Employee[]) ?? []);
    setLoading(false);
  };

  const fetchGroups = async () => {
    if (!isAdmin) return;

    const { data, error: fetchError } = await supabase
      .from('groups')
      .select('id, name')
      .order('name', { ascending: true });

    if (fetchError) {
      console.error('Ошибка загрузки групп:', fetchError);
      return;
    }

    setGroups((data as Group[]) ?? []);
  };

  useEffect(() => {
    fetchEmployees();
    if (isAdmin) {
      fetchGroups();
    }
  }, [isAdmin]);

  const handleRoleChange = async (employeeId: string, newRole: Role) => {
    if (!isAdmin) return;

    setUpdatingId(employeeId);
    setUpdatingField('role');

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', employeeId);

    setUpdatingId(null);
    setUpdatingField(null);

    if (updateError) {
      console.error('Ошибка обновления роли:', updateError);
      setSnackbar({ message: 'Не удалось изменить роль', severity: 'error' });
      return;
    }

    setEmployees((prev) =>
      prev.map((emp) => (emp.id === employeeId ? { ...emp, role: newRole } : emp))
    );
    setSnackbar({ message: 'Роль обновлена', severity: 'success' });
  };

  const handleGroupChange = async (employeeId: string, newGroupId: number | null) => {
    if (!isAdmin) return;

    setUpdatingId(employeeId);
    setUpdatingField('group');

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ group_id: newGroupId })
      .eq('id', employeeId);

    setUpdatingId(null);
    setUpdatingField(null);

    if (updateError) {
      console.error('Ошибка обновления группы:', updateError);
      setSnackbar({ message: 'Не удалось изменить группу', severity: 'error' });
      return;
    }

    setEmployees((prev) =>
      prev.map((emp) => (emp.id === employeeId ? { ...emp, group_id: newGroupId } : emp))
    );
    setSnackbar({ message: 'Группа обновлена', severity: 'success' });
  };

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return employees;
    return employees.filter(
      (emp) =>
        emp.fullname?.toLowerCase().includes(query) ||
        emp.email?.toLowerCase().includes(query)
    );
  }, [employees, search]);

  if (profileLoading || loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 300 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Сотрудники
      </Typography>

      <TextField
        placeholder="Поиск по имени или email"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, width: 320 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Группа</TableCell>
              <TableCell>Роль</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                    Сотрудники не найдены
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id} hover>
                <TableCell>{employee.fullname || '—'}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  {isAdmin ? (
                    <Select
                      size="small"
                      value={employee.group_id?.toString() ?? ''}  // ✅ toString()
                      disabled={updatingId === employee.id && updatingField === 'group'}
                      onChange={(e: SelectChangeEvent) => {
                        const value = e.target.value;
                        handleGroupChange(employee.id, value ? Number(value) : null);
                      }}
                      sx={{ minWidth: 180 }}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Не назначена</em>
                      </MenuItem>
                      {groups.length === 0 ? (
                        <MenuItem disabled>Нет доступных групп</MenuItem>
                      ) : (
                        groups.map((group) => (
                          <MenuItem key={group.id} value={group.id.toString()}>  {/* ✅ toString() */}
                            {group.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {groups.find(g => g.id === employee.group_id)?.name || 'Не назначена'}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {isAdmin ? (
                    <Select
                      size="small"
                      value={employee.role ?? 'user'}
                      disabled={updatingId === employee.id && updatingField === 'role'}
                      onChange={(e: SelectChangeEvent) =>
                        handleRoleChange(employee.id, e.target.value as Role)
                      }
                      sx={{ minWidth: 180 }}
                    >
                      {ROLE_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Chip
                      size="small"
                      label={ROLE_OPTIONS.find((r) => r.value === employee.role)?.label || 'Сотрудник'}
                      color={ROLE_COLOR[employee.role ?? 'user']}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {snackbar ? <Alert severity={snackbar.severity}>{snackbar.message}</Alert> : undefined}
      </Snackbar>
    </Box>
  );
};

export default Employees;