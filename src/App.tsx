import { useState } from 'react';
import Editor from './components/Editor';
import Scene from './components/Scene';

function App() {
  const [code, setCode] = useState('');

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="h-1/2">
        <Scene />
      </div>
      <div className="h-1/2">
        <Editor initialDoc={code} onChange={(val) => setCode(val)} />
      </div>
    </div>
  );
}

export default App;
