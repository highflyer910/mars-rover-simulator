import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveRover, resetRover } from '../redux/roverSlice';

const CommandInput = () => {
  const dispatch = useDispatch();

  // Extracting state properties from the Redux store
  const { error, commandHistory, position, direction } = useSelector((state) => state.rover);

  // handles keyboard key press events (f, b, l, r)
  const handleKeyPress = (e) => {
    const validKeys = ['f', 'b', 'l', 'r'];
    if (validKeys.includes(e.key.toLowerCase())) {
      dispatch(moveRover(e.key.toLowerCase())); // dispatches the moveRover action
    }
  };

  // Resets the rover's position and state
  const handleReset = () => {
    dispatch(resetRover());
  };

  // Handles mobile button commands (f, b, l, r)
  const handleMobileCommand = (command) => {
    dispatch(moveRover(command));
  };

  // Adds an event listener for keyboard commands when the component mounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress); // Listen for keypress events
    return () => {
      window.removeEventListener('keydown', handleKeyPress); // Cleanup event listener on unmount
    };
  });

  return (
    <div className="p-4 space-y-4 text-gray-200">
      <div className="text-center">
        <p className="hidden sm:block">Use keyboard keys: f (forward), b (backward), l (rotate left), r (rotate right)</p>
        <p className="sm:hidden">Use mobile controls below</p>
      </div>
      
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      {/* Mobile controls for navigating the rover */}
      <div className="sm:hidden grid grid-cols-3 grid-rows-3 gap-2 max-w-xs mx-auto">
        <div></div>
        <button 
          onClick={() => handleMobileCommand('f')}
          className="bg-[#661B30] text-gray-200 p-3 rounded hover:bg-[#521526] transition flex items-center justify-center"
        >
          ↑ Forward
        </button>
        <div></div>
        
        <button 
          onClick={() => handleMobileCommand('l')}
          className="bg-[#661B30] text-gray-200 p-3 rounded hover:bg-[#521526] transition flex items-center justify-center"
        >
          ← Turn Left
        </button>
        
        <div className="flex items-center justify-center">
          <span className="text-gray-300 font-bold">
            {`(${position.x}, ${position.y}) ${direction}`}
          </span>
        </div>
        
        <button 
          onClick={() => handleMobileCommand('r')}
          className="bg-[#661B30] text-gray-200 p-3 rounded hover:bg-[#521526] transition flex items-center justify-center"
        >
          → Turn Right
        </button>
        
        <div></div>
        <button 
          onClick={() => handleMobileCommand('b')}
          className="bg-[#661B30] text-gray-200 p-3 rounded hover:bg-[#521526] transition flex items-center justify-center"
        >
          ↓ Backward
        </button>
        <div></div>
      </div>

      {/* Reset button */}
      <div className="flex justify-center space-x-4">
        <button 
          onClick={handleReset} 
          className="bg-[#290F1F] text-gray-200 px-4 py-2 rounded hover:bg-[#1F0A17] transition"
        >
          Reset Rover
        </button>
      </div>

      {/* Command history display */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Command History:</h3>
        <div className="bg-[#290F1F] p-2 rounded text-gray-200">
          {commandHistory.length > 0 ? commandHistory.join(', ') : 'No commands yet'}
        </div>
      </div>
    </div>
  );
};

export default CommandInput;
