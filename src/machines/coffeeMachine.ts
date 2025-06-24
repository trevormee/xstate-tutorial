import { setup } from "xstate";

/*
┌────────────┐
│  Emptied   │◄────────┐
└────┬───────┘         │
     │FILL             │EMPTY
     ▼                 │
┌────────────────────────────────┐
│            Filled              │
│        (Compound state)        │
│                                │
│  ┌──────────┐                  │
│  │   Idle   │◄───┐             │
│  └────┬─────┘    │             │
│       │GRIND     │STOP         │
│       ▼          │             │
│  ┌────────────┐  │GRIND        │
│  │  Grinding  │◄─┘             │
│  └────┬───────┘                │
│       │PULSE                   │
│       ▼                       ▲
│  ┌────────────┐              │
│  │  Pulsing   │──────────────┘
│  └────┬───────┘
│       │STOP
│       ▼
│     (Idle)
└────────────────────────────────┘

*/

export const coffeeMachine = setup({
    types: {
        context: {} as {},
        events: {} as 
            | { type: "FILL"}
            | { type: "STOP"}
            | { type: "EMPTY"}
            | { type: "GRIND"}
            | { type: "PULSE"},
    },
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QGMD2AzdYwHEBOAlgHYRh4B0AogLYAOALgZAMQBiAkgDKcDaADAF1EoWqlgFGqIsJAAPRAEYAbEvJ91fAEwAOTXyUAWAMwBOJQBoQAT0SaArAfJ3tRo8YcK7AdiM+Avn6WaJjY+MSkFKwEADbRLJQAsgAKACoAmvxCSCCi4pLS2fIIyqoaWrr6xmaWNgh6jnwurtp26qZe9gFBGFi4hCRk5FGxkOTsEHHMOABK7AByACKZMrkSBFIyRUrafGqeHUZ8Ci4OFta2R04ah0Z2yl5HXSDBvWEDkTFxEORvEMRQzCSAFVOABlSjLbKrfKbRDbXZHbyaQ7HW4GM61AzGNTXOymHTopRPF6hfoRIafUa-f7MUEpADySUhIjEaw2hTh2i8Ti8ugU9i8Si0dhqijuOPU9iMCj4BhMRkMxJ6pPCg2GX3ISQArtFxEQATN5ktBCtWTCOQgsXZyLptMcvF4DHZWlpRQgjJpNOR7G0dB17C4lSE+qqPiNvtrdTS6YzmTkzesCqAilabTp7Y7nZK3Qp5eQDPc+B6TAofAY+HYAoEQERUKR4NkSSH3qa8onYQgALQYxCdzQGIOvMmDGgMJgQVtspNyRAGTRuzQy8glbZKExHBQKNyDlXvCnhyfm5O2JRGNN2uwmPHroU9hCn-MmJ8l6VYlSOnfN8nq0bjOKH9sLWdUpPDXAw7VzTwczzEslA6dEPTuAtP1+NVKW+al9QA9ljwQHYFD2bxlE0QxPSON1pW5ct1G8EwHT4QVtBQ4cww1SM9SgbDpyKaUCNtTwr1MfR9Dddxlx9FQFGMf07CJKsgA */
    id: "coffeeGrinder",
    context: {},
    initial: "Emptied",
    states: {
        Emptied: {
            on: {
                FILL: {
                    target: "Filled",
                },
            },
        },
        Filled: {
            initial: "Idle",
            on: {
                EMPTY: {
                    target: "Emptied",
                },
            },
            states: {
                // If Idle, and we GRIND, target Grinding
                Idle: {
                    on: {
                        GRIND: {
                            target: "Grinding",
                        },
                    },
                },
                // Grinding operation is active
                Grinding: {
                    on: {
                        // PULSE transitions to pulse mode
                        PULSE: {
                            target: "Pulsing",
                        },
                        // STOP transtions back to Idle
                        STOP: {
                            target: "Idle",
                        },
                    },
                },
                // Pulsing operation is active
                Pulsing: {
                    on: {
                        // GRIND transitions to grind mode
                        GRIND: {
                            target: "Grinding",
                        },
                        STOP: {
                            target: "Idle",
                        },
                    },
                },
            },
        },
        
    },
});