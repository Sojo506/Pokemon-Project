import React from "react";

export default function Card({ image, name, types }) {
  
  return (
    <div>
      <img 
        src={image} 
        alt={name} 
        width='300'
      />
      <h3>{name}</h3>
      <ul>
        {
          types && types.map(t => {
            return (
              <li key={t}>
                {t}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}
