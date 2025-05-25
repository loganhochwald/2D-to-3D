import { createMachine } from 'xstate';

export const editorMachine = createMachine({
  id: 'editor',
  initial: 'main',
  states: {
    main: {
      on: {
        SELECT_SHAPE: 'editing',
      },
    },
    editing: {
      on: {
        DESELECT_SHAPE: 'main',
      },
    },
  },
});
