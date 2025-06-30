import { setup, createActor } from "xstate";
import { describe, test, expect } from "vitest";
import { onOffMachine } from "../machines/onOffMachine";

describe("onOffMachine Tests", async () => {
    test("that the machine toggles to active", async () => {
        const actor = createActor(onOffMachine);

        // 2. Act
        actor.start();
        actor.send({ type: "toggle" }); // => should be in 'Active' state
        actor.send({ type: "toggle" }); // => should be in 'Inactive' state
        actor.send({ type: "toggle" }); // => should be in 'Active' state

        // 3. Assert
        expect(actor.getSnapshot().value).toBe("Active");
    });

    test("that the machine is initially inactive", async () => {
        const actor = createActor(onOffMachine);

        // 2. Act
        actor.start();
        // actor.send({ type: "toggle" }); // => should be in 'Active' state
        // actor.send({ type: "toggle" }); // => should be in 'Inactive' state
        // actor.send({ type: "toggle" }); // => should be in 'Active' state

        // 3. Assert
        expect(actor.getSnapshot().value).toBe("Inactive");
    });
});
