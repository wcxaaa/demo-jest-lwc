import { LightningElement, api } from "lwc";

export default class DemoDataPassingChild extends LightningElement {
  @api staffName = "Unknown staff";
  @api ready = false;

  get readyTogglerLabel() {
    if (this.ready) {
      return "Ready!";
    }
    return "Preparing...";
  }

  /**
   * @param { MouseEvent } e
   */
  handleReadyTogglerChange(e) {
    /** @type { HTMLInputElement } */
    const toggler = e.target;
    this.ready = toggler.checked;
    // Notify Parent
    this.dispatchEvent(
      new CustomEvent("changereadystate", {
        detail: {
          id: null,
          name: this.staffName,
          ready: this.ready
        }
      })
    );
  }
}
