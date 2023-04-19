import { z } from "zod";

const competitorSchema = z.object({
  first_name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  last_name: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres",
  }),
  category_id: z.number().optional(),
  country_id: z.number().optional(),
});

export function validateCompetitor(data: { [k: string]: FormDataEntryValue }) {
  return competitorSchema.safeParse(data);
}

// type CompetitorFields = z.infer<typeof competitorSchema>;
