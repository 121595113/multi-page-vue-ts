/**
 *
 * @param {数字} num
 * @param {位数} digit
 * @description 格式化数字为金额并添加千分位，支持正负数，支持指定小数位
 * @example
 *  formatCurrency(12345678);      --> "12,345,678"
 *  formatCurrency(1234.8902);      --> "1,234.89"
 *  formatCurrency(-98123.0123);    --> "-98,123.01"
 *  formatCurrency(-500000);    --> "-500,000"
 */
export function formatCurrency (num, digit) {
  // 按小数点分成2部分
  const source = String(num).split('.');
  // 将整数部分进行都好分割
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,');
  digit = (digit > 0 && digit < 10) ? digit : 2;
  const tail = source[1] ? Number('0.' + source[1]).toFixed(digit) : '';
  source[1] = tail.split('.')[1];
  // 再将小数部分合并进来
  return tail ? source.join('.') : source.join('');
}
