import React from 'react';

interface DSLGuideContentProps {
  isGuideVisible: boolean;
}

const DSLGuideContent: React.FC<DSLGuideContentProps> = ({
  isGuideVisible,
}) => {
  if (!isGuideVisible) return null;

  return (
    <div
      className="p-4 bg-gray-800 text-white rounded-lg shadow-lg w-96 h-auto"
      style={{ cursor: 'grab' }}
    >
      <h2 className="text-lg font-bold">DSL Guide</h2>
      <p>Use the following syntax to create shapes:</p>
      <ul className="list-disc list-inside">
        <li>
          <code>cube(size=1, x=0, y=0, z=0)</code>
        </li>
        <li>
          <code>sphere(radius=0.5, color=red)</code>
        </li>
      </ul>
    </div>
  );
};

export default DSLGuideContent;
