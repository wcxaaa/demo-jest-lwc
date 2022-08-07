@IsTest
public with sharing class Test_LuckyNumberController {
  @IsTest
  public static void generateNumbers() {
    Integer min = 10;
    Integer max = 100;
    Integer count = 10;

    // Act
    Test.startTest();
    List<Integer> numbers = LuckyNumberController.generate(min, max, count);
    Test.stopTest();

    // Should generate enough numbers
    system.assertEquals(count, numbers.size());

    for (Integer currentNumber : numbers) {
      system.assert(
        currentNumber >= min,
        'Random number should be greater than or equal to the given min value'
      );
      system.assert(
        currentNumber < max,
        'Random number should less than the given max value'
      );
    }
  }

  @IsTest
  public static void generateNumbers_StrangeInput() {
    Integer min = 0;
    Integer max = -10;
    Integer count = -1000000;

    // Act
    Test.startTest();
    List<Integer> numbers = LuckyNumberController.generate(min, max, count);
    Test.stopTest();

    // Should generate 0 numbers
    system.assertEquals(0, numbers.size());
  }
}
