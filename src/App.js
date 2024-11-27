import React from 'react';
import Grid from './components/Grid';
import CommandInput from './components/CommandInput';
import ObstacleSetter from './components/ObstacleSetter';

function App() {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/background.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container mx-auto p-4 max-w-4xl relative z-10">
        <h1 className="text-2xl font-bold text-center mb-4 text-white">Mars Rover Simulator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Grid />
            <CommandInput />
          </div>
          <ObstacleSetter />
        </div>
      </div>
    </div>
  );
}

export default App;