export function validateRow(row) {
  const errors = [];
  const required = ["sku", "name", "brand", "mrp", "price"];
  for (const f of required) {
    if (!row[f] || row[f].trim() === "") {
      errors.push(`${f} is required`);
    }
  }
  const mrp = Number(row.mrp);
  const price = Number(row.price);
  const quantity = Number(row.quantity || 0);
  if (isNaN(mrp) || isNaN(price)) errors.push("mrp and price must be numbers");
  if (price > mrp) errors.push("price must be <= mrp");
  if (quantity < 0) errors.push("quantity must be >= 0");
  return errors;
}
