import { createElement } from "lwc";
import DemoDataPassingChild from "c/demoDataPassingChild";

/** @typedef { import("../demoDataPassingChild").default } DemoDataPassingChildType */

describe("c-demo-data-passing-child", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test("Should show correct staff name and ready state", async () => {
    // Arrange

    // data passed to this child
    const currentState = {
      staffName: "Property master",
      ready: true
    };

    /** @type { DemoDataPassingChildType } */
    const element = createElement("c-demo-data-passing-child", {
      is: DemoDataPassingChild
    });

    element.staffName = currentState.staffName;
    element.ready = currentState.ready;

    // Act
    document.body.appendChild(element);
    // Wait for async DOM changes to complete
    await new Promise(process.nextTick);

    // Assert
    // Should show staff name in the card title
    const stateCard = element.shadowRoot.querySelector(
      "lightning-card.stateCard"
    );
    expect(stateCard).toBeTruthy();
    expect(stateCard.title).toEqual(currentState.staffName);

    // Should switch the toggler (here: ready -> true)
    /** @type { HTMLInputElement } */
    const readyToggler = element.shadowRoot.querySelector("input.readyToggler");
    expect(readyToggler).toBeTruthy();
    expect(readyToggler.checked).toEqual(currentState.ready);
  });
});
