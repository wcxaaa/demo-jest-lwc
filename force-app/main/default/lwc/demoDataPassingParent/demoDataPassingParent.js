import { LightningElement, api, track } from "lwc";

/** @typedef { {id: number, name: string, ready: boolean } IReadyState } */

export default class DemoDataPassingParent extends LightningElement {
  @api crews = ["Casting", "Lightings", "Filming"];

  @track staffReadyState = new Map();

  get notAllReady() {
    if (this.staffReadyState) {
      return !this.checkIsEveryoneReady();
    }
    return true;
  }

  get flatReadyState() {
    /** @type { IReadyState[] } */
    const state = [];
    if (this.staffReadyState) {
      this.staffReadyState.forEach((value, key) => {
        state.push({
          id: Math.random(),
          name: key,
          ready: value
        });
      });
    }
    return state;
  }

  get directorLabel() {
    if (this.notAllReady) {
      return "⌛ Director waiting for the crew to get ready...";
    }
    return "📽️ Looks like everyone is ready!";
  }

  connectedCallback() {
    this.staffReadyState = this.createReadyStateMap(this.crews);
  }

  checkIsEveryoneReady() {
    let isEveryoneReady = true;
    this.staffReadyState.forEach((value, _) => {
      isEveryoneReady = isEveryoneReady && value;
    });
    return isEveryoneReady;
  }

  /**
   * @param { CustomEvent<IReadyState> } e
   */
  onStaffReadyStateChange(e) {
    const nextReadyState = e.detail;
    this.staffReadyState = new Map([
      ...this.staffReadyState,
      [nextReadyState.name, nextReadyState.ready]
    ]);
  }

  /**
   * @param {string[]} crews
   * @return {Map<string, boolean>}
   */
  createReadyStateMap(crews) {
    return new Map([...crews.map((ele) => [ele, false])]);
  }
}
