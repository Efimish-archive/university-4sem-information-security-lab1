const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * @param char - Символ от A до Z
 * @returns Позиция символа в алфавите. A = 0, Z = 25
 */ 
export function charToNumber(char: string): number {
    const upper = char.toUpperCase()[0];
    if (!alphabet.includes(upper)) {
        throw new Error("Invalid character. Expected A-Z");
    }
    return upper.charCodeAt(0) - 'A'.charCodeAt(0);
}

/**
 * @param num - Позиция символа в алфавите от 0 до 25
 * @returns Символ из алфавита. 0 = A, 25 = Z
 */
export function numberToChar(num: number): string {
    if (num < 0 || num > 25) {
        throw new Error("Number out of range. Expected 0-25");
    }
    return String.fromCharCode(num + 'A'.charCodeAt(0));
}

/**
 * @param vector - Вектор длиной n
 * @returns Строка длиной n
 */
export function vectorToString(vector: number[]): string {
    let result = "";
    for (let i = 0; i < vector.length; i++) {
        result += numberToChar(vector[i]);
    }
    return result;
}

/**
 * @param str - Строка длиной n
 * @returns Вектор длиной n
 */
export function stringToVector(str: string): number[] {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        result.push(charToNumber(str[i]));
    }
    return result;
}

/**
 * @param matrix - Матрица размера n x n
 * @returns Строка длиной n^2
 */
export function martixToString(matrix: number[][]): string {
    if (matrix.length !== matrix[0].length) {
        throw new Error("Invalid matrix size");
    }
    let result = "";
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            result += numberToChar(matrix[i][j]);
        }
    }
    return result;
}

/**
 * @param str - Строка длиной n^2
 * @returns Матрица размера n x n
 */
export function stringToMatrix(str: string): number[][] {
    if (Math.sqrt(str.length) % 1 !== 0) {
        throw new Error("Invalid key length");
    }
    const side = Math.floor(Math.sqrt(str.length));

    let result: number[][] = [];
    for (let i = 0; i < side; i++) {
        let arr = [];
        for (let j = 0; j < side; j++) {
            arr.push(charToNumber(str[i*side + j]));
        }
        result.push(arr);
    }
    return result;
}

/**
 * @param n - Длина ключа
 * @returns Строка длиной n^2
 */
export function generateKeyString(n: number): string {
    if (n <= 0) {
        throw new Error("Invalid key length");
    }
    function generateRandomKeyString(n: number): string {
        let result = "";
        for(let i = 0; i < n*n; i++) {
            const index = Math.floor(Math.random() * 26);
            const char = numberToChar(index);
            result += char;
        }
        return result;
    }
    let key = generateRandomKeyString(n);
    while (inverseMatrixMod(stringToMatrix(key)) === null) {
        key = generateRandomKeyString(n);
    }
    return key;
}

/**
 * @param matrix - Матрица размера n x n
 * @param vector - Вектор длиной n
 * @returns Результат умножения матрицы на вектор
 */
export function multiplyMatrixVector(matrix: number[][], vector: number[]): number[] {
    if (matrix[0].length !== vector.length) {
        throw new Error("Invalid matrix and vector sizes");
    }
    let result: number[] = [];
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < vector.length; j++) {
            sum += matrix[i][j] * vector[j];
        }
        result.push(sum % 26);
    }
    return result;
}

/**
 * @param matrix - Матрица размера n x n
 * @returns Транспонированная матрица
 */
export function transpose(matrix: number[][]): number[][] {
    let result: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        result.push([]);
        for (let j = 0; j < matrix.length; j++) {
            result[i].push(matrix[j][i]);
        }
    }
    return result;
}

/**
 * @param matrix - Матрица размера n x n
 * @param row - Строка
 * @param col - Столбец
 * @returns Минор матрицы
 */
export function minor(matrix: number[][], row: number, col: number): number[][] {
    let minor: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        if (i === row) continue;
        let newRow: number[] = [];
        for (let j = 0; j < matrix.length; j++) {
            if (j === col) continue;
            newRow.push(matrix[i][j]);
        }
        minor.push(newRow);
    }
    return minor;
}

/**
 * @param matrix - Матрица размера n x n
 * @returns Определитель матрицы.
 */
export function determinant(matrix: number[][]): number {
    if (matrix.length !== matrix[0].length) {
        throw new Error("Invalid matrix size");
    }
    if (matrix.length === 1) {
        return matrix[0][0];
    }
    if (matrix.length === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let col = 0; col < matrix.length; col++) {
        let sign = col % 2 === 0 ? 1 : -1;
        det += sign * matrix[0][col] * determinant(minor(matrix, 0, col));
    }
    return det;
}

/**
 * @param matrix - Матрица размера n x n
 * @returns Обратная матрица или null, если определитель равен 0.
 */
export function inverseMatrix(matrix: number[][]): number[][] | null {
    const det = determinant(matrix);
    if (det === 0) {
        return null;
    }

    const minorMatrix: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        minorMatrix.push([]);
        for (let j = 0; j < matrix.length; j++) {
            minorMatrix[i].push(determinant(minor(matrix, i, j)));
        }
    }

    const additionMatrix: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        additionMatrix.push([]);
        for (let j = 0; j < matrix.length; j++) {
            let sign = (i + j) % 2 === 0 ? 1 : -1;
            additionMatrix[i].push(sign * minorMatrix[i][j]);
        }
    }

    const transposedAdditionMatrix = transpose(additionMatrix);

    const inversedMatrix: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        inversedMatrix.push([]);
        for (let j = 0; j < matrix.length; j++) {
            inversedMatrix[i].push(transposedAdditionMatrix[i][j] / det);
        }
    }

    return inversedMatrix;
}


/** Наибольший общий делитель */
function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

/** Взятие по модулю 26 с положительным остатком */
function mod(x: number, mod: number): number {
    return ((x % mod) + mod) % mod;
}

/** Расширенный алгоритм Евклида */
function extendedGCD(a: number, b: number): [number, number, number] {
    if (b === 0) return [a, 1, 0];
    const [g, x1, y1] = extendedGCD(b, a % b);
    return [g, y1, x1 - Math.floor(a / b) * y1];
}

/** Находит x такой, что (a * x) ≡ 1 mod m */
function modInverse(a: number, m: number): number | null {
    let [g, x] = extendedGCD(a, m);
    if (g !== 1) return null;
    return mod(x, 26);
}

/**
 * Вычисляет обратную матрицу по модулю 26.
 * @param matrix - Квадратная матрица (n x n) элементов из диапазона 0-25
 * @returns Обратная матрица по модулю 26 или null, если матрица необратима
 */
export function inverseMatrixMod(matrix: number[][], m = 26): number[][] | null {
    const n = matrix.length;
    const det = determinant(matrix);
    const detMod26 = mod(det, m);
    
    // Проверяем, что определитель обратим по модулю 26
    if (gcd(detMod26, m) !== 1) return null;
    
    const invDet = modInverse(detMod26, m);
    if (invDet === null) return null;

    // Создаем матрицу алгебраических дополнений
    const adjugate: number[][] = [];
    for (let i = 0; i < n; i++) {
        adjugate.push([]);
        for (let j = 0; j < n; j++) {
            // Получаем минор и вычисляем его определитель
            const minorDet = determinant(minor(matrix, i, j));
            // Алгебраическое дополнение с учетом знака и модуля
            const sign = (i + j) % 2 === 0 ? 1 : -1;
            adjugate[i].push(mod(sign * minorDet, m));
        }
    }

    // Транспонируем матрицу (получаем союзную матрицу)
    const adjugateT = transpose(adjugate);

    // Умножаем каждый элемент на обратный определитель по модулю 26
    const inverse: number[][] = [];
    for (let i = 0; i < n; i++) {
        inverse.push([]);
        for (let j = 0; j < n; j++) {
            inverse[i].push(mod(adjugateT[i][j] * invDet, m));
        }
    }

    return inverse;
}

/**
 * @param text Текст для шифрования
 * @param keyString Ключ шифрования в виде строки
 * @returns Зашифрованный текст
 */
export function encode(text: string, keyString: string) {
    if (text.length * text.length !== keyString.length) {
        throw new Error("Invalid key length");
    }
    const keyMatrix = stringToMatrix(keyString);
    const textVector = stringToVector(text);
    const encryptedVector = multiplyMatrixVector(keyMatrix, textVector);
    return vectorToString(encryptedVector);
}

/**
 * @param text Текст для дешифрования
 * @param keyString Ключ дешифрования в виде строки
 * @returns Расшифрованный текст
 */
export function decode(text: string, keyString: string) {
    if (text.length * text.length !== keyString.length) {
        throw new Error("Invalid key length");
    }
    const keyMatrix = stringToMatrix(keyString);
    const inversedMatrix = inverseMatrixMod(keyMatrix, 26);
    if (inversedMatrix === null) {
        throw new Error("Invalid key");
    }

    return encode(text, martixToString(inversedMatrix));
}
