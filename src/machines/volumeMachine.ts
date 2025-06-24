import { setup, assign, assertEvent } from "xstate";

export const volumeMachine = setup({
  types: {
    context: {} as { volume: number },
    events: {} as
      | { type: "change.volume"; volume: number }
      | { type: "start" }
      | { type: "stop" },
  },
  actions: {
    "change.volume": assign(({ event }) => {        // assign action is used to update the context when the change.volume event is sent
      assertEvent(event, "change.volume");
      return { volume: event.volume };
    }),
  },
}).createMachine({
  context: {
    volume: 50,
  },
  id: "Volume Machine",
  initial: "Stopped",
  on: {
    "change.volume": {
      actions: {
        type: "change.volume",
      },
    },
  },
  states: {
    Stopped: {
      on: {
        start: {
          target: "Playing",
        },
      },
    },
    Playing: {
      on: {
        stop: {
          target: "Stopped",
        },
      },
    },
  },
});
