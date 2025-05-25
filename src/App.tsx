import { useState, useMemo } from 'react';
import Editor from './components/Editor';
import Scene from './components/Scene';
import { parseDSL } from './dsl/dslParser';

function App() {
  const [code, setCode] = useState('');
  const shapes = useMemo(() => parseDSL(code), [code]);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="h-3/4">
        <Scene shapes={shapes} />
      </div>
      <div className="h-1/4">
        <Editor initialDoc={code} onChange={(val) => setCode(val)} />
      </div>
    </div>
  );
}

export default App;
