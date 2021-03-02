function fizzBuzz(n) {
  return (
    (!(n % 15) && "FizzBuzz") ||
    (!(n % 5) && "Buzz") ||
    (!(n % 3) && "Fizz") ||
    n
  );
}
console.log(fizzBuzz(45));
