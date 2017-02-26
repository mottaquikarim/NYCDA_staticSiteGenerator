console.log(process.argv);

const first = process.argv[2];
const second = process.argv[3];

const add = (a,b) => a+b;

console.log(add(first, second))

