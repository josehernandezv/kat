import { Form, useActionData } from "@remix-run/react";
import type { Category, Competitor, Country } from "~/utils/api";
import clsx from "clsx";
import { formatCategory, formatCountry } from "~/utils/helper";
import { AutoComplete } from "~/components/AutoComplete";

interface CompetitorFormProps {
  competitor?: Competitor;
}

export function CompetitorForm({ competitor }: CompetitorFormProps) {
  const data = useActionData();
  return (
    <Form method={competitor ? "patch" : "post"}>
      <div className="form-control w-full max-w-xs pb-4">
        <label className="label">
          <span
            className={clsx("label-text", {
              "text-error": data?.error?.first_name,
            })}
          >
            Nombre
          </span>
        </label>
        <input
          type="text"
          name="first_name"
          className={clsx("input-bordered input w-full max-w-xs", {
            "input-error": data?.error?.first_name,
          })}
          defaultValue={competitor?.first_name || ""}
        />
        {data?.error?.first_name && (
          <label className="label">
            <span className="label-text-alt text-error">
              {data?.error?.first_name._errors[0]}
            </span>
          </label>
        )}
      </div>
      <div className="form-control w-full max-w-xs pb-4">
        <label className="label">
          <span
            className={clsx("label-text", {
              "text-error": data?.error?.last_name,
            })}
          >
            Apellido
          </span>
        </label>
        <input
          type="text"
          name="last_name"
          className={clsx("input-bordered input w-full max-w-xs", {
            "input-error": data?.error?.last_name,
          })}
          defaultValue={competitor?.last_name || ""}
        />
        {data?.error?.last_name && (
          <label className="label">
            <span className="label-text-alt text-error">
              {data?.error?.last_name._errors[0]}
            </span>
          </label>
        )}
      </div>
      <div className="form-control w-full max-w-xs pb-4">
        <label className="label">
          <span className="label-text">Categoría</span>
        </label>
        <AutoComplete<Category>
          name="category"
          entity="categories"
          displayValue={(item) => formatCategory(item)}
          filterValue={({ age_division, gender, weight }, query) =>
            (age_division || "").toLowerCase().includes(query.toLowerCase()) ||
            (gender || "").toLowerCase().includes(query.toLowerCase()) ||
            (weight || "").toLowerCase().includes(query.toLowerCase()) ||
            query
              .toLowerCase()
              .includes((age_division || "").toLowerCase?.()) ||
            query.toLowerCase().includes((gender || "").toLowerCase()) ||
            query.toLowerCase().includes((weight || "").toLowerCase())
          }
          defaultValueId={competitor?.category_id}
        />
      </div>
      <div className="form-control w-full max-w-xs pb-4">
        <label className="label">
          <span className="label-text">País</span>
        </label>
        <AutoComplete<Country>
          name="country"
          entity="countries"
          displayValue={(item) => formatCountry(item)}
          filterValue={({ name }, query) =>
            (name || "").toLowerCase().includes(query.toLowerCase()) ||
            query.toLowerCase().includes((name || "").toLowerCase?.())
          }
          defaultValueId={competitor?.country_id}
        />
      </div>
      <div>
        <button type="submit" className="btn">
          {competitor ? "Guardar cambios" : " Crear competidor"}
        </button>
      </div>
    </Form>
  );
}
