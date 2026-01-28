import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

export type CSVRow = Record<string, string>;

/**
 * Parse a single CSV file into an array of objects.
 */
export function parseCSV(filePath: string, options: Record<string, any> = {}): Promise<CSVRow[]> {
  return new Promise((resolve, reject) => {
    const records: CSVRow[] = [];
    const defaultOptions = {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      ...options,
    };

    fs.createReadStream(filePath)
      .pipe(parse(defaultOptions))
      .on("data", (row: CSVRow) => records.push(row))
      .on("end", () => resolve(records))
      .on("error", (err) => reject(err));
  });
}

/**
 * Get all CSV files inside a folder and its immediate subfolders
 */
export function getCSVFilesInFolder(folderPath: string): string[] {
  const files: string[] = [];
  const children = fs.readdirSync(folderPath, { withFileTypes: true });

  for (const child of children) {
    const childPath = path.join(folderPath, child.name);

    if (child.isFile() && child.name.toLowerCase().endsWith(".csv")) {
      files.push(childPath);
    } else if (child.isDirectory()) {
      const subFiles = fs.readdirSync(childPath)
        .filter(f => f.toLowerCase().endsWith(".csv"))
        .map(f => path.join(childPath, f));
      files.push(...subFiles);
    }
  }

  return files;
}
