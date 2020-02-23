//// { order: 3, isJavaScript: true }

// 游乐场现在同样可以处理 JavaScript 文件。

// 很像知道我们为什么会在游乐场上增加对 JavaScript 的支持。
// 但是大多数 TypeScript 的用户可能正在使用 JavaScript。

// TypeScript 可以在 JavaScript 文件中使用类型推断，类型自动获取
// 和 JSDoc，以提供杰出的工具环境。
//
//  example:objects-and-arrays
//  example:automatic-type-acquisition
//  example:jsdoc-support

// 游乐场支持 JavaScript 意味着您可以通过复杂的 JSDoc 示例来
// 学习或引导其他人。或者在期望不匹配时调试问题。

// 例如。为什么这个 JSDoc 标注的类型不正确？
/**
 * 将两个 number 加起来
 * @param {number} The 第一个 number
 * @param {number} The 第二个 number
 * @returns {number}
 */
function addTwoNumbers(a, b) {
  return a + b;
}

// 在这样的环境中，您可以通过鼠标悬停来立即查看发生了什么，这很容易
// 找到问题。
