// Solution / решение:
function insaneIncOrDec(x) {
    // Определение функции binomial, вычисляющей биномиальный коэффициент
    const binomial = (n, k) => {
        let res = 1n;
        // Проверка, чтобы выбрать наименьшее k из (n, n - k)
        if (k > n - k) {
            k = n - k;
        }
        // Вычисление биномиального коэффициента
        for (let i = 0n; i < k; i += 1n) {
            res *= (n - i);
            res /= (i + 1n);
        }
        return res; // Возвращение результата
    }

    // Вычисление общего количества возрастающих и убывающих чисел
    return (binomial(x + 10n, 10n) + binomial(x + 9n, 9n) - 10n * x - 2n) % 12345787n;
}

console.log(insaneIncOrDec(0n)); // 0n
console.log(insaneIncOrDec(1n)); // 9n
console.log(insaneIncOrDec(2n)); // 99n
console.log(insaneIncOrDec(3n)); // 474n
console.log(insaneIncOrDec(4n)); // 1674n

/*

Данная задача конечно оказалась не из легких, потому что я не знал, как нужно округлять BigInt, но поучительной. Просто цифры до 10000 спокойно проходили тестирование и без округления по модулю.
Описание решения. 
Отличий не так много от работы с числами 
(задача: Total increasing or decreasing numbers up to a power of 10), 
только замена Math.round на "% 12345787n" для округления, 
расписал все подробно ниже:
Функция insaneIncOrDec(x) предназначена для подсчета количества положительных целых чисел, 
имеющих либо возрастающую, либо убывающую последовательность цифр (или и то, и другое), 
с заданным максимальным числом цифр x, при этом число 0 исключается из подсчета. 
Результат возвращается по модулю 12345787n. Вот разбор этой функции по шагам:

Объявление функции insaneIncOrDec(x), которая принимает один аргумент x.

Внутри функции определена вложенная функция binomial(n, k), 
которая вычисляет биномиальный коэффициент C(n, k) используя большие целые числа (BigInt). 
Функция принимает два аргумента n и k.

Инициализируется переменная res с начальным значением 1n.
Если k больше, чем n - k, то k переопределяется как n - k. 
Это делается для оптимизации вычислений, так как C(n, k) = C(n, n - k).
Затем выполняется цикл с переменной i от 0n до k с шагом 1n.
В цикле res умножается на (n - i) и затем делится на (i + 1n), 
чтобы вычислить биномиальный коэффициент.
Функция возвращает вычисленное значение res.
Возвращаемое значение функции insaneIncOrDec вычисляется следующим образом:

Вычисляется биномиальный коэффициент C(x + 10n, 10n) с помощью функции binomial, 
который представляет количество возрастающих чисел.
Вычисляется биномиальный коэффициент C(x + 9n, 9n) с помощью функции binomial, 
который представляет количество убывающих чисел.
Вычитается 10n * x для учета чисел с одинаковыми цифрами.
Вычитается 2n, чтобы исключить число 0.
Возвращается результат по модулю 12345787n.
Таким образом, функция insaneIncOrDec(x) предоставляет ответ на задачу, 
определенную в описании, используя биномиальные коэффициенты и большие целые числа.

*/

/*

Disclaimer
This Kata is an insane step-up from GiacomoSorbi's Kata, 
so I recommend to solve it first before trying this one.

Problem Description
A positive integer n is called an increasing number if its digits are in increasing order 
(e.g. 123, 144568, 56799).

Similarly, n is called a decreasing number if its digits are in decreasing order 
(e.g. 210, 76642, 998500).

Note that the numbers whose digits are all the same 
(e.g. 1111, 22222) are both increasing and decreasing.

Given the maximum number of digits (max_digits), 
how many positive integers in the range are either increasing or decreasing (or both)? 
Since your answer will be very large, please give your answer modulo 12345787.

Also note that, unlike Giacomo's version, 
the number zero is excluded from the counts 
(because it's not positive).

Constraints
1 <= max_digits <= 10 ** 9

Note the input size!

The input will be always a valid integer.

Examples
# Up to two digits, all numbers are either increasing or decreasing
insane_inc_or_dec(1) == 9
insane_inc_or_dec(2) == 99
insane_inc_or_dec(3) == 474
insane_inc_or_dec(4) == 1674
insane_inc_or_dec(5) == 4953
insane_inc_or_dec(6) == 12951
Acknowledgement
This problem was inspired by Project Euler #113: Non-bouncy Numbers.

If you enjoyed this Kata, please also have a look at my other Katas!

*/

/*

Отказ от ответственности
Эта Ката является безумным шагом вперед по сравнению с Ката ДжакомоСорби, 
поэтому я рекомендую сначала решить его, прежде чем пробовать этот.

Описание задачи
Целое положительное число n называется возрастающим, если его цифры расположены в порядке возрастания 
(например, 123, 144568, 56799).

Аналогично, n называется убывающим числом, если его цифры расположены в порядке убывания 
(например, 210, 76642, 998500).

Заметим, что числа, все цифры которых одинаковы 
(например, 1111, 22222) являются одновременно и возрастающими, и убывающими.

Учитывая максимальное количество цифр (max_digits), 
сколько положительных целых чисел в диапазоне являются либо возрастающими, либо убывающими (либо и теми, и другими)? 
Поскольку ваш ответ будет очень большим, дайте его по модулю 12345787.

Также обратите внимание, что, в отличие от версии Джакомо, 
число ноль исключается из подсчетов 
(поскольку оно не является положительным).

Ограничения
1 <= max_digits <= 10 ** 9

Обратите внимание на размер входных данных!

На входе всегда будет правильное целое число.

Примеры
# До двух цифр все числа либо возрастают, либо убывают
insane_inc_or_dec(1) == 9
insane_inc_or_dec(2) == 99
insane_inc_or_dec(3) == 474
insane_inc_or_dec(4) == 1674
insane_inc_or_dec(5) == 4953
insane_inc_or_dec(6) == 12951

*/

