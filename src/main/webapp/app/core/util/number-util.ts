export class NumberUtil {
  public static checkDuplicateDigits(val: string): boolean {
    for (let i = 0; i < val.length; i++) {
      for (let j = i + 1; j < val.length; j++) {
        if (val[i] === val[j]) {
          return true;
        }
      }
    }
    return false;
  }
}
