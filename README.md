# use-selectable

A lightweight React hook for managing item selection states in lists, tables, or any collection of data. Easily toggle items, select all, clear selections, and retrieve selected items.

**Features:** Toggle single or all items, check if an item is selected, clear selections, get selected items and total count, zero dependencies (except React).

**Installation:**

```bash
npm install use-selectable
```

or with Yarn:

```bash
yarn add use-selectable
```

**Usage:**

```tsx
import React from 'react';
import { useSelectable } from 'use-selectable';

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

export default function App() {
  const {
    selectedItems,
    isAllSelected,
    toggleItem,
    toggleAll,
    clear,
    totalSelected,
    isSelected,
  } = useSelection(users, 'id');

  return (
    <div>
      <button onClick={toggleAll}>
        {isAllSelected ? 'Deselect All' : 'Select All'}
      </button>
      <button onClick={clear}>Clear</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <label>
              <input
                type="checkbox"
                checked={isSelected(user.id)}
                onChange={() => toggleItem(user.id)}
              />
              {user.name}
            </label>
          </li>
        ))}
      </ul>

      <p>Total selected: {totalSelected}</p>
      <pre>{JSON.stringify(selectedItems, null, 2)}</pre>
    </div>
  );
}
```

**API:**

`useSelection<T, K extends keyof T>(data: T[], key?: K)`

- `data: T[]` (required) → Array of items to manage selection for.
- `key: K` (default `'id'`) → The property of each item used as unique identifier.

Returns an object with:

- `selectedItems: T[]` → Array of currently selected items.
- `selected: T[]` → Alias for `selectedItems`.
- `isAllSelected: boolean` → True if all items are selected.
- `totalSelected: number` → Number of selected items.
- `toggleItem(id: T[K])` → Toggle selection for an item by its id.
- `toggleAll()` → Select all or clear all depending on current state.
- `isSelected(id: T[K])` → Check if an item is selected.
- `clear()` → Clear all selections.
- `setSelectItems(ids: T[K][] | (selection: T[K][]) => T[K][])` → Manually set selection by array of ids or by updater function.

**Notes:** The hook automatically removes selections for items no longer present in `data`. Works with any property as the unique identifier, not just `id`.

**License:** MIT © [Your Name]
