/**
 * @name xml.ts
 * @description utilities for XML
 */
import xml2js from 'xml2js';

/**
 * @name json2xml
 * @description convert JSON to XML
 */
export const json2xml = (json: any): string => {
  return new xml2js.Builder().buildObject(json);
};

/**
 * @name xml2json
 * @description convert XML to JSON
 */
export async function xml2json(xml: any) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, ret) => {
      if (err) {
        reject(err);
      }
      resolve(ret);
    });
  });
}
