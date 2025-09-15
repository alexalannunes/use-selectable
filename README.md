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
import { useSelectable } from "use-selectable";

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "alex" },
  { id: 2, name: "alan" },
  { id: 3, name: "nunes" },
];

function App() {
  const {
    selected,
    isAllSelected,
    toggleItem,
    toggleAll,
    clear,
    totalSelected,
    isSelected,
  } = useSelectable(users, "id" /* default */);

  return (
    <div>
      <button onClick={toggleAll}>
        {isAllSelected ? "Deselect All" : "Select All"}
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
      <pre>{JSON.stringify(selected, null, 2)}</pre>
    </div>
  );
}

export default App;
```

**API:**

`useSelectable<T, K extends keyof T>(data: T[], key?: K)`

- `data: T[]` (required) → Array of items to manage selection for.
- `key: K` (default `'id'`) → The property of each item used as unique identifier.

Returns an object with:

- `selected: T[]` → Array of currently selected items (based on `key`).
- `isAllSelected: boolean` → True if all items are selected.
- `totalSelected: number` → Number of selected items.
- `toggleItem(id: T[K])` → Toggle selection for an item by its id.
- `toggleAll()` → Select all or clear all depending on current state.
- `isSelected(id: T[K])` → Check if an item is selected.
- `clear()` → Clear all selections.
- `setSelectItems(ids: T[K][] | (selection: T[K][]) => T[K][])` → Manually set selection by array of ids or by updater function.

**Notes:** The hook automatically removes selections for items no longer present in `data`. Works with any property as the unique identifier, not just `id`.

## Roadmap / Future Plans

- **Default Selected Items**: Allow passing an array of default selected IDs when initializing the hook. This will enable pre-selection of items without extra calls to `setSelectItems`.

- **Core + Adapters Architecture**: Similar to React Table’s approach, a future version of this library may separate the pure selection logic into a standalone package (e.g. `@use-selectable/core`) and keep the React hook as an adapter (`@use-selectable/react`).  
  This will make the selection logic framework-agnostic, easier to test, and allow adapters for other frameworks such as Vue or Svelte in the future.

- **Improved Testing**: Add unit and integration tests for both the core logic and the React hook using modern testing tools.

*These changes are planned for a future release and may involve a **major version bump** if they introduce breaking changes.*


**License:** MIT © Alex Alan Nunes
