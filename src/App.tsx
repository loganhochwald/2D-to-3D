import { type FC } from 'react';
import Editor from './components/Editor';
import SceneRenderer from './components/SceneRenderer';
import DSLTooltip from './components/DSLTooltip';
import { useMachine } from '@xstate/react';
import { editorMachine } from './machines/editorMachine';
import EditingPanel from './components/EditingPanel';

const App: FC = () => {
  const [state, send] = useMachine(editorMachine);
  const { code, shapes, selectedShape } = state.context;

  return (
    <div className="h-dvh bg-black p-4 sm:px-8 flex flex-col">
      <DSLTooltip />
      <div className="flex-[3]">
        <SceneRenderer
          shapes={shapes}
          send={send}
          selectedShape={selectedShape}
        />
      </div>
      <div className="flex-[1] flex justify-center h-full">
        {state.matches('editing') ? (
          <EditingPanel shape={selectedShape} send={send} />
        ) : (
          <div className="w-5/6 sm:w-1/2 h-full">
            <Editor
              initialDoc={code}
              onChange={(val: string) =>
                send({ type: 'UPDATE_CODE', code: val })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
