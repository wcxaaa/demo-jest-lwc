import { LightningElement } from "lwc";

export default class DemoClickTextChange extends LightningElement {
  btnClickingCount = 0;

  get btnClickingLabel() {
    return `Clicked me ${this.btnClickingCount} Times`;
  }

  handleClickBtnClicking() {
    this.btnClickingCount++;
  }
}
