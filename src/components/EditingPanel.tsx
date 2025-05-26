import React from 'react';
import type { Shape } from '../types';

interface EditingPanelProps {
  shape?: Shape;
  send: (event: { type: 'DESELECT_SHAPE' }) => void;
}

const EditingPanel: React.FC<EditingPanelProps> = ({ shape, send }) => {
  if (!shape) return null;

  return (
    <div className="w-full h-full bg-gray-800 text-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          Editing: {shape.color + ' ' + shape.type}
        </h2>
        <button
          onClick={() => send({ type: 'DESELECT_SHAPE' })}
          className="text-red-600 hover:text-red-800 font-bold text-3xl"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {shape.type === 'cube' && (
        <div className="mb-4">
          <label className="block text-sm font-medium">Size:</label>
          <p className="text-lg">{shape.size}</p>
        </div>
      )}

      {shape.type === 'sphere' && (
        <div className="mb-4">
          <label className="block text-sm font-medium">Radius:</label>
          <p className="text-lg">{shape.radius}</p>
        </div>
      )}

      <button
        onClick={() => alert('Save functionality not implemented yet!')}
        className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
      >
        Save
      </button>
    </div>
  );
};

export default EditingPanel;
