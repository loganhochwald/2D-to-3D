import { createMachine, assign } from 'xstate';
import type { Shape } from '../types';
import { parseDSL } from '../dsl/dslParser';

interface Context {
  code: string;
  shapes: Shape[];
  selectedShape: Shape | undefined;
}

export const editorMachine = createMachine(
  {
    types: {
      context: {} as Context,
      events: {} as
        | { type: 'SELECT_SHAPE'; shape: Shape }
        | { type: 'DESELECT_SHAPE' }
        | { type: 'UPDATE_CODE'; code: string },
    },

    id: 'editor',
    initial: 'main',
    context: {
      code: '',
      shapes: [],
      selectedShape: undefined,
    },

    states: {
      main: {
        on: {
          SELECT_SHAPE: {
            target: 'editing',
            actions: 'selectShape',
          },
          UPDATE_CODE: {
            actions: 'updateCodeAndShapes',
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
        if (event.type === 'SELECT_SHAPE') context.selectedShape = event.shape;
      },
      deselectShape: ({ context }) => {
        context.selectedShape = undefined;
      },
      updateCodeAndShapes: assign(({ event, context }) => {
        if (event.type !== 'UPDATE_CODE') return context;

        return {
          code: event.code,
          shapes: parseDSL(event.code),
        };
      }),
    },
  },
);
