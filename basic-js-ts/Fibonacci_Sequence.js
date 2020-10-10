function fib(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    i < 2 ? arr.push(1) : calculate(i, arr);
  }
  console.log(arr[num - 1]);
}
const calculate = (i, arr) => {
  arr.push(arr[i - 2] + arr[i - 1]);
};

fib(1);
fib(3);
fib(12);
