// Solution / Решение

// Определяем класс SegmentTree для построения и использования дерева отрезков
class SegmentTree {
    constructor(arr, op) {
        this.op = op;               // Операция, которую мы будем выполнять (например, сложение или максимум)
        this.n = arr.length;        // Длина исходного массива
        this.tree = new Array(4 * this.n); // Инициализируем массив для дерева отрезков с размером, достаточным для хранения дерева
        this.buildTree(arr, 0, 0, this.n - 1); // Вызываем функцию для построения дерева
    }

    // Функция для построения дерева отрезков рекурсивно
    buildTree(arr, node, left, right) {
        if (left === right) {
            this.tree[node] = arr[left]; // Если левый и правый индексы совпадают, то это листовой узел дерева
            return;
        }

        const mid = Math.floor((left + right) / 2); // Находим середину отрезка
        // Рекурсивно строим левое и правое поддерево
        this.buildTree(arr, 2 * node + 1, left, mid);
        this.buildTree(arr, 2 * node + 2, mid + 1, right);
        // Вычисляем значение текущего узла, применяя операцию op к значениям дочерних узлов
        this.tree[node] = this.op(this.tree[2 * node + 1], this.tree[2 * node + 2]);
    }

    // Функция для выполнения запроса на интервале [left, right]
    query(left, right, node = 0, nodeLeft = 0, nodeRight = this.n - 1) {
        if (left <= nodeLeft && right >= nodeRight) {
            return this.tree[node]; // Если текущий узел полностью внутри интервала [left, right], возвращаем его значение
        }
        if (right < nodeLeft || left > nodeRight) {
            return null; // Если текущий узел полностью вне интервала [left, right], возвращаем нейтральный элемент операции op
        }
        const mid = Math.floor((nodeLeft + nodeRight) / 2); // Находим середину текущего интервала
        // Рекурсивно выполняем запрос к левому и правому поддереву
        const leftResult = this.query(left, right, 2 * node + 1, nodeLeft, mid);
        const rightResult = this.query(left, right, 2 * node + 2, mid + 1, nodeRight);
        // Комбинируем результаты запросов, применяя операцию op
        if (leftResult === null) return rightResult;
        if (rightResult === null) return leftResult;
        return this.op(leftResult, rightResult);
    }
}

// Функция computeRanges принимает три аргумента:
// arr - массив объектов, над которым будут выполняться операции
// op - бинарная операция, которая будет применяться к элементам диапазонов
// ranges - массив диапазонов, для которых нужно вычислить результаты

// Short version
function computeRanges(arr, op, ranges) {
    // Создаем экземпляр класса SegmentTree (дерево отрезков), 
    // которое будет использоваться для эффективных запросов к диапазонам
    const segmentTree = new SegmentTree(arr, op);

    // Используем метод map для преобразования массива ranges.
    // Для каждого диапазона [start, end] выполняем следующее:
    // - Вызываем метод query дерева отрезков, передавая начальный (start) и конечный (end - 1) индексы.
    // - query возвращает результат операции op, выполненной над элементами диапазона.
    // - Результаты собираются в новом массиве, который будет возвращен из функции.
    return ranges.map(([start, end]) => segmentTree.query(start, end - 1));
}

// Long version
/*
function computeRanges(arr, op, ranges) {
    const segmentTree = new SegmentTree(arr, op); // Создаем экземпляр класса SegmentTree
    const results = [];

    for (const range of ranges) {
        const [start, end] = range;
        const result = segmentTree.query(start, end - 1); // Выполняем запрос к дереву отрезков
        results.push(result); // Добавляем результат в массив результатов
    }

    return results; // Возвращаем массив результатов
}
*/

// Version user К01эгА
/*
function computeRanges(arr, op, ranges) {
    function f(x, y) {
        if (x === null) return y;
        if (y === null) return x;
        return op(x, y);
    }
    const n = arr.length;
    const tree = Array(n).fill(null).concat(arr);
    for (let i = n - 1; i > 0; --i) {
        tree[i] = f(tree[i << 1], tree[i << 1 | 1]);
    }
    function query(l, r) {
        let resL = null, resR = null;
        for (l += n, r += n; l < r; l >>= 1, r >>= 1) {
            if ((l & 1) > 0) resL = f(resL, tree[l++]);
            if ((r & 1) > 0) resR = f(tree[--r], resR);
        }
        return f(resL, resR);
    }
    return ranges.map(([l, r]) => query(l, r));
}
*/

/*

A binary operation op is called associative if

op(a, op(b, c)) = op(op(a, b), c)

for example:

(1 + 2) + 8 = 1 + (2 + 8)
(A * B) * C = A * (B * C) where A, B, C are matrices with sizes N x M, M x K, K x L

Task
Inputs:

arr - array of objects with type T and size n (1..100 000)
op - associative operation (T, T) -> T
ranges - array of boundaries represented as [start, end] and size m (1..100 000)
For each range you need to find the result of applying op to all elements between the boundaries 
(start inclusive, end exclusive).

for example:

arr = [1, 0, 7, 8, 1]  
range = [1, 4]  
op = +

result = 0 + 7 + 8 = 15
Output:

Array of results for the respective ranges.
Notes
The time complexity is expected to be O((n + m) * log n) * T(op) or better.
Start always less than end.
Start and end always in range from 0 to n.

*/

/*

Бинарная операция op называется ассоциативной, если

op(a, op(b, c)) = op(op(a, b), c)

например:

(1 + 2) + 8 = 1 + (2 + 8)
(A * B) * C = A * (B * C), где A, B, C - матрицы размером N x M, M x K, K x L.

Задача
Входы:

arr - массив объектов с типом T и размером n (1..100 000)
op - ассоциативная операция (T, T) -> T
ranges - массив границ, представленных в виде [start, end] и размером m (1..100 000)
Для каждого диапазона необходимо найти результат применения op ко всем элементам между границами 
(начало включительно, конец включительно).

например:

arr = [1, 0, 7, 8, 1]  
range = [1, 4]  
op = +

результат = 0 + 7 + 8 = 15
Выходные данные:

Массив результатов для соответствующих диапазонов.
Примечания
Ожидается, что временная сложность будет равна O((n + m) * log n) * T(op) или лучше.
Начало всегда меньше конца.
Начало и конец всегда находятся в диапазоне от 0 до n.

*/