/**
 * @name xml.ts
 * @description utilities for XML
 */
import xml2js from 'xml2js';

const parser = new xml2js.Parser({ explicitArray: false });
const builder = new xml2js.Builder();
/**
 * @name json2xml
 * @description convert JSON to XML
 */
export const json2xml = (json: any): string => {
  return builder.buildObject(json);
};

/**
 * @name xml2json
 * @description convert XML to JSON
 */
export async function xml2json(xml: any) {
  return new Promise((resolve, reject) => {
    parser.parseString(xml, (err: any, ret: any) => {
      if (err) {
        reject(err);
      }
      resolve(ret);
    });
  });
}
