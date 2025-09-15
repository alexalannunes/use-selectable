import "./App.css";

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
