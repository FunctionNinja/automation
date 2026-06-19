export interface Profile {
  id: number;
  email: string;
  fullname: string;
  position_id?: number;
  division_id?: number;
  group_id?: number;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export type ProfileList = Profile[]
