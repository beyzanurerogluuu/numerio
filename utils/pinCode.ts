export const reduceToSingleDigit = (num: number): number => {
  let current = num;
  while (current > 9) {
    const digits = current.toString().split('').map(Number);
    current = digits.reduce((sum, digit) => sum + digit, 0);
  }
  return current;
};

export const calculatePinCode = (dateString: string): string[] => {
  // dateString format expected: "DD.MM.YYYY" or "DD/MM/YYYY" or "DD-MM-YYYY"
  const parts = dateString.split(/[-./]/);
  if (parts.length !== 3) return Array(9).fill('');

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return Array(9).fill('');

  // 1. Hane: Gün
  const hane1 = reduceToSingleDigit(day);
  
  // 2. Hane: Ay
  const hane2 = reduceToSingleDigit(month);
  
  // 3. Hane: Yıl
  const hane3 = reduceToSingleDigit(year);
  
  // 4. Hane: 1 + 2 + 3
  const hane4 = reduceToSingleDigit(hane1 + hane2 + hane3);
  
  // 5. Hane: 1 + 4
  const hane5 = reduceToSingleDigit(hane1 + hane4);
  
  // 6. Hane: 1 + 2
  const hane6 = reduceToSingleDigit(hane1 + hane2);
  
  // 7. Hane: 2 + 3
  const hane7 = reduceToSingleDigit(hane2 + hane3);
  
  // 8. Hane: 6 + 7
  const hane8 = reduceToSingleDigit(hane6 + hane7);
  
  // 9. Hane: 1'den 8'e kadar tüm hanelerin toplamı
  const sum1To8 = hane1 + hane2 + hane3 + hane4 + hane5 + hane6 + hane7 + hane8;
  const hane9 = reduceToSingleDigit(sum1To8);

  return [
    hane1.toString(),
    hane2.toString(),
    hane3.toString(),
    hane4.toString(),
    hane5.toString(),
    hane6.toString(),
    hane7.toString(),
    hane8.toString(),
    hane9.toString(),
  ];
};
