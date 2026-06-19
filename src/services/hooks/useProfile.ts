import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../providers/supabaseClient";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (error) throw error;

      console.log("useProfiles data:", data); // 👈 Добавьте это
      console.log("isArray:", Array.isArray(data)); // 👈 И это

      return data;
    },
  });
};
