const fizzBuzz = (number) => {
  return number % 3 === 0 && number % 5 === 0
    ? "FizzBuzz"
    : number % 3 === 0
    ? "Fizz"
    : "Buzz";
};

console.log(fizzBuzz(45));
