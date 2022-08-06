import { createElement } from "lwc";
import DemoConditionalRendering from "c/demoConditionalRendering";

describe("c-demo-conditional-rendering", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test("Switch to night", async () => {
    // Arrange
    const element = createElement("c-demo-conditional-rendering", {
      is: DemoConditionalRendering
    });

    document.body.appendChild(element);

    /** @type { HTMLInputElement } */
    const dayToggler = element.shadowRoot.querySelector("input.dayToggler");
    expect(dayToggler).toBeTruthy();

    // By default should show day content
    /** @type { HTMLParagraphElement } */
    let salutation = element.shadowRoot.querySelector("p.salutation");
    expect(salutation).toBeTruthy();
    expect(salutation.textContent).toEqual("Good day!");

    // Act
    dayToggler.dispatchEvent(new MouseEvent("click"));

    // Wait for async DOM changes to complete
    await new Promise(process.nextTick);

    // Assert
    salutation = element.shadowRoot.querySelector("p.salutation");
    expect(salutation).toBeTruthy();
    expect(salutation.textContent).toEqual("Good night!");
  });
});
