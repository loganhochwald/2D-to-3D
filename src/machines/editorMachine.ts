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
        | { type: 'UPDATE_SHAPE'; shape: Shape }
        | { type: 'UPDATE_CODE'; code: string },
    },

    id: 'editor',
    initial: 'main',
    context: {
      code: 'cube()',
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
          UPDATE_SHAPE: {
            actions: 'updateShape',
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
      updateShape: assign(({ context, event }) => {
        if (event.type !== 'UPDATE_SHAPE') return context;

        const updatedShapes = context.shapes.map((shape) =>
          shape === context.selectedShape ? event.shape : shape,
        );

        return {
          ...context,
          shapes: updatedShapes,
          selectedShape: event.shape,
        };
      }),
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
