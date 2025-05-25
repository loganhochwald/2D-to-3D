import { createMachine } from 'xstate';
import type { Shape } from '../types';

interface Context {
  shapes: Shape[];
  selectedShape?: Shape;
}

export const editorMachine = createMachine(
  {
    types: {
      context: {} as Context,
      events: {} as
        | { type: 'SELECT_SHAPE'; shape: Shape }
        | { type: 'DESELECT_SHAPE' },
    },

    id: 'editor',
    initial: 'main',
    context: {
      shapes: [],
    },

    states: {
      main: {
        on: {
          SELECT_SHAPE: {
            target: 'editing',
            actions: 'selectShape',
          },
        },
      },
      editing: {
        on: {
          DESELECT_SHAPE: {
            target: 'main',
            actions: 'deselectShape',
          },
        },
      },
    },
  },
  {
    actions: {
      selectShape: ({ context, event }) => {
        if (event.type === 'SELECT_SHAPE') {
          context.selectedShape = event.shape;
        }
      },
      deselectShape: ({ context }) => {
        context.selectedShape = undefined;
      },
    },
  },
);
