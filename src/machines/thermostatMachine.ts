import { setup } from "xstate";

export const thermostatMachine = setup({
    types: {
        context: {} as {},
        events: {} as 
        | { type: "HEAT"}
        | { type: "COOL"}
        | { type: "DOAUTO"}
        | { type: "DOON"}
    }
}).createMachine({
    context: {},
    id: "thermostat",
    type: "parallel",               // Declare the machine as a parallel type
    states: {
        setting: {                  // Define the setting state
            initial: "heating",
            states: {
                heating: {          // Setting state can either be heating or cooling
                    on: {
                        COOL: {
                            target: "cooling",
                        },
                    },
                },
                cooling: {           // Setting state can either be heating or cooling
                    on: {
                        HEAT: {
                            target: "heating",
                        },
                    },
                },
            },
        },
        fan: {                       // Define the fan state
            initial: "auto",
            states: {
                auto: {              // The fan state can either be on 'auto' or 'on'
                    on: {
                        DOON: {
                            target: "on",
                        },
                    },
                },
                on: {                 // The fan state can either be on 'auto' or 'on'
                    on: {
                        DOAUTO: {
                            target: "auto",
                        },
                    },
                },
            },
        },
    },
});