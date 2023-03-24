export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      competitors: {
        Row: {
          created_at: string | null;
          first_name: string | null;
          gender: string | null;
          id: number;
          last_name: string | null;
        };
        Insert: {
          created_at?: string | null;
          first_name?: string | null;
          gender?: string | null;
          id?: number;
          last_name?: string | null;
        };
        Update: {
          created_at?: string | null;
          first_name?: string | null;
          gender?: string | null;
          id?: number;
          last_name?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
