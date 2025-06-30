import { setup, createActor } from "xstate";
import { describe, test, expect } from "vitest";
import { coffeeMachine } from "../machines/coffeeMachine";

describe("coffeeMachine tests", async () => {
    test("machine should initially be empty", async () => {
        const actor = createActor(coffeeMachine);

        // 2. Act
        actor.start();

        // 3. Assert
        expect(actor.getSnapshot().value).toBe("Emptied");
    });

    test("machine should transition from Emptied to Filled: Idle", async () => {
        const actor = createActor(coffeeMachine);

        // 2. Act
        actor.start();
        actor.send({ type: "FILL" });

        // 3. Assert
        expect(actor.getSnapshot().value).toStrictEqual({ Filled: "Idle" });
    });

    test("machine should transition from Emptied to Filled", async () => {
        const actor = createActor(coffeeMachine);

        // 2. Act
        actor.start();
        actor.send({ type: "FILL" });
        actor.send({ type: "GRIND" });

        // 3. Assert
        expect(actor.getSnapshot().value).toStrictEqual({ Filled: "Grinding" });
    });
});
