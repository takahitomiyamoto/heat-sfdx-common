/**
 * @name csv.ts
 * @description utilities for CSV
 */
import fs from 'fs';
import iconv from 'iconv-lite';
import { stringify } from 'csv-stringify';
import { parse } from 'csv-parse';

/**
 * @name json2csvParams
 * @description json2csvParams
 * @param jsonString JSON string
 * @param csvFile CSV file name
 * @param charCode 'utf8', 'Shift_JIS', etc.
 * @param hasHeader set true if the csv has a header
 * @param keys JSON keys: ['Profile', 'applicationVisibilities'] etc.
 */
type json2csvParams = {
  jsonString: string;
  csvFile: string;
  charCode: BufferEncoding;
  hasHeader: boolean;
  keys: string[];
};

/**
 * @name csv2jsonParams
 * @description csv2jsonParams
 * @param csv CSV object
 * @param jsonFile JSON file name
 * @param charCode 'Shift_JIS', etc.
 */
type csv2jsonParams = {
  csv: any;
  jsonFile: string;
  charCode: BufferEncoding;
};

/**
 * @name json2csv
 * @description convert JSON to CSV
 * @param params json2csvParams
 */
export async function json2csv(params: json2csvParams) {
  return new Promise((resolve, reject) => {
    try {
      const json = JSON.parse(params.jsonString);
      let children = params.keys[0] ? json[params.keys[0]] : [];
      for (let i = 1; i < params.keys.length; i++) {
        children = params.keys[i] ? children[params.keys[i]] : children;
      }
      console.info(`count: ${children.length}`);

      const columns = Object.keys(children[0]);
      for (const child of children) {
        Object.keys(child).forEach((key) => {
          if (!columns.includes(key)) {
            columns.push(key);
          }
        });
      }

      const dest = fs.createWriteStream(params.csvFile, params.charCode);
      const src = stringify(
        children,
        {
          header: params.hasHeader,
          columns: columns,
          quoted: true
        },
        (err: any, ret: any) => {
          if (err) {
            reject(err);
          }
        }
      );
      src.pipe(dest);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * @name csv2json
 * @description convert CSV to JSON
 * @param params csv2jsonParams
 */
export async function csv2json(params: csv2jsonParams) {
  try {
    const parser = fs
      .createReadStream(params.csv)
      .pipe(iconv.decodeStream(params.charCode))
      .pipe(parse({ columns: true }));

    const records = [];
    for await (const record of parser) {
      records.push(record);
    }
    console.info(`count: ${records.length}`);

    fs.writeFileSync(params.jsonFile, JSON.stringify(records));
  } catch (err) {
    console.error(err);
  }
}
