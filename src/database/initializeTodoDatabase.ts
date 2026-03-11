import { type SQLiteDatabase } from 'expo-sqlite';

export async function initializeTodoDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    );
  `);
}