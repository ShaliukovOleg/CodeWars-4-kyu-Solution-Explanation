// Solution / Решение

// С использованием мемоизации. Для того, чтобы не вычислять результат повторно.
// Создаем пустой массив для мемоизации результатов вычислений
let memo = [];

// Объявляем функцию `sum` с двумя параметрами: `posNum` и `reqNum`
function sum(posNum, reqNum = posNum) {
    if (posNum === 0) return 1; // пустая сумма 
    if (posNum < 0 || reqNum === 0) return 0; // разделение невозможно
    if (memo[posNum] && memo[posNum][reqNum]) return memo[posNum][reqNum]; // Проверяем, есть ли результат в мемоизации
    // Вычисляем результат как сумму двух рекурсивных вызовов:
    // - Исключаем текущее слагаемое `reqNum` из разбиения (`reqNum - 1`).
    // - Включаем текущее слагаемое `reqNum` в разбиение (`posNum - reqNum`).
    let result = sum(posNum, reqNum - 1) + sum(posNum - reqNum, reqNum);
    // Если массив для данного `posNum` ещё не создан, создаем его.
    if (!memo[posNum]) {
        memo[posNum] = [];
    }
    // Сохраняем результат в мемоизации `posNum` и `reqNum`.
    memo[posNum][reqNum] = result;
    // Возвращаем результат, представляющий количество способов разбиения числа `posNum`.
    return result;
}

// Without memo / Без использования мемоизации 
// but with explosive tests doesn't work / не работает при огромных числах (именно на codewars)
function sum(posNum, reqNum = posNum) {
    if (posNum === 0) return 1; // пустая сумма 
    if (posNum < 0 || reqNum === 0) return 0; // разделение невозможно

    // Вычисляем результат как сумму двух рекурсивных вызовов:
    // - Исключаем текущее слагаемое `reqNum` из разбиения (`reqNum - 1`).
    // - Включаем текущее слагаемое `reqNum` в разбиение (`posNum - reqNum`).
    return sum(posNum, reqNum - 1) + sum(posNum - reqNum, reqNum);
}

// Cycles / Циклы
function sum(n) {
    const partitionCount  = new Array(n + 1).fill(0);

    // значение partitionCount[0] принимаем 1, так как ноль уже способ разбиения числа
    partitionCount[0] = 1;
    // Итерация от 1 до n
    for (let num = 1; num <= n; num++) {
        // Итерация от num до n
        for (let i = num; i <= n; i++) {
            // Здесь мы обновляем значение partitionCount[i] при помощи уже вычисленных результатов.
            partitionCount[i] += partitionCount[i - num];
        }
    }
    // Возвращаем partitionCount[n], который содержит количество способов разбиения числа n.
    return partitionCount[n];
}


// Stack / Стек

function sum(posNum, reqNum = posNum) {
    // Создаем стек для хранения пар значений (posNum, reqNum).
    const stack = [];
    // Инициализируем счетчик количества способов разбиения.
    let count = 0;

    // Начальное значение: (posNum, reqNum).
    stack.push([posNum, reqNum]);

    while (stack.length > 0) {
        // Извлекаем пару значений (posNum, reqNum) из стека.
        const [currentPosNum, currentReqNum] = stack.pop();

        // Если `currentPosNum` становится равным 0, увеличиваем счетчик на 1 
        // (нашли один способ разбиения).
        if (currentPosNum === 0) count++;

        // Проверяем условие, чтобы избежать лишних итераций и добавляем новые значения в стек.
        if (currentPosNum > 0 && currentReqNum > 0) {
            // Добавляем в стек две пары значений: 
            // 1 - с уменьшенным `currentReqNum`
            // 2 - с уменьшенным `currentPosNum`
            stack.push([currentPosNum, currentReqNum - 1]);
            stack.push([currentPosNum - currentReqNum, currentReqNum]);
        }
    }
    // Возвращаем общее количество способов разбиения.
    return count;
}



/*

How many ways can you make the sum of a number?
From wikipedia: https://en.wikipedia.org/wiki/Partition_(number_theory)

In number theory and combinatorics, 
a partition of a positive integer n, 
also called an integer partition, 
is a way of writing n as a sum of positive integers. 
Two sums that differ only in the order of their summands are considered the same partition. 
If order matters, the sum becomes a composition. 
For example, 4 can be partitioned in five distinct ways:

4
3 + 1
2 + 2
2 + 1 + 1
1 + 1 + 1 + 1
Examples
Basic
sum(1) // 1
sum(2) // 2  -> 1+1 , 2
sum(3) // 3 -> 1+1+1, 1+2, 3
sum(4) // 5 -> 1+1+1+1, 1+1+2, 1+3, 2+2, 4
sum(5) // 7 -> 1+1+1+1+1, 1+1+1+2, 1+1+3, 1+2+2, 1+4, 5, 2+3

sum(10) // 42
Explosive
sum(50) // 204226
sum(80) // 15796476
sum(100) // 190569292

*/

/*

Сколькими способами можно получить сумму числа?
Из википедии: https://en.wikipedia.org/wiki/Partition_(number_theory)

В теории чисел и комбинаторике, 
разбиение целого положительного числа n, 
называемое также целочисленным разбиением, 
это способ записи n в виде суммы целых положительных чисел. 
Две суммы, отличающиеся только порядком слагаемых, считаются одним и тем же разбиением. 
Если порядок имеет значение, то сумма становится композицией. 
Например, число 4 может быть разбито пятью различными способами:

4
3 + 1
2 + 2
2 + 1 + 1
1 + 1 + 1 + 1
Примеры
Базовый
sum(1) // 1
sum(2) // 2 -> 1+1 , 2
sum(3) // 3 -> 1+1+1, 1+2, 3
sum(4) // 5 -> 1+1+1+1, 1+1+2, 1+3, 2+2, 4
sum(5) // 7 -> 1+1+1+1+1, 1+1+1+2, 1+1+3, 1+2+2, 1+4, 5, 2+3

sum(10) // 42
Взрывной
sum(50) // 204226
sum(80) // 15796476
sum(100) // 190569292

*/