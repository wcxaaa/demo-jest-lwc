import { LightningElement } from "lwc";

export default class DemoConditionalRendering extends LightningElement {
  night = false;

  get dayTogglerLabel() {
    if (this.night) {
      return "🌙";
    }
    return "☀️";
  }

  /**
   * @param { MouseEvent } e
   */
  handleDayTogglerChange(e) {
    /** @type { HTMLInputElement } */
    const toggler = e.target;
    this.night = toggler.checked;
  }
}
