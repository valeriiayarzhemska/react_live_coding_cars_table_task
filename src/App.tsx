import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

interface Car {
  id: number,
  brand: string,
  rentPrice: number,
  color?: Color,
}

interface Color {
  id: number,
  name: string,
}

const newCars = carsFromServer.map((car) => {
  const color = colorsFromServer.find(({ id }) => id === car.colorId);

  return {
    ...car,
    color,
  };
});

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [colorId, setcolorId] = useState(0);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setcolorId(Number(event.target.value));
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />

      <select
        value={colorId}
        onChange={handleSelectChange}
      >
        <option
          value="0"
          disabled
        >
          Chose a color
        </option>

        {colorsFromServer.map((color) => {
          const {
            id,
            name,
          } = color;

          return (
            <option
              value={id}
              key={id}
            >
              {name}
            </option>
          );
        })}
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>
          {newCars.map((car: Car) => {
            const {
              id,
              brand,
              rentPrice,
              color,
            } = car;

            return (
              <tr>
                <td>{id}</td>
                <td>{brand}</td>
                {color && (
                  <td style={{ color: color.name }}>{color.name}</td>
                )}
                <td>{rentPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
