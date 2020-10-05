function shift(arr, direction, num) {
  const shiftArrayLeft = () => {
    result_arr = [];
    for (let i = num; i < arr.length; i++) {
      result_arr.push(arr[i]);
    }
    for (let i = 0; i < num; i++) {
      result_arr.push(arr[i]);
    }
    console.log(result_arr);
  };
  const shiftArrayRight = () => {
    result_arr = [];
    for (let i = num - 1; i < arr.length; i++) {
      result_arr.push(arr[i]);
    }
    for (let i = 0; i < num - 1; i++) {
      result_arr.push(arr[i]);
    }
    console.log(result_arr);
  };
  direction === "left" ? shiftArrayLeft() : shiftArrayRight();
}

shift(["john", "jane", "sarah", "alex", "james"], "left", 2);
shift([1, 2, 3, 4, 5], "right", 3);
