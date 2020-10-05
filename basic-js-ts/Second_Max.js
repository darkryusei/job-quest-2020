function secondMax(arr) {
  const findNum = () => {
    arr.sort();
    let result = arr.filter((num) => {
      return num <= arr[arr.length - 1];
    });
    console.log(result[result.length - 1]);
  };
  arr.length == 0 ? console.log("Error!") : findNum();
}
secondMax([2, 3, 4, 5]);
secondMax([9, 2, 21, 21]);
secondMax([4, 4, 4, 4]);
secondMax([4123]);
secondMax([]);
