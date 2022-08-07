import { LightningElement, track } from "lwc";

// Apex
import generate from "@salesforce/apex/LuckyNumberController.generate";

/**
 * @typedef { {minValue: number, maxValue: number, count: number} } ILuckyNumberConfig
 */

export default class DemoApexImperativeDataFetching extends LightningElement {
  /** @type { ILuckyNumberConfig } */
  @track luckyNumberConfig = {
    minValue: 10,
    maxValue: 100,
    count: 5
  };

  /** @type { number[] } */
  luckyNumbers = [];

  get luckyNumberEmpty() {
    if (this.luckyNumbers) {
      return this.luckyNumbers.length <= 0;
    }
    return true;
  }

  get displayingLuckyNumber() {
    return this.luckyNumbers.map((ele) => ({ id: Math.random(), number: ele }));
  }

  /**
   * @param { CustomEvent<{value: string}> } e
   */
  onCountChange(e) {
    this.luckyNumberConfig = {
      ...this.luckyNumberConfig,
      count: parseInt(e.detail.value, 10)
    };
  }

  /**
   * @param { CustomEvent<{value: string}> } e
   */
  onMinNumberChange(e) {
    this.luckyNumberConfig = {
      ...this.luckyNumberConfig,
      minValue: parseInt(e.detail.value, 10)
    };
  }

  /**
   * @param { CustomEvent<{value: string}> } e
   */
  onMaxNumberChange(e) {
    this.luckyNumberConfig = {
      ...this.luckyNumberConfig,
      maxValue: parseInt(e.detail.value, 10)
    };
  }

  async onGenerateClick(_) {
    try {
      const newLuckyNumbers = await generate({
        minValue: this.luckyNumberConfig.minValue,
        maxValue: this.luckyNumberConfig.maxValue,
        count: this.luckyNumberConfig.count
      });
      if (newLuckyNumbers) {
        this.luckyNumbers = newLuckyNumbers;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
