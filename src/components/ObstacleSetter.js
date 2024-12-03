import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setObstacles, resetRover } from '../redux/roverSlice';

const ObstacleSetter = () => {
  const dispatch = useDispatch();

  // Extract values from Redux state for grid size, rover position, direction, and obstacles
  const { gridSize, position, direction, obstacles } = useSelector((state) => state.rover);

  const [newObstacle, setNewObstacle] = useState({ x: "", y: "" });

  const [initialSetup, setInitialSetup] = useState({
    x: position.x,
    y: position.y,
    direction: direction
  });

  const [error, setError] = useState(null);

  // Handle initial rover setup validation and update Redux state
  const handleInitialSetup = () => {
    const { x, y, direction } = initialSetup;

    // ensure initial position is within grid
    if (x < 0 || x >= gridSize.width || y < 0 || y >= gridSize.height) {
      setError(`Initial position must be within grid (0-${gridSize.width - 1}, 0-${gridSize.height - 1})`);
      return;
    }

    // Prevent placing the rover on an obstacle
    const isObstacleConflict = obstacles.some(
      obs => obs.x === Number(x) && obs.y === Number(y)
    );

    if (isObstacleConflict) {
      setError('Cannot place rover on an existing obstacle');
      return;
    }

    // Dispatch action to reset rover position and direction
    dispatch(resetRover({
      position: { x, y },
      direction
    }));
    
    // Clear any previous error messages
    setError(null);
  };

  // adding a new obstacle to the grid
  const handleAddObstacle = () => {
    const { x, y } = newObstacle;

    // Validate obstacle position is within grid bounds
    if (x < 0 || x >= gridSize.width || y < 0 || y >= gridSize.height) {
      setError(`Obstacle must be within grid (0-${gridSize.width - 1}, 0-${gridSize.height - 1})`);
      return;
    }

    // Prevent duplicate obstacles at the same position
    const isDuplicate = obstacles.some(
      obs => obs.x === Number(x) && obs.y === Number(y)
    );

    if (isDuplicate) {
      setError('An obstacle already exists at this position');
      return;
    }

    // add the new obstacle to the list
    const updatedObstacles = [
      ...obstacles, 
      { x: Number(x), y: Number(y) }
    ];

    // Dispatch action to update the obstacles list
    dispatch(setObstacles(updatedObstacles));

    setError(null);
    setNewObstacle({ x: "", y: "" });
  };

  // clearing all obstacles from the grid
  const handleClearObstacles = () => {
    dispatch(setObstacles([])); // Dispatch action to clear obstacles
  };

  return (
    <div className="bg-[#661B30] p-4 rounded-lg shadow-md space-y-4 text-gray-200">
      <div>
        <h3 className="text-lg font-bold mb-4">Rover Initial Setup</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block mb-1">X Coordinate (0-14)</label>
            <input 
              type="number" 
              min="0" 
              max="14"
              value={initialSetup.x}
              onChange={(e) => {
                const value = Math.min(14, Math.max(0, Number(e.target.value) || ""));
                setInitialSetup(prev => ({ ...prev, x: value }));
                setError(null);
              }}
              className="p-2 border rounded w-full text-gray-900"
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
                const value = Math.min(14, Math.max(0, Number(e.target.value) || ""));
                setInitialSetup(prev => ({ ...prev, y: value }));
                setError(null);
              }}
              className="p-2 border rounded w-full text-gray-900"
            />
          </div>
          {/* Dropdown for direction */}
          <div className="sm:col-span-2">
            <label className="block mb-1">Direction</label>
            <select
              value={initialSetup.direction}
              onChange={(e) => {
                setInitialSetup(prev => ({ ...prev, direction: e.target.value }));
                setError(null); 
              }}
              className="p-2 border rounded w-full text-gray-900"
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
          className="mt-2 w-full bg-[#290F1F] text-gray-200 px-4 py-2 rounded hover:bg-[#1F0A17] transition"
        >
          Set Rover Position
        </button>
        {error && (
          <div className="mt-2 text-red-300">
            {error}
          </div>
        )}
      </div>

      {/* Section for adding obstacles */}
      <div>
        <h3 className="text-lg font-bold mb-4">Add Obstacles</h3>
        {/* Inputs for obstacle coordinates */}
        <div className="flex flex-col sm:flex-row items-end space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="flex space-x-2 w-full">
            <div className="flex-1">
              <label className="block mb-1">X Coordinate (0-14)</label>
              <input 
                type="number" 
                min="0" 
                max="14"
                value={newObstacle.x}
                onChange={(e) => {
                  const value = Math.min(14, Math.max(0, Number(e.target.value) || ""));
                  setNewObstacle(prev => ({ ...prev, x: value }));
                  setError(null);
                }}
                className="p-2 border rounded w-full text-gray-900"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">Y Coordinate (0-14)</label>
              <input 
                type="number" 
                min="0" 
                max="14"
                value={newObstacle.y}
                onChange={(e) => {
                  const value = Math.min(14, Math.max(0, Number(e.target.value) || ""));
                  setNewObstacle(prev => ({ ...prev, y: value }));
                  setError(null);
                }}
                className="p-2 border rounded w-full text-gray-900"
              />
            </div>
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <button 
              onClick={handleAddObstacle} 
              className="flex-1 sm:flex-none bg-[#290F1F] text-gray-200 px-6 py-2 rounded hover:bg-[#1F0A17] transition"
            >
              Add
            </button>
            <button 
              onClick={handleClearObstacles} 
              className="flex-1 sm:flex-none bg-red-900 text-red-200 px-6 py-2 rounded hover:bg-red-800 transition"
            >
              Clear
            </button>
          </div>
        </div>
        {error && (
          <div className="mt-2 text-red-300">
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
                  className="bg-[#290F1F] p-1 rounded text-center text-sm text-gray-200"
                >
                  ({obs.x}, {obs.y})
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm">No obstacles added</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObstacleSetter;
