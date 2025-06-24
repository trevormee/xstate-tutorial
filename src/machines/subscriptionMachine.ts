
//// Subscription Machine - History States
import { setup, assign, assertEvent } from "xstate";

export const subscriptionMachine = setup({
    types: {
        context: {} as { uname: string},
        events: {} as 
            | { type: "change.name"; uname: string}
            | { type: "set.pro"}
            | { type: "set.free"}
            | { type: "enter.name"}
            | { type: "go.back"}
    },
    actions: {
        "change.name": assign(({event}) => {
            assertEvent(event, "change.name");
            return { uname: event.uname };
        })
    }
}).createMachine({
    context: {
        uname: "",                    // Init. name as empty string
    },
    id: "Subscription Machine",
    initial: "subscription",         // initial/parent state
    on: {
        "change.name": {
            actions: {
                type: "change.name",
            },
        },
    },
    states: {
        subscription: {
            initial: "free",         // set subscription state to initially be free
            on: {
                "enter.name": {      // define the event/transistion that a user wants to enter their name
                    target: "name",
                },
            },
            states: {
                free: {             
                    on: {           // transition from subscription.free --> subscription.pro
                        "set.pro": {    
                            target: "pro",
                        },
                    },
                },
                pro: {              // transition from subscription.pro --> subscription.free
                    on: {
                        "set.free": {
                            target: "free"
                        },
                    },
                },
                hist: {             // define the history piece of state
                    type: "history",
                },
            },
        },
        name: {                     // define the name state
            on: {                   // * define transition to go from name state back to either 
                "go.back": {        // subscription.free or subscription.pro depending where user was *
                    target: "subscription.hist",
                },
            },
        },
    },
});