export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          age_division: Database["public"]["Enums"]["ages_divisions"] | null
          gender: Database["public"]["Enums"]["genders"] | null
          id: number
          weight: string | null
        }
        Insert: {
          age_division?: Database["public"]["Enums"]["ages_divisions"] | null
          gender?: Database["public"]["Enums"]["genders"] | null
          id?: number
          weight?: string | null
        }
        Update: {
          age_division?: Database["public"]["Enums"]["ages_divisions"] | null
          gender?: Database["public"]["Enums"]["genders"] | null
          id?: number
          weight?: string | null
        }
      }
      competitors: {
        Row: {
          category_id: number | null
          country_id: number | null
          created_at: string | null
          created_by: string
          first_name: string | null
          id: number
          last_name: string | null
          notes: string | null
        }
        Insert: {
          category_id?: number | null
          country_id?: number | null
          created_at?: string | null
          created_by?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          notes?: string | null
        }
        Update: {
          category_id?: number | null
          country_id?: number | null
          created_at?: string | null
          created_by?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          notes?: string | null
        }
      }
      countries: {
        Row: {
          continent: Database["public"]["Enums"]["continents"] | null
          flag_emoji: string | null
          id: number
          iso2: string
          iso3: string | null
          local_name: string | null
          name: string | null
        }
        Insert: {
          continent?: Database["public"]["Enums"]["continents"] | null
          flag_emoji?: string | null
          id?: number
          iso2: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Update: {
          continent?: Database["public"]["Enums"]["continents"] | null
          flag_emoji?: string | null
          id?: number
          iso2?: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ages_divisions: "Senior" | "Sub 21" | "Junior" | "Cadete" | "Sub 14"
      continents:
        | "África"
        | "Antártida"
        | "Asia"
        | "Europa"
        | "Oceanía"
        | "América"
      genders: "Male" | "Female"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
