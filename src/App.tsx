import { type FC } from 'react';
import Editor from './components/Editor';
import SceneRenderer from './components/SceneRenderer';
import DSLTooltip from './components/DSLTooltip';
import { useMachine } from '@xstate/react';
import { editorMachine } from './machines/editorMachine';

const App: FC = () => {
  const [state, send] = useMachine(editorMachine);
  const { code, shapes } = state.context;

  return (
    <div className="h-dvh bg-black p-4 sm:px-8 flex flex-col">
      <DSLTooltip />
      <div className="flex-[3]">
        <SceneRenderer shapes={shapes} send={send} />
      </div>
      <div className="flex-[1] flex justify-center">
        <div className="w-5/6 sm:w-1/2">
          <Editor
            initialDoc={code}
            onChange={(val: string) => send({ type: 'UPDATE_CODE', code: val })}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
