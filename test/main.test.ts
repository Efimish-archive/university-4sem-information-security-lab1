import { expect, test } from "bun:test";
import { generateKeyString, stringToMatrix, martixToString, charToNumber, numberToChar, multiplyMatrixVector, transpose, stringToVector, vectorToString, minor, determinant, inverseMatrix, encode, decode, inverseMatrixMod } from "../src/utils";

test("char to number", () => {
    expect(charToNumber("A")).toBe(0);
    expect(charToNumber("B")).toBe(1);
    expect(charToNumber("Z")).toBe(25);

    // turned to uppercase
    expect(charToNumber("a")).toBe(0);
});

test("number to char", () => {
    expect(numberToChar(0)).toBe("A");
    expect(numberToChar(1)).toBe("B");
    expect(numberToChar(25)).toBe("Z");

    // out of range
    expect(() => numberToChar(26)).toThrow();
});

test("string to vector", () => {
    expect(stringToVector("ABCD")).toEqual([0, 1, 2, 3]);
});

test("vector to string", () => {
    expect(vectorToString([0, 1, 2, 3])).toBe("ABCD");
})

test("string to matrix", () => {
    expect(stringToMatrix("ABCD")).toEqual([
        [0, 1],
        [2, 3]
    ]);

    // invalid key length
    expect(() => stringToMatrix("ABC")).toThrow();
});

test("matrix to string", () => {
    expect(martixToString([
        [0, 1],
        [2, 3]
    ])).toEqual("ABCD");

    // invalid matrix size
    expect(() => martixToString([
        [0, 1]
    ])).toThrow();
});

test("generate key string", () => {
    expect(generateKeyString(4).length).toBe(4 * 4);

    // invalid key length
    expect(() => generateKeyString(0)).toThrow();
});

test("multiply matrix and vector", () => {
    expect(multiplyMatrixVector([
        [0, 1],
        [2, 3]
    ], [2, 2])).toEqual([2, 10]);

    // invalid matrix and vector sizes 
    expect(() => multiplyMatrixVector([
        [0, 1]
    ], [5])).toThrow();
});

test("transpose matrix", () => {
    expect(transpose([
        [0, 1],
        [2, 3]
    ])).toEqual([
        [0, 2],
        [1, 3]
    ]);
});

test("matrix minor", () => {
    expect(minor([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ], 1, 1)).toEqual([
        [0, 2],
        [6, 8]
    ]);
});

test("matrix determinant", () => {
    expect(determinant([
        [1]
    ])).toBe(1);

    expect(determinant([
        [0, 1],
        [2, 3]
    ])).toBe(-2);

    expect(determinant([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ])).toBe(0);
});

test("inverse matrix", () => {
    expect(inverseMatrix([
        [1, 2],
        [3, 4]
    ])).toEqual([
        [-2, 1],
        [1.5, -0.5]
    ]);

    expect(inverseMatrix([
        [2, 5, 7],
        [6, 3, 4],
        [5, -2, -3]
    ])).toEqual([
        [1, -1, 1],
        [-38, 41, -34],
        [27, -29, 24]
    ]);
});

test("inverse matrix mod 26", () => {
    expect(inverseMatrixMod([
        [6, 24, 1, 2, 7],
        [13, 16, 10, 13, 1],
        [20, 17, 15, 21, 14],
        [18, 2, 23, 15, 7],
        [9, 4, 11, 16, 21]
    ], 26)).toEqual([
        [9, 18, 14, 8, 25],
        [10, 7, 15, 18, 15],
        [21, 9, 18, 19, 25],
        [7, 2, 4, 13, 24],
        [20, 7, 22, 3, 17]
    ]);
});

test("encode", () => {
    expect(encode(
        "HELLO",
        "GYBCHNQKNBURPVOSCXPHJELQV"
    )).toBe("JGUAU");
});

test("decode", () => {
    expect(decode(
        "JGUAU",
        "GYBCHNQKNBURPVOSCXPHJELQV"
    )).toBe("HELLO");
});
