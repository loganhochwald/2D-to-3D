import { type FC } from 'react';
import SceneRenderer from './components/SceneRenderer';
import { useMachine } from '@xstate/react';
import { editorMachine } from './machines/editorMachine';

const App: FC = () => {
  const [state, send] = useMachine(editorMachine);
  const { code, shapes, selectedShape } = state.context;

  return (
    <div className="h-dvh bg-black flex flex-col">
      <SceneRenderer
        shapes={shapes}
        send={send}
        selectedShape={selectedShape}
        editorVisible={!state.matches('editing')}
        code={code}
        onCodeChange={(val: string) => send({ type: 'UPDATE_CODE', code: val })}
      />
    </div>
  );
};

export default App;
