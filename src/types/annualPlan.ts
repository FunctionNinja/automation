export interface AnnualPlanTask {
  id: number;
  group_id: number;
  task: string;
  plan_item: string | null;
  measure: string | null;
  resource: string | null;
  deadline: string | null;
  responsible_person: string | null;
  expected_result: string | null;
  actual_result: string | null;
  status: "not_started" | "in_progress" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
  profiles?: {
    fullname: string;
    email: string;
  };
  groups?: {
    name: string;
  };
}

export interface CreateTaskData {
  //   group_id: number;
  //   task: string;
  //   plan_item?: string;
  //   measure?: string;
  //   resource?: string;
  //   deadline?: string;
  //   responsible_person?: string;
  //   expected_result?: string;
  //   actual_result?: string;
  //   status?: 'not_started' | 'in_progress' | 'completed' | 'cancelled';
  task: string;
  plan_item?: string | null;  // ✅ Добавлен null
  measure?: string | null;
  resource?: string | null;
  deadline?: string | null;
  responsible_person?: string | null;
  expected_result?: string | null;
  group_id: number;
  status: string;
  created_by: string;
}

export interface UpdateTaskData {
  task?: string;
  plan_item?: string;
  measure?: string;
  resource?: string;
  deadline?: string;
  responsible_person?: string;
  expected_result?: string;
  actual_result?: string;
  status?: "not_started" | "in_progress" | "completed" | "cancelled";
}
