import React from "react";

export default function Paginated({ pokemons, pokemonsPage, paginated }) {
  const pages = [];
  for (let i = 0; i <= Math.ceil(pokemons/pokemonsPage); i++) {
    pages.push(i + 1);
  }
  pages.splice(pages.length-1, 1)
  return (
    <div>
      <ul>
        {pages &&
          pages.map((p) => {
            return (
              <li key={p}>
                <button onClick={() => paginated(p)}>{p}</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
