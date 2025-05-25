import './App.css';
import Editor from './components/Editor';
import { useState } from 'react';

function App() {
  const [code, setCode] = useState('');

  return (
    <>
      <Editor initialDoc={code} onChange={(val) => setCode(val)} />
    </>
  );
}

export default App;
