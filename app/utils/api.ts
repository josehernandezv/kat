import type { Database } from "db_types";

export type Country = Database["public"]["Tables"]["countries"]["Row"];
export type Competitor = Database["public"]["Tables"]["competitors"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
