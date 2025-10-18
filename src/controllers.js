import fs from "fs";
import csv from "csv-parser";
import db from "./db.js";
import { validateRow } from "./utils.js";

const insertStmt = db.prepare(`
  INSERT INTO products (sku, name, brand, color, size, mrp, price, quantity)
  VALUES (@sku, @name, @brand, @color, @size, @mrp, @price, @quantity)
  ON CONFLICT(sku) DO UPDATE SET
    name=excluded.name,
    brand=excluded.brand,
    color=excluded.color,
    size=excluded.size,
    mrp=excluded.mrp,
    price=excluded.price,
    quantity=excluded.quantity
`);

export const uploadCSV = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "CSV file is required" });

  const valid = [];
  const failed = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      const errors = validateRow(row);
      if (errors.length) failed.push({ row, errors });
      else valid.push(row);
    })
    .on("end", () => {
      let stored = 0;
      const insert = db.transaction((rows) => {
        for (const r of rows) {
          const clean = {
            sku: r.sku.trim(),
            name: r.name.trim(),
            brand: r.brand.trim(),
            color: r.color || null,
            size: r.size || null,
            mrp: Number(r.mrp),
            price: Number(r.price),
            quantity: Number(r.quantity || 0)
          };
          insertStmt.run(clean);
          stored++;
        }
      });
      insert(valid);
      fs.unlinkSync(req.file.path);
      res.json({ stored, failed });
    });
};

export const listProducts = (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const rows = db.prepare("SELECT * FROM products LIMIT ? OFFSET ?").all(limit, offset);
  res.json(rows);
};

export const searchProducts = (req, res) => {
  const { brand, color, minPrice, maxPrice } = req.query;
  let query = "SELECT * FROM products WHERE 1=1";
  const params = [];
  if (brand) { query += " AND brand = ?"; params.push(brand); }
  if (color) { query += " AND color = ?"; params.push(color); }
  if (minPrice) { query += " AND price >= ?"; params.push(Number(minPrice)); }
  if (maxPrice) { query += " AND price <= ?"; params.push(Number(maxPrice)); }
  const result = db.prepare(query).all(...params);
  res.json(result);
};
