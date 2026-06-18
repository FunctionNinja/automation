import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAnnualPlan, useDeletePlanTask } from '@/services/hooks/useAnnualPlan';
import { useCreatePlanTask } from '@/services/hooks/useAnnualPlan';
import { useUpdatePlanTask } from '@/services/hooks/useAnnualPlan';
import { useProfile } from '@/services/hooks/useProfile';
import { useAuth } from '@/services/hooks/useAuth';

const statusColors: Record<string, 'default' | 'primary' | 'success' | 'error' | 'warning'> = {
  not_started: 'default',
  in_progress: 'primary',
  completed: 'success',
  cancelled: 'error',
};

const statusLabels: Record<string, string> = {
  not_started: 'Не начато',
  in_progress: 'В процессе',
  completed: 'Завершено',
  cancelled: 'Отменено',
};

export default function AnnualPlanPage() {
  const { user } = useAuth();
  const [userGroupId, setUserGroupId] = useState<number | undefined>();
  const [userRole, setUserRole] = useState<string>('user');
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    task: '',
    plan_item: '',
    measure: '',
    resource: '',
    deadline: '',
    responsible_person: '',
    expected_result: '',
  });

  // Получаем профиль пользователя
  useEffect(() => {
    if (user) {
      import('@/providers/supabaseClient').then(({ supabase }) => {
        supabase
          .from('profiles')
          .select('group_id, role')
          .eq('id', user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setUserGroupId(data.group_id);
              setUserRole(data.role);
            }
          });
      });
    }
  }, [user]);

  const { data: tasks, isLoading, error } = useAnnualPlan(userGroupId);
  const { data: profiles } = useProfiles(userGroupId);
  const createTask = useCreatePlanTask();
  const updateTask = useUpdatePlanTask();
  const deleteTask = useDeletePlanTask();

  const canEdit = userRole === 'admin' || userRole === 'group_lead';

  const handleStatusChange = async (id: number, status: string) => {
    await updateTask.mutateAsync({ id, status: status as any });
  };

  const handleActualResultChange = async (id: number, value: string) => {
    await updateTask.mutateAsync({ id, actual_result: value });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить задачу?')) {
      await deleteTask.mutateAsync(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask.mutateAsync({
        ...formData,
        group_id: userGroupId || 1,
        status: 'not_started',
      });
      setOpenDialog(false);
      setFormData({
        task: '',
        plan_item: '',
        measure: '',
        resource: '',
        deadline: '',
        responsible_person: '',
        expected_result: '',
      });
    } catch (error) {
      console.error('Ошибка создания задачи:', error);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">Ошибка загрузки данных: {error.message}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Заголовок и кнопка добавления */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Годовой план
        </Typography>
        {canEdit && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Добавить задачу
          </Button>
        )}
      </Box>

      {/* Таблица */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Задача</TableCell>
              <TableCell>Пункт плана</TableCell>
              <TableCell>Мероприятие</TableCell>
              <TableCell>Ресурс</TableCell>
              <TableCell>Срок</TableCell>
              <TableCell>Ответственный</TableCell>
              <TableCell>Ожидаемый результат</TableCell>
              <TableCell>Выполнение</TableCell>
              <TableCell>Статус</TableCell>
              {canEdit && <TableCell>Действия</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks && tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TableRow key={task.id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.task}</TableCell>
                  <TableCell>{task.plan_item || '-'}</TableCell>
                  <TableCell>{task.measure || '-'}</TableCell>
                  <TableCell>{task.resource || '-'}</TableCell>
                  <TableCell>
                    {task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>{task.profiles?.fullname || '-'}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    {task.expected_result || '-'}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      size="small"
                      placeholder="Что сделано?"
                      defaultValue={task.actual_result || ''}
                      onBlur={(e) => {
                        if (e.target.value !== task.actual_result) {
                          handleActualResultChange(task.id, e.target.value);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      sx={{ minWidth: 120 }}
                      disabled={!canEdit}
                    >
                      <MenuItem value="not_started">Не начато</MenuItem>
                      <MenuItem value="in_progress">В процессе</MenuItem>
                      <MenuItem value="completed">Завершено</MenuItem>
                      <MenuItem value="cancelled">Отменено</MenuItem>
                    </Select>
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <Tooltip title="Удалить">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(task.id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={canEdit ? 11 : 10} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">Нет задач в годовом плане</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Диалог создания задачи */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Новая задача</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} sx={{ pt: 1 }}>
              <TextField
                label="Задача"
                required
                fullWidth
                value={formData.task}
                onChange={(e) => setFormData({ ...formData, task: e.target.value })}
              />
              <TextField
                label="Пункт плана"
                fullWidth
                value={formData.plan_item}
                onChange={(e) => setFormData({ ...formData, plan_item: e.target.value })}
              />
              <TextField
                label="Мероприятие"
                fullWidth
                multiline
                rows={2}
                value={formData.measure}
                onChange={(e) => setFormData({ ...formData, measure: e.target.value })}
              />
              <TextField
                label="Ресурс"
                fullWidth
                value={formData.resource}
                onChange={(e) => setFormData({ ...formData, resource: e.target.value })}
              />
              <TextField
                label="Срок выполнения"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>Ответственный</InputLabel>
                <Select
                  value={formData.responsible_person}
                  onChange={(e) => setFormData({ ...formData, responsible_person: e.target.value })}
                  label="Ответственный"
                >
                  <MenuItem value="">Не выбран</MenuItem>
                  {profiles?.map((profile) => (
                    <MenuItem key={profile.id} value={profile.id}>
                      {profile.fullname} ({profile.email})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Ожидаемый результат"
                fullWidth
                multiline
                rows={2}
                value={formData.expected_result}
                onChange={(e) => setFormData({ ...formData, expected_result: e.target.value })}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
            <Button type="submit" variant="contained" disabled={createTask.isPending}>
              {createTask.isPending ? 'Создание...' : 'Создать'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}