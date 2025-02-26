function cariYangHilang(array) {
  array.sort((a, b) => a - b);
  let hilang = [];

  for (let i = 1; i < array.length; i++) {
    let selisih = array[i] - array[i - 1];
    if (selisih > 2) {
      return "Error: Angka dalam array tidak boleh melompat lebih dari 2.";
    } else if (selisih === 2) {
      hilang.push(array[i - 1] + 1);
    }
  }

  return hilang.length > 0
    ? `Angka yang hilang: ${hilang.join(", ")}`
    : "Array valid: Tidak ada angka yang hilang.";
}

console.log(cariYangHilang([1, 2, 3, 4, 7])); // ❌ Error: Lompat dari 4 ke 7
console.log(cariYangHilang([1, 2, 3, 4, 6])); // ✅ Angka yang hilang: 5
console.log(cariYangHilang([10, 11, 12, 15])); // ❌ Error: Lompat dari 12 ke 15
console.log(cariYangHilang([100, 101, 103, 105])); // ✅ Angka yang hilang: 102, 104
console.log(cariYangHilang([5, 6, 7, 8])); // ✅ Tidak ada angka yang hilang
