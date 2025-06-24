# XState Tutorials Project

This project contains various XState State Machines on various concepts. Each 
state machine has a section in App.tsx that corresponds to that machine.

## Concepts include... <br />
### 1) Basic XState Setup 
Files on demonstrating this concept: <br />
* onOffMachine.ts <br />
#### 3 Key Concepts to State Machines
* State → The status or condition of a machine at a given time
* Event → A signal that tells a machine something happened (ex: a button being clicked, a file being loaded)
* Transition → A rule that defines WHEN and HOW a machine can change from 1 state to another. It ensures you can only move between states in predefined ways.
### 2) Compound (Parent/Child --> Hierarchial) States
Files on demonstrating this concept: <br />
* compoundStatesMachine.ts
* coffeeMachine.ts
#### Compound States
* Are states that contain other states, which can have their own nested states and so on, leading to a hierarchial structuring <br />
![Alt text](images/compound-states.png)

### 3) Parallel States
Files on demonstrating this concept: <br />
* mediaPlayerMachine.ts
* thermostatMachine.ts

### 4) History States
* subscriptionMachine.ts
### 5) Context
