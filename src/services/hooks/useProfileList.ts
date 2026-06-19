import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../providers/supabaseClient';


import type { ProfileList } from '@/types/profile';


// Хук для получения списка профилей
export const useProfiles = (groupId?: number) => {
  return useQuery({
    queryKey: ['profiles', groupId],
    queryFn: async () => {
      let query = supabase.from('profiles').select('*');
      
      if (groupId) {
        query = query.eq('group_id', groupId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Возвращаем массив профилей (или пустой массив)
      return (data || []) as ProfileList;
    },
    enabled: !!groupId,
  });
};