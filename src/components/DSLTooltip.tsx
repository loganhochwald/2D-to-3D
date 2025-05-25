import { useState } from 'react';

export default function DSLTooltip() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative text-white text-sm">
      <button
        className="underline cursor-pointer"
        onClick={() => setShow(!show)}
      >
        DSL Help
      </button>
      {show && (
        <div className="absolute z-10 mt-2 p-3 w-72 bg-gray-800 border border-gray-600 rounded shadow-lg text-xs leading-relaxed">
          <p className="mb-1">
            <strong>Syntax:</strong> <code>shape(param=value, ...)</code>
          </p>
          <p className="mb-2">
            <strong>Supported shapes:</strong> <code>cube</code>,{' '}
            <code>sphere</code>
            <br />
            <br />
            Position params (<code>x</code>, <code>y</code>, <code>z</code>)
            default to <code>0</code>
          </p>
          <p>
            <strong>Examples:</strong>
          </p>
          <ul className="list-disc list-inside">
            <li>
              <code>cube(size=1, x=1)</code>
            </li>
            <li>
              <code>sphere(radius=1, x=2, y=1, z=-1)</code>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
