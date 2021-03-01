// const arr = ["john", "jane", "sarah", "alex"];
const arr = [1, 2, 3, 4, 5];
const shift = (direction, position) => {
  const cloneArr = [...arr];
  const left = cloneArr.splice(-position);
  console.log(left.concat(cloneArr.slice(0, arr.length - left.length)));
};
shift("left", 3);
