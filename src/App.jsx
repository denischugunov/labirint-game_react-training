import React from 'react';
import MazeGame from './MazeGame.jsx';

const maze = [
  [0, 0, 1, 0],
  [1, 0, 1, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 0],
];
const startPosition = { row: 0, col: 0 };
const endPosition = { row: 3, col: 3 };

const App = () => (
  <div className="col-5">
    <MazeGame maze={maze} startPosition={startPosition} endPosition={endPosition} />
  </div>
);

export default App;