export default class Utils {

    /**
     * decimalのデータ桁数から、最小値を求める
     * @param length 整数と小数を合わせた桁数
     * @param decimalLength 小数桁数
     */
    static calcMinValue(length: number, decimalLength: number): number {
        return -Utils.calcMaxValue(length, decimalLength);
    }

    /**
     * decimalのデータ桁数から、最大値を求める
     * @param length 整数と小数を合わせた桁数
     * @param decimalLength 小数桁数
     */
    static calcMaxValue(length: number, decimalLength: number): number {
        var temp = Math.pow(10, length) - 1;
        temp = temp * Math.pow(10, -decimalLength);
        return temp;
    }
}
