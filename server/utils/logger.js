const colors = {
  red: '\x1b[31m%s\x1b[0m',
  green: '\x1b[32m%s\x1b[0m',
  yellow: '\x1b[33m%s\x1b[0m',
  blue: '\x1b[36m%s\x1b[0m',
};

/**
 * @param  {string} color  message color
 * @param  {string} msg    message text
 * @param  {any} data      data for logging
 */
const logToConsole = (color, msg, data) => {
  console.log(color, msg, data ? data : '');
};

/**
 *  Message text:
 * `r` - red,
 * `g` - green,
 * `y` - yellow,
 * `b` - blue
 */
export const logger = {
  /**
   * Red message text
   *
   * @param  {string} msg  message text
   * @param  {any} data    data for logging
   */
  r: (msg, data) => logToConsole(colors.red, msg, data),

  /**
   * Green message text
   *
   * @param  {string} msg  message text
   * @param  {any} data    data for logging
   */
  g: (msg, data) => logToConsole(colors.green, msg, data),

  /**
   * Yellow message text
   *
   * @param  {string} msg  message text
   * @param  {any} data    data for logging
   */
  y: (msg, data) => logToConsole(colors.yellow, msg, data),

  /**
   * Blue message text
   *
   * @param  {string} msg  message text
   * @param  {any} data    data for logging
   */
  b: (msg, data) => logToConsole(colors.blue, msg, data),
};
