import { createElement } from "lwc";
import DemoClickTextChange from "c/demoClickTextChange";

describe("c-demo-click-text-change", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test("Should increase clicking counter", async () => {
    // Arrange
    const element = createElement("c-demo-click-text-change", {
      is: DemoClickTextChange
    });

    document.body.appendChild(element);

    const btnClicking = element.shadowRoot.querySelector(
      "lightning-button.btnClicking"
    );

    // Act
    btnClicking.dispatchEvent(new MouseEvent("click"));
    btnClicking.dispatchEvent(new MouseEvent("click"));
    btnClicking.dispatchEvent(new MouseEvent("click"));

    // Wait for async DOM changes to complete
    await new Promise(process.nextTick);

    // Assert
    expect(btnClicking.label).toEqual(`Clicked me ${3} Times`);
  });
});
