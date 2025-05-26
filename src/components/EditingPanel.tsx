import React, { useState, useEffect } from 'react';
import type { Shape } from '../types';

interface EditingPanelProps {
  shape?: Shape;
  send: (event: {
    type: 'DESELECT_SHAPE' | 'UPDATE_SHAPE' | 'REPLACE_SHAPE';
    shape?: Shape;
  }) => void;
}

const EditingPanel: React.FC<EditingPanelProps> = ({ shape, send }) => {
  const [localShape, setLocalShape] = useState<Shape | null>(null);

  useEffect(() => {
    if (shape) {
      setLocalShape({ ...shape });
    }
  }, []);

  if (!shape || !localShape) return null;

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const updatedShape =
      localShape.type === 'cube'
        ? { ...localShape, size: value }
        : { ...localShape, radius: value };

    setLocalShape(updatedShape);
    send({ type: 'UPDATE_SHAPE', shape: updatedShape });
  };

  const handleSave = () => {
    if (localShape) {
      send({ type: 'REPLACE_SHAPE', shape: localShape });
    }
    send({ type: 'DESELECT_SHAPE' });
  };

  const handleClose = () => {
    send({ type: 'DESELECT_SHAPE' });
  };

  return (
    <div className="w-full h-full bg-gray-800 text-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          Editing: {localShape.color + ' ' + localShape.type}
        </h2>
        <button
          onClick={handleClose}
          className="text-red-600 hover:text-red-800 font-bold text-3xl"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {(localShape.type === 'cube' || localShape.type === 'sphere') && (
        <div className="mb-4">
          <label className="block text-sm font-medium">
            {localShape.type === 'cube' ? 'Size:' : 'Radius:'}
          </label>
          <input
            type="number"
            value={
              localShape.type === 'cube' ? localShape.size : localShape.radius
            }
            onChange={handleDimensionChange}
            className="w-full mt-1 px-2 py-1 bg-gray-700 text-white rounded"
          />
        </div>
      )}

      <button
        onClick={handleSave}
        className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
      >
        Save
      </button>
    </div>
  );
};

export default EditingPanel;
