export const defaultCode = `/**
* Sample code 1
* Command Name = /upper
* Parameters = 0
* function upper(textValue){
*   return textValue.split(" ").map((val, idx, arr) => {
*       if (arr.length >= 2 && idx === arr.length - 2) {
*           return val.toUpperCase();
*       }
*       return val;
*   }).join(" ");
* }
*/

/**
* Sample code 2
* Command Name = /add
* Parameters = 2
* function add(textValue, num1, num2){
*   const sum = Number(num1) + Number(num2);
*   return textValue + sum.toString();
* }
*/

function addNewCommand(textValue){
  // type your code...
  return textValue;
}`;