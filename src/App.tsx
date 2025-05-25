import { useState, useMemo, type FC } from 'react';
import Editor from './components/Editor';
import SceneRenderer from './components/SceneRenderer';
import DSLTooltip from './components/DSLTooltip';
import { parseDSL } from './dsl/dslParser';
import type { Shape } from './utils/addShapeUtil';

const App: FC = () => {
  const [code, setCode] = useState<string>('');
  const shapes = useMemo<Shape[]>(() => parseDSL(code), [code]);

  return (
    <div className="h-dvh bg-black p-4 sm:px-8 flex flex-col">
      <DSLTooltip />
      <div className="flex-[3]">
        <SceneRenderer shapes={shapes} />
      </div>
      <div className="flex-[1] flex justify-center">
        <div className="w-5/6 sm:w-1/2">
          <Editor initialDoc={code} onChange={(val: string) => setCode(val)} />
        </div>
      </div>
    </div>
  );
};

export default App;
