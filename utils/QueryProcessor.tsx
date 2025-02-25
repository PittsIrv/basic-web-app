export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase();
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("your name")) {
    return "Mingxi Yan";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "mingxiy";
  }

  if (query.toLowerCase().includes("numbers is the largest")) {
    const numberMatch = query.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (numberMatch) {
      const numbers = numberMatch.slice(1).map(Number);
      const largestNumber = Math.max(...numbers);
      return `${largestNumber}`;
    }
  }

  if (query.toLowerCase().includes("what is") && query.toLowerCase().includes("plus")) {
    const numberMatch = query.match(/what is\s*(\d+)\s*plus\s*(\d+)/i);
    if (numberMatch) {
      const numbers = numberMatch.slice(1).map(Number);
      const sum = numbers.reduce((acc, curr) => acc + curr, 0);
      return `${sum}`;
    }
  }

  if (query.toLowerCase().includes("minus")) {
    const numberMatch = query.match(/what is\s*(\d+)\s*minus\s*(\d+)/i);
    if (numberMatch) {
      const [num1, num2] = numberMatch.slice(1).map(Number);
      const difference = num1 - num2;
      return `${difference}`;
    }
  }

  if (query.toLowerCase().includes("multiplied by")) {
    const numberMatch = query.match(/what is\s*(\d+)\s*multiplied by\s*(\d+)/i);
    if (numberMatch) {
      const numbers = numberMatch.slice(1).map(Number);
      const product = numbers[0] * numbers[1];
      return `${product}`;
    }
  }

  if (query.toLowerCase().includes("divided by")) {
    const numberMatch = query.match(/what is\s*(\d+)\s*divided by\s*(\d+)/i);
    if (numberMatch) {
      const numbers = numberMatch.slice(1).map(Number);
      if (numbers[1] === 0) {
        return "";
      }
      const result = numbers[0] / numbers[1];
      return `${result}`;
    }
  }


  if (query.toLowerCase().includes("which of the following numbers is both a square and a cube")) {
    const numberMatch = query.match(/(\d+(?:,\s*\d+)*)/);
    if (numberMatch) {
      const numbers = numberMatch[0]
        .split(',')
        .map((num) => parseInt(num.trim(), 10))
        .filter((num) => !isNaN(num));

      for (const num of numbers) {
        const sixthRoot = Math.pow(num, 1 / 6);
        const candidate = Math.round(sixthRoot);
        // Re-check to avoid floating-point errors
        if (Math.pow(candidate, 6) === num) {
          return `${num}`;
        }
      }
    }
    return "";
  }

  if (lowerQuery.includes("to the power of")) {
    const numberMatch = query.match(/what is\s*(\d+)\s*to the power of\s*(\d+)/i);
    if (numberMatch) {
      const base = parseInt(numberMatch[1], 10);
      const exponent = parseInt(numberMatch[2], 10);
      const result = Math.pow(base, exponent);

      return result.toString();
    }
  }

  if (lowerQuery.includes("what is") && lowerQuery.includes("plus")) {
    // Extract all numbers from the query using a regular expression
    const numberMatch = query.match(/(\d+)/g);
  
    if (numberMatch) {
      // Convert the matched strings to integers
      const numbers = numberMatch.map(num => parseInt(num, 10));
  
      // Sum all the numbers
      const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  
      return `${sum}`;
    }
  }

  if (query.toLowerCase().includes("which of the following numbers are primes")) {
    // Match all numbers in the query, e.g. "40, 17, 21, 76, 93"
    const numberMatch = query.match(/(\d+(?:,\s*\d+)*)/);
    if (numberMatch) {
      // Split the matched string by commas, convert to integers
      const numbers = numberMatch[0]
        .split(',')
        .map((num) => parseInt(num.trim(), 10))
        .filter((num) => !isNaN(num));

      // Function to check if a number is prime
      const isPrime = (n: number): boolean => {
        if (n < 2) return false;
        // Simple trial division check
        for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) {
            return false;
          }
        }
        return true;
      };

      // Filter primes from the extracted numbers
      const primes = numbers.filter((num) => isPrime(num));

      // Return the list of primes or a default message if none found
      if (primes.length > 0) {
        return primes.join(", ");
      } else {
        return "None of the numbers are prime.";
      }
    }
  }

  return "";
}
