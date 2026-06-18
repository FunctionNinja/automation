import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/providers/supabaseClient';


import type {AnnualPlanTask, CreateTaskData } from '@/types/annualPlan';


// Получить все задачи (с фильтром по группе)
export const useAnnualPlan = (groupId?: number) => {
  return useQuery({
    queryKey: ['annual_plan', groupId],
    queryFn: async () => {
      let query = supabase
        .from('annual_plan')
        .select(`
          *,
          profiles!responsible_person (
            fullname,
            email
          ),
          groups (
            name
          )
        `)
        .order('deadline', { ascending: true });

      if (groupId) {
        query = query.eq('group_id', groupId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as AnnualPlanTask[];
    },
  });
};

// Создать новую задачу
export const useCreatePlanTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: CreateTaskData) => {
      const { data, error } = await supabase
        .from('annual_plan')
        .insert([{
          ...newTask,
          status: newTask.status || 'not_started',
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['annual_plan'] });
    },
  });
};

// Обновить задачу
export const useUpdatePlanTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      ...updates 
    }: { id: number } & Partial<AnnualPlanTask>) => {
      const { data, error } = await supabase
        .from('annual_plan')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['annual_plan'] });
    },
  });
};

// Удалить задачу
export const useDeletePlanTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('annual_plan')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['annual_plan'] });
    },
  });
};