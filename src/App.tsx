
/************************************************************************
/*
  onOffMachine App Component - basics
*/

// import { onOffMachine } from "./machines/onOffMachine";
// import { useMachine } from "@xstate/react";
// import './App.css'

// function App() {
  
//   // useMachine hook returns the current state and a function to send events to the machine
//   // the send function sends the "switch/toggle" event to the machine
//   const [state, send] = useMachine(onOffMachine); 

//   return (
//     <>
//     {/* type property defines the event type taht triggers the transition */}
//       <button onClick={() => send({ type: "toggle"})}>
//         {/* the matches method checks if hte machine is in a specific state */}
//         {state.matches("Active") ? "Active" : "Inactive"}
//       </button>
//     </>
//   )
// }

// export default App
/************************************************************************ */

/*************************************************************************/
//// compoundStatesMachine App component - Compound States
// import { compoundStatesMachine } from "./machines/compoundStatesMachine";
// import { useMachine } from "@xstate/react";

// function App() {
//   const [state, send] = useMachine(compoundStatesMachine);
//   const isPlaying = state.matches({ Inserted: "Playing" });
//   const isOpened = state.matches("Ejected");
//   const isStopped = state.matches({ Inserted: "Stopped" });
//   const isDisabled = isOpened;
//   return (
//     <div>
//       <h1>{JSON.stringify(state.value)}</h1>
//       <button
//         onClick={() =>
//           send({
//             type: isOpened ? "INSERT" : "EJECT",
//           })
//         }
//       >
//         {isOpened ? "insert" : "eject"}
//       </button>
//       <button
//         disabled={isDisabled}
//         onClick={() =>
//           send({
//             type: isPlaying ? "PAUSE" : "PLAY",
//           })
//         }
//       >
//         {isPlaying ? "pause" : "play"}
//       </button>
//       <button
//         disabled={isDisabled || isStopped}
//         onClick={() => {
//           send({ type: "STOP" });
//         }}
//       >
//         stop
//       </button>
//     </div>
//   );
// }

// export default App;

/*************************************************************************/

/*************************************************************************/
//// coffeeMachine.ts - Compound States
// import { coffeeMachine } from "./machines/coffeeMachine";
// import { useMachine } from "@xstate/react";

// function App() {

//   // Hook into the XState Machine
//   const [state, send] = useMachine(coffeeMachine);
  
//   // Top Level States
//   const isEmptied = state.matches("Emptied");
//   const isFilled = state.matches("Filled");

//   // Nested States inside the "Filled" (parent compound) state
//   const isIdle = state.matches({Filled: "Idle"});
//   const isGrinding = state.matches({Filled: "Grinding"});
//   const isPulsing = state.matches({Filled: "Pulsing"});


//   return (
//     <div>
//       {/* Display current machine state */}
//       <h1>{JSON.stringify(state.value)}</h1>
//       {/* Button toggles <=> FILL & EMPTY Top-Level States */}
//       <button
//         onClick={() =>
//           send({
//             type: isEmptied ? "FILL" : "EMPTY",
//           })
//         }
//       >
//         {isEmptied ? "Fill" : "Empty"} {/* Conditionaly renders Fill or Empty depending on isEmpty */}
//       </button>
//       {/* Only show nested actions (idle, grind, pulse, stop) when grinder is filled */}
//       { isFilled && (
//         <>
//           {/* Grind from idle */}
//           {isIdle && (
//             <button onClick={() => send({ type: "GRIND"})}>Grind</button>
//           )}
//           {/* Pulse or Stop from grinding */}
//           {isGrinding && (
//             <>
//             <button onClick={() => send({ type: "PULSE"})}>Pulse</button>
//             <button onClick={() => send({ type: "STOP"})}>Stop</button>
//             </>
//           )}
//           {/* Stop or Grind from pulsing */}
//           {isPulsing && (
//             <>
//               <button onClick={() => send({ type: "STOP"})}>Stop</button>
//               <button onClick={() => send({ type: "GRIND"})}>Grind</button>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

/*************************************************************************/

//// mediaPlayerMachine App Component - Compound States
// import { mediaPlayerMachine } from "./machines/mediaPlayerMachine";
// import { useMachine } from "@xstate/react";

// function App() {
//   const [state, send] = useMachine(mediaPlayerMachine);
//   const isPlaying = state.matches({ track: "playing" });
//   const isMuted = state.matches({ mute: "muted" });
//   return (
//     <div>
//       <h2>
//         <pre>{JSON.stringify(state.value, null, 2)}</pre>
//       </h2>
//       <button
//         onClick={() => {
//           send({ type: isMuted ? "UNMUTE" : "MUTE" });
//         }}
//       >
//         {isMuted ? "unmute" : "mute"}
//       </button>
//       <button
//         onClick={() =>
//           send({
//             type: isPlaying ? "PAUSE" : "PLAY",
//           })
//         }
//       >
//         {isPlaying ? "pause" : "play"}
//       </button>
//     </div>
//   );
// }

// export default App;
/*************************************************************************/

/*************************************************************************/

//// thermostateMachine.ts - Parallel States
// import { thermostatMachine } from "./machines/thermostatMachine";
// import { useMachine } from "@xstate/react";

// function App(){

//   const [state, send] = useMachine(thermostatMachine);

//   const isCooling = state.matches({setting: "cooling"});
//   const isFanOn = state.matches({fan: "on"});

//   return (
//     <div>
//       <h1>Current Fan State: {JSON.stringify(state.value)}</h1>
//       {/* Setting control button -- heating || cooling */}
//       <button 
//         onClick={() => {
//           send({type: isCooling ? "HEAT" : "COOL"})
//         }}
//       >
//         {isCooling ? "heat" : "cool"}
//       </button>
//       {/* Fan control button -- auto || on */}
//       <button 
//         onClick={() => {
//           send({type: isFanOn ? "DOAUTO" : "DOON"})
//         }}
//       >
//         {isFanOn ? "auto" : "on"}
//       </button>
//     </div>
//   );

// }

// export default App;

/*************************************************************************/

//// subscriptionMachine.ts - History State
// import React from "react";
// import { subscriptionMachine } from "./machines/subscriptionMachine";
// import { useMachine } from "@xstate/react";

// function App () {

//   const [state, send] = useMachine(subscriptionMachine);

//   const isEnteringName = state.matches("name");

//   return (
//     <>
//       <div>
//         {state.matches("subscription") && (
//           <>
//             <h2> 
//               <pre>{JSON.stringify(state.value, null, 2)}</pre>
//             </h2>
//             <h3>Subscription Method: </h3>
//             <label htmlFor="free">Free</label>
//             <input 
//               type="radio"
//               name="free"
//               id="free"
//               value="free"
//               checked={state.matches({subscription: "free"})}
//               onChange={() => send({ type: "set.free"})}
//               />
//               <label htmlFor="pro">Pro</label>
//             <input 
//               type="radio"
//               name="pro"
//               id="pro"
//               value="pro"
//               checked={state.matches({subscription: "pro"})}
//               onChange={() => send({ type: "set.pro"})}
//             />
            
//           </>
//         )}
//       </div>
//       <div>
//         <label htmlFor="name"></label>
//         <button 
//           onClick={() => 
//             send({ type: isEnteringName ? "go.back" : "enter.name"})
//           }
//           >
//             {isEnteringName ? "Go back" : "Enter name"}
//           </button>
//       </div>
//     </>
//   );
// }

// export default App;

/*************************************************************************/

//// volumeMachine.ts App Component -- Adding Context
import { volumeMachine } from "./machines/volumeMachine";
import { useMachine } from "@xstate/react";

function App() 
{
  const [state, send] = useMachine(volumeMachine);
  const { volume } = state.context;   // access the 'volume' context

  return (
    <div>
      <p>Volume: {volume}</p>
      <input
        type="range"
        value={volume}
        onChange={(e) =>
          send({ type: "change.volume", volume: e.target.valueAsNumber })
        }
      />
    </div>
  );
}

export default App;