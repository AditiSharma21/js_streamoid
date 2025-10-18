import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.resolve("products.db"));

db.prepare(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sku TEXT UNIQUE,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  color TEXT,
  size TEXT,
  mrp INTEGER NOT NULL,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL
)`).run();

export default db;
