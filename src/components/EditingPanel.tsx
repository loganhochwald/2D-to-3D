import React, { useState, useEffect } from 'react';
import type { Shape } from '../types';
import { isValidColor } from '../utils/colorUtils';
import { namedColorToHex } from '../utils/colorUtils';

interface EditingPanelProps {
  shape?: Shape;
  send: (
    event:
      | { type: 'DESELECT_SHAPE' }
      | { type: 'UPDATE_SHAPE'; shape: Shape }
      | { type: 'REPLACE_SHAPE'; shape: Shape },
  ) => void;
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

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value;

    if (!isValidColor(colorValue)) return;

    const updatedShape = { ...localShape, color: colorValue };
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
    <div className="relative p-6 bg-gray-900 text-white rounded-lg shadow-xl max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold text-center w-full">
          Editing{': '}
          {localShape.type.charAt(0).toUpperCase() + localShape.type.slice(1)}
        </h2>
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-red-600 hover:text-red-800 font-bold text-3xl cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        {(localShape.type === 'cube' || localShape.type === 'sphere') && (
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300">
              {localShape.type === 'cube' ? 'Size:' : 'Radius:'}
            </label>
            <input
              type="number"
              value={
                localShape.type === 'cube' ? localShape.size : localShape.radius
              }
              onChange={handleDimensionChange}
              className="w-full mt-1 px-2 py-1 bg-gray-800 text-white rounded border border-gray-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300">
            Color:
          </label>
          <input
            type="color"
            value={namedColorToHex(localShape.color)}
            onChange={handleColorChange}
            className="w-full mt-1 h-10 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-md cursor-pointer"
      >
        Save
      </button>
    </div>
  );
};

export default EditingPanel;
