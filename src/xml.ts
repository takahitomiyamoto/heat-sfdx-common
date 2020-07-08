/**
 * @name xml.ts
 * @description utilities for XML
 */
import xml2js from 'xml2js';

/**
 * @name json2xml
 * @description convert JSON to XML
 */
const json2xml = (json: any): string => {
  return new xml2js.Builder().buildObject(json);
};

export { json2xml };
