import { createElement } from "lwc";
import DemoDataPassingParent from "c/demoDataPassingParent";

/**
 * @typedef { import("../demoDataPassingParent").default } DemoDataPassingParentType
 * @typedef { import("../../demoDataPassingChild/demoDataPassingChild").default } DemoDataPassingChildType
 */

describe("c-demo-data-passing-parent", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test("Should enable action button when everyone is ready", async () => {
    // Arrange
    const crews = ["Property master", "Make-up Artist"];

    /** @type { DemoDataPassingParentType } */
    const parentComponent = createElement("c-demo-data-passing-parent", {
      is: DemoDataPassingParent
    });

    parentComponent.crews = crews;

    document.body.appendChild(parentComponent);
    await new Promise(process.nextTick);

    /** @type { DemoDataPassingChildType[] } */
    const childComponents = Array.from(
      parentComponent.shadowRoot.querySelectorAll(
        "main>c-demo-data-passing-child"
      )
    );
    expect(childComponents.length).toEqual(crews.length);

    // Act
    for (const [index, component] of childComponents.entries()) {
      component.dispatchEvent(
        new CustomEvent("changereadystate", {
          detail: {
            id: null,
            name: crews[index],
            ready: true
          }
        })
      );
    }

    await new Promise(process.nextTick);

    // Check
    const btnAction = parentComponent.shadowRoot.querySelector(
      "lightning-button.btnAction"
    );
    expect(btnAction).toBeTruthy();
    expect(btnAction.disabled).toEqual(false);
  });
});
