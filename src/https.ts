/**
 * @name https.ts
 * @description utilities for HTTPS
 */
import https from 'https';

/**
 * @name httpRequest
 * @description send HTTP request
 */
const httpRequest = (
  options: https.RequestOptions,
  requestBody?: string
) => {
  return new Promise((resolve, reject) => {
    const req: any = https.request(options, (res) => {
      const queue: Buffer[] = [];
      res.on('data', (chunk: any) => {
        queue.push(chunk);
      });
      res.on('end', () => {
        const data: Buffer = Buffer.concat(queue);
        resolve(data.toString());
      });
    });
    req.on('error', (error: any) => {
      reject(error);
    });
    if (requestBody) {
      req.write(requestBody);
    }
    req.end();
  });
};

/**
 * @name requestBody
 * @description request body
 */
type requestBody = {
  key: string;
  value: string;
};

/**
 * @name requestBody2String
 * @description [{key: k1, value: v1}, {key: k2, value: v2}, ... ] => k1=v1&k2=v2&...
 */
const requestBody2String = (params: requestBody[]): string => {
  const body: string[] = [];
  params.forEach((param: requestBody) => {
    const item: string[] = [];
    item.push(param.key);
    item.push(param.value);
    body.push(item.join('='));
  });
  return body.join('&');
};

export { httpRequest, requestBody2String };
