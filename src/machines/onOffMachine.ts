import { setup } from "xstate";

// setup defines the event type, only applicable to TS projects
export const onOffMachine = setup({
  types: {
    events: {} as { type: "toggle" },
  },
}).createMachine({
  initial: "Inactive",      // defines init state of the machine
  states: {                 // defines the possible states of the machine
    Inactive: {
      on: {                 // defines the type of event and the target state to transition to
        toggle: {
          target: "Active", // defines the state to transition to when the event is received
        },
      },
    },
    Active: {
      on: {
        toggle: {
          target: "Inactive",
        },
      },
    },
  },
});
