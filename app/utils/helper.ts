import type { Category, Country } from "~/utils/api";

export function formatCategory(category: Category): string {
  return `${category.age_division} ${category.gender} ${category.weight}`;
}

export function formatCountry(country: Country): string {
  return `${country.flag_emoji} ${country.name}`;
}

const translations: Record<string, string> = {
  "Invalid login credentials": "Credenciales inválidos",
  "Email not confirmed": "Email no confirmado",
};

export function getTranslatedErrorMessage(error: string): string {
  return translations[error] || error;
}

// export function hasProperty<T extends object, K extends keyof T>(
//   obj: T | undefined,
//   key: K
// ): obj is T & Record<K, T[K]> {
//   return obj != null && key in obj;
// }
