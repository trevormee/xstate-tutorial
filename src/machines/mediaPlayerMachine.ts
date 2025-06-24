import { setup } from "xstate";

export const mediaPlayerMachine = setup({
  types: {
    context: {} as {},
    events: {} as
      | { type: "PLAY" }
      | { type: "PAUSE" }
      | { type: "MUTE" }
      | { type: "UNMUTE" },
  },
}).createMachine({
  context: {},
  id: "player",
  type: "parallel",
  states: {
    track: {
      initial: "paused",
      states: {
        paused: {
          on: {
            PLAY: {
              target: "playing",
            },
          },
        },
        playing: {
          on: {
            PAUSE: {
              target: "paused",
            },
          },
        },
      },
    },
    mute: {
      initial: "unmuted",
      states: {
        unmuted: {
          on: {
            MUTE: {
              target: "muted",
            },
          },
        },
        muted: {
          on: {
            UNMUTE: {
              target: "unmuted",
            },
          },
        },
      },
    },
  },
});
