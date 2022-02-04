/**
 * @name csv.ts
 * @description utilities for CSV
 */
import fs from 'fs';
import { stringify } from 'csv-stringify';
import iconv from 'iconv-lite';
import { parse } from 'csv-parse';

/**
 * @name json2csv
 * @description convert JSON to CSV
 * @param jsonString JSON string
 * @param csvName CSV file name
 * @param hasHeader set true if the csv has a header
 */
export async function json2csv(
  jsonString: string,
  csvName: string,
  hasHeader: boolean
) {
  return new Promise((resolve, reject) => {
    const json = JSON.parse(jsonString);
    stringify(
      json,
      { header: hasHeader, columns: Object.keys(json[0]) },
      (err: any, ret: any) => {
        if (err) {
          reject(err);
        }
        resolve(ret);
      }
    ).pipe(fs.createWriteStream(csvName));
    console.info(`count: ${json.length}`);
  });
}

/**
 * @name csv2json
 * @description convert CSV to JSON
 * @param csv CSV object
 * @param jsonName JSON file name
 * @param charCode 'Shift_JIS', etc.
 */
export async function csv2json(csv: any, jsonName: string, charCode: string) {
  try {
    const parser = fs
      .createReadStream(csv)
      .pipe(iconv.decodeStream(charCode))
      .pipe(parse({ columns: true }));

    const records = [];
    for await (const record of parser) {
      records.push(record);
    }
    console.info(`count: ${records.length}`);

    fs.writeFileSync(jsonName, JSON.stringify(records));
  } catch (err) {
    console.error(err);
  }
}
