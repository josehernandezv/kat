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
  notes: z.string().optional(),
});

const loginCredentialsSchema = z.object({
  email: z.string().email({
    message: "El email no es válido",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  }),
});

type FormFields = {
  [k: string]: FormDataEntryValue;
};

export function validateCompetitor(data: FormFields) {
  return competitorSchema.safeParse(data);
}

export function validateLoginCredentials(data: FormFields) {
  return loginCredentialsSchema.safeParse(data);
}

// type CompetitorFields = z.infer<typeof competitorSchema>;
