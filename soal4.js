function findExpression(numbers, target) {
  function backtrack(index, expr, value, used) {
    if (index === numbers.length) {
      if (value === target) {
        result = expr;
        return true;
      }
      return false;
    }

    for (let i = 0; i < numbers.length; i++) {
      if (used.has(i)) continue;
      let num = numbers[i];
      let newUsed = new Set(used);
      newUsed.add(i);

      if (backtrack(index + 1, `(${expr} + ${num})`, value + num, newUsed))
        return true;
      if (backtrack(index + 1, `(${expr} - ${num})`, value - num, newUsed))
        return true;
      if (backtrack(index + 1, `(${expr} * ${num})`, value * num, newUsed))
        return true;
      if (
        value % num === 0 &&
        backtrack(index + 1, `(${expr} / ${num})`, value / num, newUsed)
      )
        return true;
    }
    return false;
  }

  let result = "Tidak ada solusi";
  for (let i = 0; i < numbers.length; i++) {
    let used = new Set([i]);
    if (backtrack(1, numbers[i].toString(), numbers[i], used)) break;
  }

  return result;
}

// Contoh penggunaan
console.log(findExpression([2, 4, 5, 6], 10));
console.log(findExpression([1, 4, 5, 6], 18));
console.log(findExpression([1, 4, 5, 6], 50));
