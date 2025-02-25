export default function QueryProcessor(query: string): string {
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

  if (query.toLowerCase().includes("multiplied by")) {
    const numberMatch = query.match(/what is\s*(\d+)\s*multiplied by\s*(\d+)/i);
    if (numberMatch) {
      const numbers = numberMatch.slice(1).map(Number);
      const product = numbers[0] * numbers[1];
      return `${product}`;
    }
  }

  if (query.toLowerCase().includes("which of the following numbers is both a square and a cube")) {
    const numberMatch = query.match(/(\d+(?:,\s*\d+)*)/);
    if (numberMatch) {
      const numbers = numberMatch[0]
        .split(',')
        .map(num => parseInt(num.trim(), 10))
        .filter(num => !isNaN(num));

      for (const num of numbers) {
        const sixthRoot = Math.pow(num, 1 / 6);
        if (Number.isInteger(sixthRoot)) {
          return `${num}`;
        }
      }
    }
    return "None of the numbers is both a square and a cube.";
  }

  return "";
}
