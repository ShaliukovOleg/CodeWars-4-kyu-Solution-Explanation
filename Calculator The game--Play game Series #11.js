function calculatorGame(number, goal, moves, btns, portal, memory = undefined, pasted = true) {
    // проверка на валидность
    const isValidNumber = n => n !== undefined && Number.isInteger(n) && n < 1e7 && n > -1e7;
    // выполнение операции shift
    const shiftNumber = (arr, shift) => +[...(shift === -1 ? arr.slice(1).concat(arr[0]) : [arr.pop()].concat(arr))].join('');
    // выполнение операции зеркало 
    const mirrorNumber = number => +('' + number + [...'' + Math.abs(number)].reverse().join(''));
    // выполнение операции инверсия числа от 10
    const inverse10 = number => +[...'' + Math.abs(number)].map(x => (10 - x) % 10).join('') * (number < 0 ? -1 : 1);

    if (number === goal) return []; // если число соответствует результату, возвращаем массив
    if (!moves) return undefined; // если ходы кончились, то undefined (на самом деле необязательное условие, так как согласно условию у любого теста, есть решение!)

    for (const btn of btns) {
        let nextNumber, nextbtns = btns, nextMoves = 1, result, valueInStorage = pasted, nextMemory = memory;

        switch (true) { // тут просто праверяем наличие кнопок в соответствующем уровне игры и тестируем на поиск нужного нам результата.
            case '+-*/'.includes(btn[0]):
                nextNumber = eval(number + btn);
                break;
            case btn[0] === 'X':
                nextNumber = number ** btn.slice(2);
                break;
            case (/^[0-9]$/).test(btn) && !btn.includes("[]"):
                nextNumber = +('' + number + btn);
                break;
            case btn === '<<':
                nextNumber = Math.floor(number / 10);
                break;
            case btn === 'Reverse':
                nextNumber = +[...'' + Math.abs(number)].reverse().join('');
                if (number < 0) nextNumber = -nextNumber;
                break;
            case btn.includes('=>'):
                const [a, b] = btn.split('=>');
                nextNumber = +('' + number).replace(new RegExp(a, 'g'), b);
                break;
            case btn === 'SUM':
                nextNumber = +[...'' + Math.abs(number)].reduce((a, x) => a + +x, 0);
                if (number < 0) nextNumber = -nextNumber;
                break;
            case btn === '<Shift':
                nextNumber = shiftNumber([...'' + Math.abs(number)], -1);
                break;
            case btn === 'Shift>':
                nextNumber = shiftNumber([...'' + Math.abs(number)], 1);
                break;
            case btn === 'Mirror':
                nextNumber = mirrorNumber(number);
                break;
            case btn[0] === '[':
                nextNumber = number;
                nextbtns = btns.map(b => b !== btn ? b.replace(/\d+/, x => eval(x + btn.replace(/[[\]]/g, ''))) : b);
                break;
            case btn === 'Inv10':
                nextNumber = inverse10(number);
                break;
            case btn === 'Copy' && pasted:
                nextNumber = nextMemory = number;
                valueInStorage = false;
                nextMoves = 0;
                break;
            case btn === 'Paste' && memory !== undefined:
                nextNumber = +('' + number + memory);
                valueInStorage = true;
                break;
            default:
                continue;
        }

        if (isValidNumber(nextNumber)) { // проверка на валидность
            if (portal) while (nextNumber > 10 ** (portal[0] - 1)) nextNumber = nextNumber % 10 ** (portal[0] - 1) + (nextNumber - nextNumber % 10 ** (portal[0] - 1)) / 10 ** (portal[0] - portal[1]);
            result = calculatorGame(nextNumber, goal, moves - nextMoves, nextbtns, portal, nextMemory, valueInStorage);
            if (result) {
                result.unshift(btn);
                return result;
            }
        }
    }
}

/*

Welcome
In this kata, we'll playing with an Android game Calculator: The game.

Basic Rule
(from the game)
"there's a lot of screenshots"

Input
You are given five arguments:
number: An integer. The initial number.
goal: An integer. The target number.
moves: An integer. The maximum number of moves you can make.
buttons: The available buttons. It's a string array, each element represents a button.
portal: An array of 2 elements. The rule of partal please see the part: Rule of Portal.

For the Level 1(see the image above), the arguments are:
number=0, goal=2, moves=2, buttons=["+1"] (no portal)

Output
A string array. It represents the buttons you pressed in turn.
For the Level 1(see the image above), the output should be:
["+1","+1"]
Note that the buttons can be used repeatedly.

All Buttons
"+-[n]": Such as " + 1"," - 2"," * 3"," / 4"... Pressing the button will carry out corresponding basic mathematical operations on the current number. 
For example, if the current number is 0, when " + 1" pressed, the current number became to 1(0+1=1). Note that the negative can be used, such as " * -3"," / -2"..

"X^[n]": Such as X ^ 2, X ^ 3, X ^ 4, etc..Pressing the button will carry out the power operation for the current number.For example, 
if the current number is 2, when "X^3" pressed, the current number became to 8.

"n": A number without operator.Pressing the button will insert it to the end of the current number.For example, 
if the current number is 1, when "23" pressed, the current number became to 123.

"<<": It represents backspace, delete a digit from the end of the current number.For example, 
if the current number is 123, when "<<" pressed, the current number became to 12.

"Reverse".If this button pressed, the current number will be reversed(Note that the leading zeros will be removed).
For example, if the current number is 123, when "Reverse" pressed, the current number became to 321. 
Note, if the current number is negative, "-" should not reversed.

"[xx]=>[yy]": xx and yy represent one or more digits.If this button pressed, 
all the digits xx in the current number will be replaced with yy(from left to right).
For example, if the current number is 111, when "1=>2" pressed, the current number became to 222. 
Another example, if the current number is 222, when "22=>33" pressed, the current number became to 332, 
instead of 233(the meaning of from left to right).

"SUM": If this button pressed, the current number will be changed to the sum of its digits.For example, 
if the current number is 123, when "SUM" pressed, the current number became to 6(1 + 2 + 3=6).
Note, if the current number is negative, the sum of it should be negative too.

"Shift": Two buttons are available: "<Shift" and "Shift>".If the button pressed, 
the current number will be shifted to left or right 1 position.For example, 
if the current number is 123, when "<Shift" pressed, the current number became to 231. 
Note, if the current number is negative, symbol - should not shift.

"Mirror": If this button pressed, the mirror number will be append to the end of the current number.
For example, if the current number is 123, when "Mirror" pressed, the current number became to 123321. 
Note, if the current number is negative, - should not append to the end(if you do that, 
NaN error report is waiting for you; -)).

"[+][n]": Increase the value of all buttons(except for itself) by n.For example, 
we have three buttons: "+1", "-2", and "[+]1", if "[+]1" pressed, 
three buttons became to "+2", "-3", and "[+]1".

"Inv10": Inverse each digit of the current number.
For a digit x(except 0), after "Inv10" pressed, it will be changed to 10 - x.For example, 
if the current number is 123, when "Inv10" pressed, the current number became to 987.

"Copy" and "Paste": "Copy" button can copy the current number to the memory; 
"Paste" button can paste the copied number to the end of the current number.
Note, "Copy" doesn't cost a move, but "Paste" does. 
And, you can not using "Paste" button before you used "Copy" button copy a number to the memory.

Rule of Portal
Argument portal is an array of two elements, like[l, r](l > r), where l is the left position of portal, 
and r is the right position of portal.The position is count from the right to the left(1 - based).
For example, a number 789, 9 at the position 1, 8 at the position 2, and 7 at the position 3. 
If the portal's left position at 3, and right position at 1, we use an array [3,1] to represent the portal.

The rule of portal is: Any digit at position l, will be transmitted to position r, and plus it with the current digit(carry if needed).

See an example:
"there's a lot of screenshots"

As you can see, the left position of portal is 4, and the right position of portal is 1. 
So, portal = [4, 1].And, we have buttons: "+8", "*4", "9", "Inv10", "7=>0".

If button "9" pressed, the current number 189 will be changed to:

___v
1899
^___

digit 1 at the left position of portal, so it will be 
added to the right position of portal:

__v
900    ---> 899 + 1=900
^__

Finally, we got:
"there's a lot of screenshots"

Another example:
"there's a lot of screenshots"

number = 9, goal = 64, moves = 2, buttons = ["4", "6"], portal = [3, 2]
First, we can press "6".No digit at the left position of portal:
"there's a lot of screenshots"
__v_
0096
_^__

Now, we can:
__v_
0096
_^__

press "4":

__v_
0964
_^__

digit 9 at the left position of portal, so it will be 
added to the right position of portal:

__v_             __v_             __v_ 
0964    --->     0154    --->     0064
_^__             _^__             _^__

Again, digit 1 at the left position of portal, so it will be 
added to the right position of portal:

Finally, we got:

Which is the goal number of game level.
If more than one digits before / at left position of portal, see this example:
number = 45, goal = 516, moves = 4, buttons = ["+10", "Mirror"], portal = [4, 2]
Let's press "Mirror" button twice and see what's happening: (Sorry, I can't upload images atm)

__v_
0045
^___

Press "Mirror":

__v_             __v_
4554    --->     0594
^___             ^___

4 add to 5:

Press "Mirror" again:

_____v_             _____v_             _____v_             _____v_             _____v_
0000594    --->     0594495    --->     0059535    --->     0005625    --->     0000675
___^___             ___^___             ___^___             ___^___             ___^___

4 add to 9 and carry:
9 add to 3 and carry:
5 add to 2:

Note
The calculator can only calculate numbers less than 1E7.That is, the maximum number of computations is 6 digits.
For example, if the current number is 12345 and you pressed "Mirror", we can not got a new number 1234554321, 
overflow error will be reported.

In the calculation process, all numbers should be integers, because calculators do not support floating point numbers.
If you do that, will got an error report; -)
All inputs are valid. !!!!!!
All testcases have at least one valid solution.

*/

/*

Добро пожаловать
В этом ката мы будем играть с игрой Калькулятор для Android: Игра.

Основное правило
(из игры)
"есть много скриншотов"

Вход
Вам дается пять аргументов:
число: Целое число. Начальное число.
goal: целое число. Целевое число.
ходы: Целое число. Максимальное количество ходов, которое можно сделать.
buttons (кнопки): Доступные кнопки. Это строковый массив, каждый элемент которого представляет собой кнопку.
portal (портал): Массив из 2 элементов. Правило портала см. в части: Правило портала.

Для уровня 1 (см. рисунок выше) аргументами являются:
number=0, goal=2, moves=2, buttons=["+1"] (без портала).

Выход
Строковый массив. Он представляет собой поочередно нажатые кнопки.
Для уровня 1 (см. рисунок выше) выходными данными должны быть:
["+1", "+1"]
Обратите внимание, что кнопки можно использовать многократно.

Все кнопки
"+-[n]": Например, " + 1", "- 2", "* 3", "/ 4"... При нажатии кнопки выполняются соответствующие базовые математические операции над текущим числом. 
Например, если текущее число равно 0, то при нажатии кнопки " + 1" текущее число станет равным 1(0+1=1). Заметим, что можно использовать и отрицательные значения, например, " * -3", "/ -2".

"X^[n]": X ^ 2, X ^ 3, X ^ 4 и т.д. Нажатие кнопки приводит к выполнению операции питания для текущего номера. Например, 
если текущий номер равен 2, то при нажатии кнопки "X^3" текущий номер станет равным 8.

"n": Число без оператора. При нажатии кнопки оно вставляется в конец текущего числа. Например, 
если текущее число равно 1, то при нажатии кнопки "23" текущее число станет равным 123.

"<<": Представляет собой обратный пробел, удаляющий цифру из конца текущего числа.Например, 
если текущий номер 123, то при нажатии кнопки "<<" текущий номер становится равным 12.

"Reverse": При нажатии этой кнопки текущее число будет перевернуто (обратите внимание, что ведущие нули будут удалены).
Например, если текущее число равно 123, то при нажатии кнопки "Reverse" текущее число станет равным 321. 
Обратите внимание, что если текущее число отрицательное, то "-" не должно меняться на противоположное.

"[xx]=>[yy]": xx и yy представляют собой одну или несколько цифр. При нажатии этой кнопки, 
все цифры xx в текущем номере будут заменены на yy (слева направо).
Например, если текущий номер равен 111, то при нажатии кнопки "1=>2" текущий номер станет равен 222. 
Другой пример, если текущий номер равен 222, то при нажатии кнопки "22=>33" текущий номер станет равен 332, 
вместо 233 (значение слева направо).

"SUM": При нажатии этой кнопки текущее число будет изменено на сумму его цифр. Например, 
если текущее число 123, то при нажатии кнопки "SUM" текущее число станет равным 6 (1 + 2 + 3=6).
Обратите внимание, если текущее число отрицательное, то и его сумма должна быть отрицательной.

"Shift": Имеются две кнопки: "<Сдвиг" и "Сдвиг>". При нажатии этой кнопки, 
текущее число будет сдвинуто влево или вправо на 1 позицию. Например, 
если текущий номер равен 123, то при нажатии кнопки "<Shift>" текущий номер станет равен 231. 
Обратите внимание, если текущее число отрицательное, то символ - не должен сдвигаться.

"Зеркало": При нажатии этой кнопки зеркальное число будет добавлено в конец текущего числа.
Например, если текущий номер равен 123, то при нажатии кнопки "Зеркало" текущий номер станет равен 123321. 
Обратите внимание, что если текущее число отрицательное, то "-" не должно добавляться в конец (если вы это сделаете, 
Вас ожидает сообщение об ошибке NaN;-)).

"[+][n]": Увеличивает значение всех кнопок (кроме самой себя) на n. Например, 
у нас есть три кнопки: "+1", "-2" и "[+]1", если нажать "[+]1", 
три кнопки превращаются в "+2", "-3" и "[+]1".

"Inv10": Инверсия каждой цифры текущего числа.
Для цифры x (кроме 0) после нажатия кнопки "Inv10" она изменится на 10 - x. Например, 
если текущий номер равен 123, то при нажатии кнопки "Inv10" текущий номер превратится в 987.

"Копировать" и "Вставить": Кнопка "Copy" позволяет скопировать текущий номер в память; 
кнопка "Вставить" позволяет вставить скопированное число в конец текущего номера.
Обратите внимание, что "Copy" не стоит хода, а "Paste" - стоит. 
Кроме того, нельзя использовать кнопку "Вставить" до того, как вы использовали кнопку "Копировать" для копирования номера в память.

Правило портала
Аргумент portal представляет собой массив из двух элементов, например[l, r](l > r), где l - левая позиция портала, 
Позиция отсчитывается справа налево (1 - основа).
Например, число 789 - 9 в позиции 1, 8 в позиции 2 и 7 в позиции 3. 
Если левая позиция портала равна 3, а правая - 1, то для представления портала мы используем массив [3,1].

Правило портала таково: Любая цифра, находящаяся в позиции l, передается в позицию r и плюсуется с текущей цифрой (при необходимости переносится).

Пример:
"много скриншотов".

Как видно, левая позиция портала равна 4, а правая - 1. 
Таким образом, portal = [4, 1].И, у нас есть кнопки: "+8", "*4", "9", "Inv10", "7=>0".

Если нажать кнопку "9", то текущее число 189 изменится на:

___v
1899
^___

цифра 1 в левой позиции портала, таким образом, будет 
добавлена в правую позицию портала:

__v
900 ---> 899 + 1=900
^__

Наконец, мы получили:
"скриншотов много".

Другой пример:
"есть много скриншотов"

число = 9, цель = 64, ходы = 2, кнопки = ["4", "6"], портал = [3, 2]
Сначала мы можем нажать "6". В левой позиции портала нет цифры:
"много скриншотов"
__v_
0096
_^__

Теперь можно:
__v_
0096
_^__

нажать "4":

__v_
0964
_^__

цифра 9 в левой позиции портала, поэтому она будет 
добавится к правой позиции портала:

__v_             __v_             __v_ 
0964    --->     0154    --->     0064
_^__             _^__             _^__

Снова цифра 1 в левой позиции портала, поэтому она будет добавлена 
добавлена к правой позиции портала:

Наконец, мы получили:

Это и есть номер цели игрового уровня.
Если перед / в левой позиции портала стоит более одной цифры, то см. пример:
номер = 45, цель = 516, ходы = 4, кнопки = ["+10", "Зеркало"], портал = [4, 2].
Давайте дважды нажмем кнопку "Зеркало" и посмотрим, что происходит: (Извините, сейчас не могу загрузить изображения)

__v_
0045
^___

Нажимаем кнопку "Зеркало":

__v_             __v_
4554    --->     0594
^___             ^___

4 прибавить к 5:

Снова нажмите "Зеркало":

_____v_             _____v_             _____v_             _____v_             _____v_
0000594    --->     0594495    --->     0059535    --->     0005625    --->     0000675
___^___             ___^___             ___^___             ___^___             ___^___

4 прибавить к 9 и перенести:
9 прибавить к 3 и перенести:
5 прибавить к 2:

Примечание
Калькулятор может вычислять только числа меньше 1E7, то есть максимальное количество вычислений составляет 6 цифр.
Например, если текущее число 12345 и вы нажали кнопку "Mirror", то мы не сможем получить новое число 1234554321, 
будет выдана ошибка переполнения.

В процессе вычислений все числа должны быть целыми, так как калькуляторы не поддерживают числа с плавающей запятой.
В этом случае будет выдано сообщение об ошибке;-)
Все вводимые данные действительны. !!!!!!
Все тестовые примеры имеют хотя бы одно правильное решение.

*/