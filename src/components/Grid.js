import React from 'react';
import { useSelector } from 'react-redux';

const Grid = () => {
  const { gridSize, position, direction, obstacles = [], trail = [] } = useSelector((state) => state.rover);

  const renderCell = (x, y) => {
    // if this cell is part of the trail
    const isTrail = trail.some(pos => pos.x === x && pos.y === y);
    
    // rover position
    if (position.x === x && position.y === y) {
      return (
        <div className="flex items-center justify-center">
          <img 
            src="/rover.svg" 
            alt="Rover" 
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain transform"
            style={{
              transform: `rotate(${
                direction === 'N' ? 0 :
                direction === 'E' ? 90 :
                direction === 'S' ? 180 :
                270
              }deg)`
            }}
          />
        </div>
      );
    }
    
    // obstacles
    if (obstacles.some((obs) => obs.x === x && obs.y === y)) {
      return (
        <div className="flex items-center justify-center">
          <img 
            src="/rock.svg" 
            alt="Obstacle" 
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
          />
        </div>
      );
    }
    
    // trail visualization
    if (isTrail) {
      return (
        <div 
          className="bg-[#290F1F] opacity-50 w-full h-full"
          title={`Trail point (${x}, ${y})`}
        ></div>
      );
    }
    
    // empty cell
    return <div className="border border-[#7F1D1D]"></div>;
  };

  return (
    <div className="w-full max-w-md mx-auto p-2">
      <div 
        className="grid gap-0 rounded-lg overflow-hidden bg-[#661B30] border-4 border-[#290F1F]"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize.width}, 1fr)`,
          aspectRatio: '1/1',
        }}
      >
        {Array.from({ length: gridSize.height }, (_, y) =>
          Array.from({ length: gridSize.width }, (_, x) => (
            <div 
              key={`${x}-${y}`} 
              className="aspect-square flex items-center justify-center border border-[#7F1D1D]"
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