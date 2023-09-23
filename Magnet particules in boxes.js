// Solution / решение:
const doubles = (maxk, maxn) => {
    // Инициализируем переменные result, p и q
    let result = 0, p, q;

    // Внешний цикл для k от 1 до maxk
    for (let i = 1; i <= maxk; i++) {
        // Сохраняем текущее значение s в p перед началом итерации
        p = result;

        // выносим формулу для более удобного чтения кода внутреннего цикла    
        const twoK = j => 1 / (i * (j + 1) ** (2 * i));

        // Внутренний цикл для n от 1 до maxn
        for (let j = 1; j <= maxn; j++) {
            // Сохраняем текущее значение s в q перед обновлением
            q = result;

            // Вычисляем новое значение s, добавляя к нему следующий член ряда
            result += twoK(j);

            // Проверяем условие для выхода из внутреннего цикла
            if (Math.abs(q - result) < 1e-9 / maxk / maxn) break;
        }

        // Проверяем условие для выхода из внешнего цикла
        if (Math.abs(p - result) < 1e-9 / maxk) break;
    }

    // Возвращаем итоговое значение s
    return result;
}

/*

Professor Chambouliard hast just discovered a new type of magnet material. 
He put particles of this material in a box made of small boxes arranged 
in K rows and N columns as a kind of 2D matrix K x N where K and N are postive integers. 
He thinks that his calculations show that the force exerted by the particle in the small box (k, n)

some formulas here: full description here: https://www.codewars.com/kata/56c04261c3fcf33f2d000534/train/javascript

Task:
To help Professor Chambouliard can we calculate the function doubles 
that will take as parameter maxk and maxn such that doubles(maxk, maxn) = S(maxk, maxn)? 
Experiences seems to show that this could be something around 0.7 when maxk and maxn are big enough.

Examples:
doubles(1, 3)  => 0.4236111111111111
doubles(1, 10) => 0.5580321939764581
doubles(10, 100) => 0.6832948559787737
Notes:
In u(1, N) the dot is the multiplication operator.
Don't truncate or round: Have a look at the testing function in "Sample Tests".

*/

/*

Профессор Шамбульяр только что открыл новый тип магнитного материала. 
Он поместил частицы этого материала в ящик, состоящий из маленьких ящичков, 
расположенных в K строк и N столбцов в виде своеобразной двумерной матрицы K x N, 
где K и N - целые числа с положительным знаком. 
K строк и N столбцов в виде двумерной матрицы K x N, где K и N - целые положительные числа. 
Он считает, что его расчеты показывают, что сила, действующая на частицу в маленьком ящике (k, n)

некоторые формулы здесь: полное описание здесь: https://www.codewars.com/kata/56c04261c3fcf33f2d000534/train/javascript

Задание:
В помощь профессору Шамбульяру можно вычислить функцию doubles 
которая будет принимать в качестве параметров maxk и maxn такие значения, что doubles(maxk, maxn) = S(maxk, maxn)? 
Опыт показывает, что при достаточно больших maxk и maxn это может быть что-то около 0.7.

Примеры:
doubles(1, 3) => 0.4236111111111111
doubles(1, 10) => 0.5580321939764581
doubles(10, 100) => 0.6832948559787737
Примечания:
В u(1, N) точка является оператором умножения.
Не надо усекать или округлять: Посмотрите функцию тестирования в разделе "Примеры тестов".

*/

