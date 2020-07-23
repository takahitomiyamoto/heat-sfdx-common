/**
 * @name query.ts
 * @description utilities for query
 */
import { authorization } from './auth';
import { https, httpRequest } from './https';

/**
 * @name _setOptionsQuery
 * @description set options /services/data/vXX.X/query/?q=[query]
 */
const _setOptionsQuery = (params: authorization): https.RequestOptions => {
  const hostname = params.instanceUrl.replace('https://', '');
  return {
    hostname: hostname,
    path: `/services/data/v${params.options.asOfVersion}/query/?q=${params.options.q}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
      'Content-Type': 'application/json'
    }
  };
};

/**
 * @name query
 * @description query
 */
async function query(params: authorization) {
  const result: any = await httpRequest(_setOptionsQuery(params), '');
  return JSON.stringify(result);
}

export { query };
