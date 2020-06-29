/**
 * @name auth.ts
 * @description utilities for authentication and authorization
 */
import https from 'https';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { httpRequest, requestBody, requestBody2String } from './https';

const UTF8 = 'utf8';
const RS256 = 'RS256';

/**
 * @name authentication
 * @description authentication
 */
type authentication = {
  privateKey: string;
  clientId: string;
  username: string;
  hostname: string;
};

/**
 * @name authorization
 * @description authorization
 */
type authorization = {
  accessToken: string;
  instanceUrl: string;
  options: any;
};

/**
 * @name userInfo
 * @description userInfo
 */
type userInfo = {
  accessToken: string;
  scope: string;
  instanceUrl: string;
  id: string;
  tokenType: string;
};

/**
 * @name jwtClaim
 * @description jwtClaim
 */
type jwtClaim = {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  jti: string;
};

/**
 * @name _setOptionsOauth2Token
 * @description set options for /services/oauth2/token
 */
const _setOptionsOauth2Token = (
  params: authentication
): https.RequestOptions => {
  return {
    hostname: params.hostname,
    path: '/services/oauth2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
};

/**
 * @name _createJwt
 * @description create JWT
 */
const _createJwt = (params: authentication): string => {
  const privateKey: string = fs.readFileSync(params.privateKey, {
    encoding: UTF8
  });
  const claim: jwtClaim = {
    iss: params.clientId,
    sub: params.username,
    aud: `https://${params.hostname}`,
    exp: Math.floor(Date.now() / 1000) + 180,
    jti: uuidv4()
  };
  return jwt.sign(claim, privateKey, { algorithm: RS256 });
};

/**
 * @name _setUserInfo
 * @description set UserInfo
 */
const _setUserInfo = (result: any): userInfo => {
  return {
    accessToken: result.access_token,
    scope: result.scope,
    instanceUrl: result.instance_url,
    id: result.id,
    tokenType: result.token_type
  };
};

/**
 * @name loginJwt
 * @description login with JWT Bearer Flow
 */
async function loginJwt(params: authentication): Promise<string> {
  const options = _setOptionsOauth2Token(params);
  const bodies: requestBody[] = [
    {
      key: 'grant_type',
      value: 'urn:ietf:params:oauth:grant-type:jwt-bearer'
    },
    {
      key: 'assertion',
      value: _createJwt(params)
    }
  ];
  const bodyString: string = requestBody2String(bodies);
  const result: any = await httpRequest(options, bodyString);
  console.log(JSON.parse(result));
  const userInfo = _setUserInfo(JSON.parse(result));
  return JSON.stringify(userInfo);
}

export { authorization, loginJwt };
