import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setObstacles, resetRover } from '../redux/roverSlice';

const ObstacleSetter = () => {
  const dispatch = useDispatch();
  const { gridSize, position, direction, obstacles } = useSelector((state) => state.rover);
  const [newObstacle, setNewObstacle] = useState({ x: 0, y: 0 });
  const [initialSetup, setInitialSetup] = useState({
    x: position.x,
    y: position.y,
    direction: direction
  });
  const [error, setError] = useState(null);

  const handleInitialSetup = () => {
    const { x, y, direction } = initialSetup;
    
    // Validate initial position
    if (x < 0 || x >= gridSize.width || y < 0 || y >= gridSize.height) {
      setError(`Initial position must be within grid (0-${gridSize.width-1}, 0-${gridSize.height-1})`);
      return;
    }

    const isObstacleConflict = obstacles.some(
      obs => obs.x === Number(x) && obs.y === Number(y)
    );

    if (isObstacleConflict) {
      setError('Cannot place rover on an existing obstacle');
      return;
    }

    dispatch(resetRover({ 
      position: { x, y }, 
      direction 
    }));
    
    setError(null);
  };

  const handleAddObstacle = () => {
    const { x, y } = newObstacle;
    
    // Validate obstacle placement
    if (x < 0 || x >= gridSize.width || y < 0 || y >= gridSize.height) {
      setError(`Obstacle must be within grid (0-${gridSize.width-1}, 0-${gridSize.height-1})`);
      return;
    }

    // Check for duplicate obstacles
    const isDuplicate = obstacles.some(
      obs => obs.x === Number(x) && obs.y === Number(y)
    );

    if (isDuplicate) {
      setError('An obstacle already exists at this position');
      return;
    }

    const updatedObstacles = [
      ...obstacles, 
      { x: Number(x), y: Number(y) }
    ];
    
    dispatch(setObstacles(updatedObstacles));
    setError(null);
  };

  const handleClearObstacles = () => {
    dispatch(setObstacles([]));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4">
      <div>
        <h3 className="text-lg font-bold mb-4">Rover Initial Setup</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1">X Coordinate (0-14)</label>
            <input 
              type="number" 
              min="0" 
              max="14"
              value={initialSetup.x}
              onChange={(e) => {
                const value = Math.min(14, Math.max(0, Number(e.target.value)));
                setInitialSetup(prev => ({ ...prev, x: value }));
                setError(null);
              }}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Y Coordinate (0-14)</label>
            <input 
              type="number" 
              min="0" 
              max="14"
              value={initialSetup.y}
              onChange={(e) => {
                const value = Math.min(14, Math.max(0, Number(e.target.value)));
                setInitialSetup(prev => ({ ...prev, y: value }));
                setError(null);
              }}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-1">Direction</label>
            <select
              value={initialSetup.direction}
              onChange={(e) => {
                setInitialSetup(prev => ({ ...prev, direction: e.target.value }));
                setError(null);
              }}
              className="p-2 border rounded w-full"
            >
              <option value="N">North (↑)</option>
              <option value="S">South (↓)</option>
              <option value="E">East (→)</option>
              <option value="W">West (←)</option>
            </select>
          </div>
        </div>
        <button 
          onClick={handleInitialSetup} 
          className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Set Initial Rover Position
        </button>
        {error && (
          <div className="mt-2 text-red-500 text-sm">
            {error}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Add Obstacles</h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="flex flex-col">
            <label className="mb-1">X Coordinate (0-14)</label>
            <input 
              type="number" 
              placeholder="X" 
              min="0" 
              max="14"
              value={newObstacle.x}
              onChange={(e) => {
                const value = Math.min(14, Math.max(0, Number(e.target.value)));
                setNewObstacle(prev => ({ ...prev, x: value }));
                setError(null);
              }}
              className="p-2 border rounded w-24"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Y Coordinate (0-14)</label>
            <input 
              type="number" 
              placeholder="Y" 
              min="0" 
              max="14"
              value={newObstacle.y}
              onChange={(e) => {
                const value = Math.min(14, Math.max(0, Number(e.target.value)));
                setNewObstacle(prev => ({ ...prev, y: value }));
                setError(null);
              }}
              className="p-2 border rounded w-24"
            />
          </div>
          <div className="flex items-end space-x-2">
            <button 
              onClick={handleAddObstacle} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add Obstacle
            </button>
            <button 
              onClick={handleClearObstacles} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Clear Obstacles
            </button>
          </div>
        </div>
        {error && (
          <div className="mt-2 text-red-500 text-sm">
            {error}
          </div>
        )}
        <div className="mt-4">
          <h4 className="font-bold">Current Obstacles:</h4>
          {obstacles.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 max-h-40 overflow-y-auto">
              {obstacles.map((obs, index) => (
                <div 
                  key={index} 
                  className="bg-gray-200 p-1 rounded text-center text-sm"
                >
                  ({obs.x}, {obs.y})
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No obstacles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObstacleSetter;