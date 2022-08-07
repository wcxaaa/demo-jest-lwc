import { createElement } from "lwc";
import DemoApexImperativeDataFetching from "c/demoApexImperativeDataFetching";

// Apex
import generate from "@salesforce/apex/LuckyNumberController.generate";

// Mocking imperative Apex method call
jest.mock(
  "@salesforce/apex/LuckyNumberController.generate",
  () => {
    return {
      default: jest.fn(() => Promise.resolve())
    };
  },
  { virtual: true }
);

describe("c-demo-apex-imperative-data-fetching", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    // restore the mock between each test block
    jest.restoreAllMocks();
  });

  test("Should display lucky numbers", async () => {
    // Arrange

    // Set up mock response
    const mockLuckyNumbers = [24, 36, 48, 60, 99];
    generate.mockReturnValue(
      new Promise((resolve, _) => resolve(mockLuckyNumbers))
    );

    const element = createElement("c-demo-apex-imperative-data-fetching", {
      is: DemoApexImperativeDataFetching
    });

    document.body.appendChild(element);

    const btnGenerate = element.shadowRoot.querySelector(
      "lightning-button.btnGenerate"
    );
    expect(btnGenerate).toBeTruthy();

    // Act
    btnGenerate.dispatchEvent(new MouseEvent("click"));
    // Wait for async DOM changes to complete
    await new Promise(process.nextTick);

    // Assert
    /** @type { HTMLUListElement } */
    const luckyNumbersHolder = element.shadowRoot.querySelector(
      "ul.luckyNumbersHolder"
    );
    expect(luckyNumbersHolder).toBeTruthy();
    expect(luckyNumbersHolder.childNodes.length).toEqual(
      mockLuckyNumbers.length
    );
  });

  test("Should display no-data message when no lucky number", async () => {
    // Arrange

    // Set up mock response.
    // Need this even if controller returns "undefined"
    const mockLuckyNumbers = [];
    generate.mockReturnValue(
      new Promise((resolve, _) => resolve(mockLuckyNumbers))
    );

    const element = createElement("c-demo-apex-imperative-data-fetching", {
      is: DemoApexImperativeDataFetching
    });

    document.body.appendChild(element);

    const btnGenerate = element.shadowRoot.querySelector(
      "lightning-button.btnGenerate"
    );
    expect(btnGenerate).toBeTruthy();

    // Act
    btnGenerate.dispatchEvent(new MouseEvent("click"));
    // Wait for async DOM changes to complete
    await new Promise(process.nextTick);

    // Assert
    /** @type { HTMLLIElement } */
    const noDataItem = element.shadowRoot.querySelector("li.noData");
    expect(noDataItem).toBeTruthy();
  });
});
