import React from 'react';

interface DSLGuideContentProps {
  isGuideVisible: boolean;
}

const DSLGuideContent: React.FC<DSLGuideContentProps> = ({
  isGuideVisible,
}) => {
  if (!isGuideVisible) return null;

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-extrabold mb-2 text-center">
        DSL Doodler Guide
      </h2>
      <p className="mb-1 text-base text-gray-300 leading-relaxed font-medium">
        Mix and match the syntax below to create shapes:
      </p>
      <ul className="list-disc list-inside space-y-3">
        <li className="text-base text-gray-300">
          <code className="bg-gray-800 text-green-400 text-sm px-2 py-1 rounded inline-block mt-1">
            cube(size=1, color='blue')
          </code>
        </li>
        <li className="text-base text-gray-300">
          <code className="bg-gray-800 text-blue-400 text-sm px-2 py-1 rounded inline-block mt-1">
            sphere(radius=0.5)
          </code>
          <br />
          <span className="text-sm text-gray-400">
            (Add x, y, z for position)
          </span>
        </li>
      </ul>
      <p className="mt-4 text-base text-center text-gray-300 font-medium">
        Click shapes to edit their properties.
      </p>
    </div>
  );
};

export default DSLGuideContent;
