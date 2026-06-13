// Problem Statement:
// Write a function createPair that takes two arguments of any type and returns a tuple with those values.

export function createPair<T, U>(x: T, y : U): [T, U] {
    return [x, y];
}