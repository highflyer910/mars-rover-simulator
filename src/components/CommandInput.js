import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveRover, resetRover } from '../redux/roverSlice';

const CommandInput = () => {
  const dispatch = useDispatch();
  const { error, commandHistory } = useSelector((state) => state.rover);

  const handleKeyPress = (e) => {
    const validKeys = ['f', 'b', 'l', 'r'];
    if (validKeys.includes(e.key.toLowerCase())) {
      dispatch(moveRover(e.key.toLowerCase()));
    }
  };

  const handleReset = () => {
    dispatch(resetRover());
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <p>Use keyboard keys: f (forward), b (backward), l (left), r (right)</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button 
          onClick={handleReset} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Reset Rover
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Command History:</h3>
        <div className="bg-gray-100 p-2 rounded">
          {commandHistory.length > 0 ? commandHistory.join(', ') : 'No commands yet'}
        </div>
      </div>
    </div>
  );
};

export default CommandInput;