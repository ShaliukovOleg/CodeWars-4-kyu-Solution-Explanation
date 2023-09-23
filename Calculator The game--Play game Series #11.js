function calculatorGame(number, goal, moves, buttons, portal = []) {
  let bestResult = null;

  function addNumToArr(info) {
      const buttonWithAdd = buttons.find(btn => btn.includes(info));
      const [operation, valueStr] = buttonWithAdd.split(/[\[\]]/).filter(Boolean);
      const value = parseInt(valueStr);
      const applyAddNum = (arr, value) => {
          return arr.map(btn => {
              if (/^\[\+\]1$/.test(btn)) {
                  return btn;
              } else if (/^[0-9]+$/.test(btn)) {
                  return (parseInt(btn) + operation + value).toString();
              }
              return btn;
          });
      }
      buttons = applyAddNum(buttons, value);
  }

  function mirrorNumber(num) {
      return parseInt(`${num}${parseInt(num.toString().split('').reverse().join(''))}`);
  }

  function reverseNumber(num) {
      const reversed = parseInt(num.toString().split('').reverse().join(''));
      return num < 0 ? -reversed : reversed;
  }

  function sumDigits(num) {
      return [...num.toString()].reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  function applyOperation(num, operation) {
      switch (operation[0]) {
          case "+":
              return num + parseInt(operation.slice(1));
          case "-":
              return num - parseInt(operation.slice(1));
          case "*":
              return num * parseInt(operation.slice(1));
          case "/":
              return num / parseInt(operation.slice(1));
          case "X":
              const [operator, valueStr] = operation.split('^');
              const value = parseInt(valueStr);
              return Math.pow(num, value);
          default:
              return num;
      }
  }

  function applyReplace(num, operation) {
      const [fromStr, toStr] = operation.split("=>");
      const numStr = num.toString();
      const newNumStr = numStr.split(fromStr).join(toStr);
      return parseInt(newNumStr);
  }

  function applyPortalEffect(currentNumber, portal) {
      const [leftPos, rightPos] = portal;
      const numStr = currentNumber.toString().split('').map(Number);

      if (leftPos <= numStr.length) {
          const leftDigit = numStr[numStr.length - leftPos];
          const rightDigit = numStr[numStr.length - rightPos];
          const sum = leftDigit + rightDigit;
          const newRightDigit = sum % 10;
          let carry = Math.floor(sum / 10);
          let currentIndex = numStr.length - rightPos - 1;

          do {
              const currentDigit = numStr[currentIndex];
              const newDigit = currentDigit + carry;
              numStr[currentIndex] = newDigit % 10;
              carry = Math.floor(newDigit / 10);

              if (carry > 0 && currentIndex === 0) {
                  numStr.unshift(carry);
                  break;
              }

              currentIndex--;
          } while (carry > 0 && currentIndex >= 0);

          numStr.splice(numStr.length - leftPos, 1);
          numStr[numStr.length - rightPos] = newRightDigit;
          return parseInt(numStr.join(''));
      }

      return currentNumber;
  }

  function shiftFunc(num, direction) {
      const numStr = num.toString();
      let shiftedNumStr;
      if (direction === "left") shiftedNumStr = numStr.substring(1) + numStr.charAt(0);
      if (direction === "right") shiftedNumStr = numStr.charAt(numStr.length - 1) + numStr.substring(0, numStr.length - 1);
      return parseInt(shiftedNumStr);
  }

  function calculateResult(currentNumber, currentMoves, currentPath, currentStore) {
      if (currentMoves === 0) {
          if (currentNumber === goal) {
              if (!bestResult) {
                  bestResult = currentPath;
              }
          }
          return;
      }

      for (const button of buttons) {
          let store;
          let nextNumber;
          let nextMoves = currentMoves - 1;
          let nextPath = [...currentPath, button];

          switch (true) {
              case button.startsWith("<<"):
                  nextNumber = Math.floor(currentNumber / 10);
                  break;
              case button.startsWith("Reverse"):
                  nextNumber = reverseNumber(currentNumber);
                  break;
              case button.includes("Inv10"):
                  const numStr = currentNumber.toString();
                  const invertedNum = numStr.split('').map(digit => (digit === '0' ? '0' : (10 - parseInt(digit)))).join('');
                  nextNumber = parseInt(invertedNum);
                  break;
              case button.startsWith("Copy"):
                  store = currentNumber;
                  nextNumber = currentNumber;
                  break;
              case button.startsWith("Paste"):
                  nextNumber = applyPasteEffect(currentNumber, currentStore); // Используем сохраненное значение store
                  break;
              case button.includes("SUM"):
                  nextNumber = sumDigits(currentNumber);
                  break;
              case button.includes("=>"):
                  nextNumber = applyReplace(currentNumber, button);
                  break;
              case button.includes(`[+]`):
                  addNumToArr("[+]");
                  nextNumber = currentNumber;
                  break;
              case button.includes("[-]"):
                  addNumToArr("[-]");
                  nextNumber = currentNumber;
                  break;
              case button.includes("Mirror"):
                  nextNumber = mirrorNumber(currentNumber);
                  break;
              case (/^[0-9]$/).test(button):
                  const digit = parseInt(button);
                  nextNumber = parseInt(`${currentNumber}${digit}`);
                  break;
              case (button.includes("Shift") && button.includes("<")):
                  nextNumber = shiftFunc(currentNumber, "left");
                  break;
              case (button.includes("Shift") && button.includes(">")):
                  nextNumber = shiftFunc(currentNumber, "right");
                  break;
              case button.startsWith('+') && !button.includes("[]"):
                  nextNumber = applyOperation(currentNumber, button);
                  break;
              case button.startsWith('-') && !button.includes("[]"):
                  nextNumber = applyOperation(currentNumber, button);
                  break;
              case button.startsWith('*') && !button.includes("[]"):
                  nextNumber = applyOperation(currentNumber, button);
                  break;
              case button.startsWith('/') && !button.includes("[]"):
                  nextNumber = applyOperation(currentNumber, button);
                  break;
              case button.startsWith("X^"):
                  nextNumber = applyOperation(currentNumber, button);
                  break;
              default:
                  const operationResult = currentNumber;
                  if (operationResult !== currentNumber) {
                      nextNumber = operationResult;
                  } else {
                      continue; // Пропускаем неприменимые операции
                  }
                  break;
          }

          // Применяем портал к следующему числу без расходования хода портала
          const portalEffect = applyPortalEffect(nextNumber, portal);
          calculateResult(portalEffect, nextMoves, nextPath, store);
      }
  }

  function applyPasteEffect(currentNumber, currentStore) {
      return parseInt(`${currentNumber}${currentStore}`);
  }

  calculateResult(number, moves, [], undefined);
  return bestResult || [];
}