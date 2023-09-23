// Solution / решение:

function justify(text, width) {
    const words = text.split(' '); // Разбиваем входной текст на слова

    let line = []; // Инициализируем массив для текущей строки
    let lineLength = 0; // Инициализируем переменную для отслеживания длины текущей строки

    const result = words.reduce((result, word, i) => { // Используем reduce для обработки каждого слова
        if (lineLength + line.length + word.length <= width) { // Проверка, поместится ли слово в текущую строку
            line.push(word); // Добавляем слово к текущей строке
            lineLength += word.length; // Обновляем длину текущей строки
        } else {
            if (line.length === 1) {
                result += line[0] + '\n'; // Если в строке только одно слово, добавляем его с переводом строки
            } else {
                const spacesToAdd = width - lineLength; // Рассчитываем общее количество пробелов для добавления
                const minSpaces = Math.floor(spacesToAdd / (line.length - 1)); // Рассчитываем минимальное количество пробелов между словами
                const extraSpaces = spacesToAdd % (line.length - 1); // Рассчитываем количество слов, к которым нужно добавить по одному пробелу больше

                let lineString = line[0]; // Инициализируем строку с первым словом текущей строки
                for (let j = 1; j < line.length; j++) {
                    const spaces = (j <= extraSpaces) ? minSpaces + 1 : minSpaces; // Определяем количество пробелов для текущего слова
                    lineString += ' '.repeat(spaces) + line[j]; // Добавляем пробелы и слово к строке
                }
                result += lineString + '\n'; // Добавляем сформированную строку к результату с переводом строки
            }

            line = [word]; // Начинаем новую строку с текущим словом
            lineLength = word.length; // Обновляем длину текущей строки
        }

        if (i === words.length - 1 && line.length > 0) {
            result += line.join(' '); // Добавляем последнюю сформированную строку (без перевода строки)
        }

        return result; // Возвращаем аккумулированный результат для reduce
    }, '');

    return result.trim(); // Возвращаем результат, обрезанный от лишних пробелов
}

/*

Your task in this Kata is to emulate text justification in monospace font. 
You will be given a single-lined text and the expected justification width. 
The longest word will never be greater than this width.

Here are the rules:

Use spaces to fill in the gaps between words.
Each line should contain as many words as possible.
Use '\n' to separate lines.
Gap between words can't differ by more than one space.
Lines should end with a word not a space.
'\n' is not included in the length of a line.
Large gaps go first, then smaller ones ('Lorem--ipsum--dolor--sit-amet,' (2, 2, 2, 1 spaces)).
Last line should not be justified, use only one space between words.
Last line should not contain '\n'
Strings with one word do not need gaps ('somelongword\n').
Example with width=30:

Lorem  ipsum  dolor  sit amet,
consectetur  adipiscing  elit.
Vestibulum    sagittis   dolor
mauris,  at  elementum  ligula
tempor  eget.  In quis rhoncus
nunc,  at  aliquet orci. Fusce
at   dolor   sit   amet  felis
suscipit   tristique.   Nam  a
imperdiet   tellus.  Nulla  eu
vestibulum    urna.    Vivamus
tincidunt  suscipit  enim, nec
ultrices   nisi  volutpat  ac.
Maecenas   sit   amet  lacinia
arcu,  non dictum justo. Donec
sed  quam  vel  risus faucibus
euismod.  Suspendisse  rhoncus
rhoncus  felis  at  fermentum.
Donec lorem magna, ultricies a
nunc    sit    amet,   blandit
fringilla  nunc. In vestibulum
velit    ac    felis   rhoncus
pellentesque. Mauris at tellus
enim.  Aliquam eleifend tempus
dapibus. Pellentesque commodo,
nisi    sit   amet   hendrerit
fringilla,   ante  odio  porta
lacus,   ut   elementum  justo
nulla et dolor.
Also you can always take a look at how justification works in your text editor or directly in HTML 
(css: text-align: justify).

*/

/*

Ваша задача в этом Ката - эмулировать обоснование текста в моноширинном шрифте. 
Вам будет дан однострочный текст и предполагаемая ширина обоснования. 
Самое длинное слово никогда не должно быть больше этой ширины.

Вот правила:

Для заполнения пробелов между словами используйте пробелы.
Каждая строка должна содержать как можно больше слов.
Используйте '\n' для разделения строк.
Промежутки между словами не могут отличаться более чем на один пробел.
Строки должны заканчиваться словом, а не пробелом.
'\n' не учитывается при определении длины строки.
Сначала идут большие пробелы, затем маленькие ('Lorem--ipsum--dolor--sit-amet,' (2, 2, 2, 2, 1 пробел)).
Последняя строка не должна быть выровнена, используйте только один пробел между словами.
Последняя строка не должна содержать '\n'.
Строки с одним словом не нуждаются в пробелах ('somelongword\n').
Пример с шириной=30:

Lorem  ipsum  dolor  sit amet,
consectetur  adipiscing  elit.
Vestibulum    sagittis   dolor
mauris,  at  elementum  ligula
tempor  eget.  In quis rhoncus
nunc,  at  aliquet orci. Fusce
at   dolor   sit   amet  felis
suscipit   tristique.   Nam  a
imperdiet   tellus.  Nulla  eu
vestibulum    urna.    Vivamus
tincidunt  suscipit  enim, nec
ultrices   nisi  volutpat  ac.
Maecenas   sit   amet  lacinia
arcu,  non dictum justo. Donec
sed  quam  vel  risus faucibus
euismod.  Suspendisse  rhoncus
rhoncus  felis  at  fermentum.
Donec lorem magna, ultricies a
nunc    sit    amet,   blandit
fringilla  nunc. In vestibulum
velit    ac    felis   rhoncus
pellentesque. Mauris at tellus
enim.  Aliquam eleifend tempus
dapibus. Pellentesque commodo,
nisi    sit   amet   hendrerit
fringilla,   ante  odio  porta
lacus,   ut   elementum  justo
nulla et dolor.
Также вы всегда можете посмотреть, как работает выравнивание в текстовом редакторе или непосредственно в HTML 
(css: text-align: justify).

*/