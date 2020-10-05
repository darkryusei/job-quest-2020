function fib(num) {
  let arr = [];
  const calculate = (i) => {
    arr.push(arr[i - 2] + arr[i - 1]);
  };
  for (let i = 0; i < num; i++) {
    i < 2 ? arr.push(1) : calculate(i);
  }
  console.log(arr[num - 1]);
}

fib(1);
fib(3);
fib(12);
