import { useState, useMemo } from 'react';
import Editor from './components/Editor';
import SceneRenderer from './components/SceneRenderer';
import DSLTooltip from './components/DSLTooltip';
import { parseDSL } from './dsl/dslParser';

function App() {
  const [code, setCode] = useState('');
  const shapes = useMemo(() => parseDSL(code), [code]);

  return (
    <div className="flex flex-col h-screen bg-black p-4 sm:px-8">
      <DSLTooltip />
      <div className="h-3/4">
        <SceneRenderer shapes={shapes} />
      </div>
      <div className="h-1/4 flex justify-center">
        <div className="w-5/6 sm:w-1/2">
          <Editor initialDoc={code} onChange={(val) => setCode(val)} />
        </div>
      </div>
    </div>
  );
}

export default App;
