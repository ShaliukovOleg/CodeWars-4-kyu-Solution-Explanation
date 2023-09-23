// Solution / Решение

function solution(input, markers) {
    const lines = input.split('\n'); // Разбиваем по символу перевода строки

    // Проходимся по каждой строке
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Проверяем, есть ли маркеры комментариев в текущей строке
        for (const marker of markers) {
            const markerIndex = line.indexOf(marker);
            if (markerIndex !== -1) {
                // Если маркер найден, обрезаем строку до маркера и удаляем пробелы в конце
                lines[i] = line.slice(0, markerIndex).trim();
                break; // Переходим к следующей строке
            }
        }
    }

    // Собираем строки обратно в одну строку с символами перевода строки
    const result = lines.join('\n');

    return result;
}

// Short version

function solution(input, markers) {
    // Разбиваем входную строку на массив строк по символу перевода строки
    return input.split('\n').map(line => {
        // Для каждой строки из массива выполняем следующие действия:
        for (const marker of markers) {
            // Ищем индекс первого вхождения маркера комментария в строке
            const markerIndex = line.indexOf(marker);
            if (markerIndex !== -1) {
                // Если маркер найден, обрезаем строку до маркера и удаляем пробелы с обоих концов
                line = line.slice(0, markerIndex).trim();
            }
        }
        // Возвращаем обработанную строку
        return line;
    }).join('\n'); // Объединяем строки в массиве обратно в одну строку с символами перевода строки
}

// Shortest version (0lexa code)
const solution = (input, markers) =>
  input.replace(new RegExp(`\\s*[${markers.join(`|`)}].*`, `g`), ``);

/*

Complete the solution so that it strips all text that follows any of a set 
of comment markers passed in. 
Any whitespace at the end of the line should also be stripped out.

Example:
Given an input string of:
apples, pears # and bananas
grapes
bananas !apples

The output expected would be:
apples, pears
grapes
bananas

The code would be called like so:
var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"

*/

/*

Доработайте решение таким образом, чтобы оно удаляло весь текст, следующий за любым из набора 
переданных маркеров комментариев. 
Пробельные символы в конце строки также должны быть удалены.

Пример:
На вход подана строка, состоящая из:
apples, pears # and bananas
grapes
bananas !apples

Ожидаемый результат будет следующим:
apples, pears
grapes
bananas

Код будет вызван следующим образом:
var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"

*/