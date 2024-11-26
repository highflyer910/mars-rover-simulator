import React from 'react';
import { useSelector } from 'react-redux';

const Grid = () => {
  const { gridSize, position, direction, obstacles = [] } = useSelector((state) => state.rover);

  const renderCell = (x, y) => {
    if (position.x === x && position.y === y) {
      const directionSymbols = {
        'N': '↑', 'S': '↓', 'E': '→', 'W': '←'
      };
      return (
        <div className="bg-green-500 flex items-center justify-center text-white font-bold">
          {directionSymbols[direction]}
        </div>
      );
    }
    if (obstacles.some((obs) => obs.x === x && obs.y === y)) {
      return <div className="bg-red-500 flex items-center justify-center text-white">O</div>;
    }
    return <div className="bg-gray-200 border border-gray-300"></div>;
  };

  return (
    <div className="w-full max-w-md mx-auto p-2">
      <div 
        className="grid gap-1 border-4 border-black rounded-lg overflow-hidden"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize.width}, 1fr)`,
          aspectRatio: '1/1',
        }}
      >
        {Array.from({ length: gridSize.height }, (_, y) =>
          Array.from({ length: gridSize.width }, (_, x) => (
            <div 
              key={`${x}-${y}`} 
              className="aspect-square border flex items-center justify-center"
            >
              {renderCell(x, y)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;