import { useCallback, useEffect, useMemo, useState } from "react";

export function useSelection<
  T,
  K extends keyof T = "id" extends keyof T ? "id" : keyof T
>(data: T[], key: K = "id" as K) {
  const [items, dispatch] = useState(new Set<T[K]>());

  const toggleItem = useCallback(
    (id: T[K]) => {
      dispatch((prev) => {
        const old = new Set(prev);
        if (old.has(id)) {
          old.delete(id);
        } else {
          old.add(id);
        }
        return old;
      });
    },
    [key]
  );

  const toggleAll = useCallback(() => {
    dispatch((prev) => {
      const isAllSelected = prev.size === data.length;
      let newSelection = new Set<T[K]>();

      if (!isAllSelected) {
        const all = data.map((item) => item[key]);
        newSelection = new Set(all);
      }
      return newSelection;
    });
  }, [data, key]);

  const isSelected = useCallback(
    (id: T[K]) => {
      return items.has(id);
    },
    [items]
  );

  const clear = useCallback(() => {
    dispatch(new Set<T[K]>());
  }, []);

  const setSelectItems = useCallback(
    (ids: T[K][] | ((selection: T[K][]) => T[K][])) => {
      if (Array.isArray(ids)) {
        dispatch(new Set(ids));
      } else {
        dispatch((prev) => {
          return new Set<T[K]>(ids(Array.from(prev)));
        });
      }
    },
    []
  );

  useEffect(() => {
    const all = data.map((item) => String(item[key]));
    dispatch((prev) => {
      const newSelection = new Set(prev);
      newSelection.forEach((item) => {
        // remove item that doesn't exist in data
        if (!all.includes(String(item))) {
          newSelection.delete(item);
        }
      });
      return newSelection;
    });
  }, [data, key]);

  const isAllSelected = useMemo(() => {
    return items.size !== 0 && items.size === data.length;
  }, [items, data]);

  const selectedItems = useMemo(() => {
    let selectedItems: T[] = [];
    items.forEach((id) => {
      const exist = data.find((item) => item[key] === id);
      if (exist) {
        selectedItems.push(exist);
      }
    });
    return selectedItems;
  }, [items, data]);

  const totalSelected = items.size;

  return {
    selected: selectedItems,
    isAllSelected,
    selectedItems,
    totalSelected,
    data,
    toggleItem,
    toggleAll,
    isSelected,
    clear,
    setSelectItems,
  };
}
