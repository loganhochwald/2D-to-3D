import Editor from './components/Editor';
import { useState } from 'react';

function App() {
  const [code, setCode] = useState('');

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-1/2">
        <Editor initialDoc={code} onChange={(val) => setCode(val)} />
      </div>
    </div>
  );
}

export default App;
