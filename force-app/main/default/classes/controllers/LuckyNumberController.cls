public with sharing class LuckyNumberController {
  @AuraEnabled
  public static List<Integer> generate(
    Integer minValue,
    Integer maxValue,
    Integer count
  ) {
    List<Integer> luckyNumbers = new List<Integer>();
    Integer appliedCount = 0;

    if (count != null && count > 0) {
      appliedCount = count;
    }

    for (Integer i = 0; i < appliedCount; i++) {
      luckyNumbers.add(getRandomNumberBetween(minValue, maxValue));
    }

    return luckyNumbers;
  }

  /**
   * get a random Integer number ∈ [minValue, maxValue)
   */
  private static Integer getRandomNumberBetween(
    Integer minValue,
    Integer maxValue
  ) {
    Integer appliedMinValue = minValue;
    Integer appliedMaxValue = maxValue;

    if (appliedMinValue > appliedMaxValue) {
      // swap position
      Integer tmp = appliedMaxValue;
      appliedMinValue = maxValue;
      appliedMaxValue = tmp;
    }

    return Math.floor(
        Math.random() * (appliedMaxValue - appliedMinValue) + appliedMinValue
      )
      .intValue();
  }
}
