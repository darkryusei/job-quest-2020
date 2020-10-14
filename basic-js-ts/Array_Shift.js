function shift(arr, direction, num) {
  return direction === "left"
    ? console.log(arr.concat(arr.splice(0, num)))
    : direction === "right"
    ? console.log(arr.splice(arr.length - num).concat(arr))
    : console.log(arr);
}
shift(["john", "jane", "sarah", "alex", "james", "jean"], "left", 2);
shift([1, 2, 3, 4, 5, 6, 7], "right", 3);
shift([1, 2, 3, 4, 5]);
