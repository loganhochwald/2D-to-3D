import React from 'react';
import type { Shape } from '../types';

interface EditingPanelProps {
  shape?: Shape;
  send: (event: { type: 'DESELECT_SHAPE' }) => void;
}

const EditingPanel: React.FC<EditingPanelProps> = ({ shape, send }) => {
  if (!shape) return null;

  return (
    <div className="text-white">
      <h2 className="text-xl mb-2">Editing: {shape.type}</h2>

      {shape.type === 'cube' && (
        <div>
          <label className="block">Size: {shape.size}</label>
        </div>
      )}

      {shape.type === 'sphere' && (
        <div>
          <label className="block">Radius: {shape.radius}</label>
        </div>
      )}

      <button
        onClick={() => send({ type: 'DESELECT_SHAPE' })}
        className="mt-4 px-4 py-2 bg-white text-black rounded"
      >
        Deselect
      </button>
    </div>
  );
};

export default EditingPanel;
