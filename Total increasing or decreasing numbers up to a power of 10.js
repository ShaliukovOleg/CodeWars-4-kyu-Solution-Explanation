// Solution / решение:
function totalIncDec(x) {
    // Объявление функции totalIncDec с одним аргументом x.

    // Внутренняя функция binomial(n, k) для вычисления биномиальных коэффициентов.
    const binomial = (n, k) => {
        let res = 1; // Инициализация результата значением 1.
        if (k > n - k) { // Если k больше чем n - k, заменить k на n - k для оптимизации.
            k = n - k;
        }
        for (let i = 0; i < k; ++i) { // Цикл для вычисления биномиального коэффициента.
            res *= (n - i); // Умножение текущего значения на (n - i).
            res /= (i + 1); // Деление текущего значения на (i + 1).
        }
        return res; // Возвращение результата биномиального коэффициента.
    }

    // Вычисление общего количества возрастающих и убывающих чисел.
    return binomial(x + 10, 10) + binomial(x + 9, 9) - 10 * x - 2;
    // Возвращение суммы биномиальных коэффициентов с вычетом дубликатов и числа 0.
}

console.log(totalIncDec(0)); // 0
console.log(totalIncDec(1)); // 9
console.log(totalIncDec(2)); // 99
console.log(totalIncDec(3)); // 474
console.log(totalIncDec(4)); // 1674

// Short solution 
function cwr(n, k) {
    let ret = 1; // Инициализация переменной для результата.
    for (let i = 1; i <= k; i += 1) {
        ret *= (n + k - i) / i; // Вычисление сочетаний.
    }
    return Math.round(ret); // Возвращение округленного результата.
}

function totalIncDec(x) {
    return cwr(10, x) + cwr(11, x) - 1 - x * 10;
    // Вычисление общего количества возрастающих и убывающих чисел
    // с вычетом дубликатов и числа 0.
}

function totalIncDec(x) {
    return cwr(10, x) + cwr(11, x) - 1 - x * 10; 
}

/*

cwr(n, k) - Функция для вычисления сочетаний.
let ret = 1; - Инициализация переменной ret результатом.
for (let i = 1; i <= k; i += 1) - Цикл для вычисления сочетаний.
ret *= (n + k - i) / i - Вычисление сочетания на каждой итерации.
return Math.round(ret); - Возвращение округленного результата.
totalIncDec(x) - Основная функция для подсчета общего количества возрастающих и убывающих чисел.
cwr(10, x) - Вызов функции для подсчета сочетаний возрастающих чисел.
cwr(11, x) - Вызов функции для подсчета сочетаний убывающих чисел.
1 - Вычитание 1 для исключения числа 0.
x * 10 - Умножение на x * 10 для учета чисел от 1 до 10^x, которые были посчитаны дважды (как возрастающие и как убывающие).
Возвращение итоговой суммы чисел.

*/
/*

Let's define increasing numbers as the numbers whose digits, read from left to right, 
are never less than the previous ones: 234559 is an example of increasing number.

Conversely, decreasing numbers have all the digits read from left to right so that no digits is bigger than the previous one: 97732 is an example of decreasing number.

You do not need to be the next Gauss to figure that all numbers with 1 or 2 digits are either increasing or decreasing: 00, 01, 02, ..., 
98, 99 are all belonging to one of this categories (if not both, like 22 or 55): 
101 is indeed the first number which does NOT fall into either of the categories. 
Same goes for all the numbers up to 109, while 110 is again a decreasing number.

Now your task is rather easy to declare (a bit less to perform): 
you have to build a function to return the total occurrences of all the increasing or decreasing numbers below 10 raised to the xth power (x will always be >= 0).

To give you a starting point, there are a grand total of increasing and decreasing numbers as shown in the table:

Total	Below
1	1
10	10
100	100
475	1000
1675	10000
4954	100000
12952	1000000
This means that your function will have to behave like this:

totalIncDec(0)==1
totalIncDec(1)==10
totalIncDec(2)==100
totalIncDec(3)==475
totalIncDec(4)==1675
totalIncDec(5)==4954
totalIncDec(6)==12952
Tips: efficiency and trying to figure out how it works are essential: with a brute force approach, 
some tests with larger numbers may take more than the total computing power currently on Earth to be finished in the short allotted time.

To make it even clearer, the increasing or decreasing numbers between in the range 101-200 are: 
[110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 122, 123, 124, 125, 126, 127, 128, 129, 133, 
    134, 135, 136, 137, 138, 139, 144, 145, 146, 147, 148, 149, 155, 156, 157, 158, 159, 166, 167, 
    168, 169, 177, 178, 179, 188, 189, 199, 200], 
that is 47 of them. In the following range, 201-300, 
there are 41 of them and so on, getting rarer and rarer.

Trivia: just for the sake of your own curiosity, 
a number which is neither decreasing of increasing is called a bouncy number, like, say, 3848 or 37294; also, 
usually 0 is not considered being increasing, decreasing or bouncy, but it will be for the purpose of this kata

*/

/*

Определим возрастающие числа как числа, цифры которых, читаемые слева направо, 
никогда не бывают меньше предыдущих: 234559 - пример возрастающего числа.

И наоборот, в уменьшающихся числах все цифры читаются слева направо так, что ни одна цифра не больше предыдущей: 97732 - пример уменьшающегося числа.

Не нужно быть Гауссом, чтобы понять, что все числа с 1 или 2 цифрами являются либо возрастающими, либо убывающими: 00, 01, 02, ..., 
98, 99 относятся к одной из этих категорий (если не к обеим, как 22 или 55): 
101 - действительно первое число, которое НЕ относится ни к одной из категорий. 
То же самое относится ко всем числам вплоть до 109, а 110 - опять-таки убывающее число.

Теперь ваша задача довольно проста в декларировании (немного меньше в выполнении): 
необходимо построить функцию, возвращающую суммарное количество всех возрастающих или убывающих чисел ниже 10, возведенных в x-ю степень (x всегда будет >= 0).

Для начала, общее количество возрастающих и убывающих чисел приведено в таблице:

Всего Ниже
1 1
10 10
100 100
475 1000
1675 10000
4954 100000
12952 1000000
Это означает, что ваша функция должна вести себя следующим образом:

totalIncDec(0)==1
totalIncDec(1)==10
totalIncDec(2)==100
totalIncDec(3)==475
totalIncDec(4)==1675
totalIncDec(5)==4954
totalIncDec(6)==12952
Советы: эффективность и попытка понять, как это работает, очень важны: при использовании метода грубой силы, 
некоторые тесты с большими числами могут потребовать больше, чем вся вычислительная мощность, существующая на Земле, чтобы закончить их за короткое время.

Чтобы было еще понятнее, увеличивающиеся или уменьшающиеся числа в диапазоне 101-200 таковы: 
[110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 122, 123, 124, 125, 126, 127, 128, 129, 133, 
    134, 135, 136, 137, 138, 139, 144, 145, 146, 147, 148, 149, 155, 156, 157, 158, 159, 166, 167, 
    168, 169, 177, 178, 179, 188, 189, 199, 200], 
то есть 47 из них. В следующем диапазоне, 201-300, 
их 41, и так далее, все реже и реже.

Мелочь: просто ради собственного любопытства, 
число, которое не уменьшается и не увеличивается, называется непостоянным, как, например, 3848 или 37294; кроме того, 
обычно 0 не считается ни увеличивающимся, ни уменьшающимся, ни надувным, но в данном ката это будет так.

*/