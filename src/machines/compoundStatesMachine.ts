import { setup } from "xstate";

/*
┌────────────┐
│  Ejected   │◄────┐
└────┬───────┘     │
     │INSERT       │
     ▼             │EJECT
┌────────────────────────────┐
│         Inserted           │
│  (Compound state)          │
│                            │
│  ┌───────────┐             │
│  │  Stopped  │◄──┐         │
│  └────┬──────┘   │          │
│       │PLAY      │          │
│       ▼          │STOP      │
│  ┌──────────┐    │          │
│  │ Playing  │◄───┘          │
│  └────┬─────┘               │
│       │PAUSE                │
│       ▼                    ▲
│  ┌──────────┐             │
│  │  Paused  │─────────────┘
│  └────┬─────┘
│       │PLAY
│       ▼
│     (Playing)
└────────────────────────────┘

*/

// Compound means parent/child states
// Compound states are states that contain other states --> hierarchial

export const compoundStatesMachine = setup({
  types: {
    context: {} as {},
    events: {} as
      | { type: "PLAY" }
      | { type: "STOP" }
      | { type: "EJECT" }
      | { type: "PAUSE" }
      | { type: "INSERT" },
  },
}).createMachine({
  context: {},
  initial: "Ejected",
  states: {
    Ejected: {
      on: {
        INSERT: {
          target: "Inserted",
        },
      },
    },
    Inserted: {
      initial: "Stopped",
      on: {
        EJECT: {
          target: "Ejected",
        },
      },
      states: {
        Stopped: {
          on: {
            PLAY: {
              target: "Playing",
            },
          },
        },
        Playing: {
          on: {
            STOP: {
              target: "Stopped",
            },
            PAUSE: {
              target: "Paused",
            },
          },
        },
        Paused: {
          on: {
            STOP: {
              target: "Stopped",
            },
            PLAY: {
              target: "Playing",
            },
          },
        },
      },
    },
  },
});
