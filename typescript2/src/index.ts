export function findFirstOdd (arr : number[]) {
    return arr.find((item) => item % 2 == 1)
}

const x = 1 as const;
console.log(x);