import { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { useOutletContext } from "@remix-run/react";
import type { Database } from "db_types";
import type { SupabaseClient } from "@supabase/auth-helpers-remix";

interface AutoCompleteProps<T extends { id: number }> {
  name: string;
  entity: string;
  displayValue(item: T): string;
  filterValue(item: T, query: string): boolean;
  defaultValueId?: number | string | null;
}

export function AutoComplete<T extends { id: number }>({
  name,
  entity,
  filterValue,
  displayValue,
  defaultValueId,
}: AutoCompleteProps<T>) {
  const [query, setQuery] = useState("");
  const context = useOutletContext<{
    supabase: SupabaseClient<Database>;
  }>();
  const { supabase } = context;
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data: items } = await supabase.from(entity).select("*");
      setItems(items ?? []);
    };
    fetchItems();
  }, [entity, supabase]);

  const filteredItems =
    query === "" ? items : items.filter((item) => filterValue(item, query));

  const defaultValue = defaultValueId
    ? items.find((item) => item.id === defaultValueId)
    : undefined;

  // if there is a default value delay the render until the items are loaded
  if (defaultValueId && !items.length) return null;

  return (
    <Combobox name={name} defaultValue={defaultValue}>
      <Combobox.Input
        className="input-bordered input w-full max-w-xs"
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(item: T) => displayValue(item)}
      />
      <Combobox.Options className="menu bg-base-100">
        {filteredItems.map((item) => (
          <Combobox.Option key={item.id} value={item}>
            <span>{displayValue(item)}</span>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
