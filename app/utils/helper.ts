import type { Category, Country } from "~/utils/api";

export function formatCategory(category: Category): string {
  return `${category.age_division} ${category.gender} ${category.weight}`;
}

export function formatCountry(country: Country): string {
  return `${country.flag_emoji} ${country.name}`;
}
