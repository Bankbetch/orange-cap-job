const secondMax = (arr) => {
  const newArray = [...new Set(arr)];
  if (newArray.length <= 0) return "Error!";
  else if (newArray.length === 1) return arr[0];
  else {
    const max = Math.max.apply(null, newArray);
    newArray.splice(newArray.indexOf(max), 1);
    return Math.max.apply(null, newArray);
  }
};

console.log(secondMax([2, 3, 4, 5]));
