![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)
[![npm version](https://badge.fury.io/js/heat-sfdx-common.svg)](https://badge.fury.io/js/heat-sfdx-common)
[![dependencies status](https://david-dm.org/takahitomiyamoto/heat-sfdx-common.svg)](https://david-dm.org/takahitomiyamoto/heat-sfdx-common)
[![devDependency status](https://david-dm.org/takahitomiyamoto/heat-sfdx-common/dev-status.svg)](https://david-dm.org/takahitomiyamoto/heat-sfdx-common#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/takahitomiyamoto/heat-sfdx-common.svg)](https://codeclimate.com/github/takahitomiyamoto/heat-sfdx-common)

# heat-sfdx-common

This package is responsible for the common features of the heat-sfdx series.

## heat-sfdx series

| category     | package                                                                      |
| :----------- | :--------------------------------------------------------------------------- |
| Metadata API | [heat-sfdx-metadata](https://github.com/takahitomiyamoto/heat-sfdx-metadata) |
| SOAP API     | [heat-sfdx-soap](https://github.com/takahitomiyamoto/heat-sfdx-soap)         |
| Tooling API  | [heat-sfdx-tooling](https://github.com/takahitomiyamoto/heat-sfdx-tooling)   |
| Common       | [heat-sfdx-common](https://github.com/takahitomiyamoto/heat-sfdx-common)     |

## How to install

```sh
yarn add --dev --exact heat-sfdx-common --update-checksums
```

## Reference

- [loginJwt](https://github.com/takahitomiyamoto/heat-sfdx-common#loginjwtparams-authentication-promisestring)
- [httpRequest](https://github.com/takahitomiyamoto/heat-sfdx-common#httprequestoptions-httpsrequestoptions-requestbody-string-promiseany)
- [requestBody2String](https://github.com/takahitomiyamoto/heat-sfdx-common#requestbody2stringparams-requestbody-string)

### loginJwt(params: authentication): Promise\<string\>

> login with JWT Bearer Flow.

- params: authentication
  - privateKey: string | local path of a private key file for a certificate added to a connected app
  - clientId: string | consumer key in a connected app
  - username: string | username for login
  - hostname: string | hostname fot login

#### Example:

```js
import { loginJwt } from 'heat-sfdx-common';

const params: authentication = {
  privateKey: '.secrets/server.key',
  clientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  username: 'admin@heat-sfdx-common.com',
  hostname: 'login.salesforce.com'
};
const result = await loginJwt(params);

console.log(JSON.parse(result));
```

```json
{
  "accessToken": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "scope": "web api",
  "instanceUrl": "https://xxxxx.my.salesforce.com",
  "id": "https://login.salesforce.com/id/00Dxxxxxxxxxxxxxxx/005xxxxxxxxxxxxxxx",
  "tokenType": "Bearer"
}
```

#### Code:

> [src/auth.ts](https://github.com/takahitomiyamoto/heat-sfdx-common/blob/master/src/auth.ts#L112)

<br>

### httpRequest(options: https.RequestOptions, requestBody?: string): Promise\<any\>

> send HTTP request

- options: https.RequestOptions
  - hostname: string | hostname
  - path: string | endpoint
  - method: string | HTTP method
  - headers: any | HTTP headers
- requestBody: string | HTTP request body

#### Example:

```js
import { httpRequest } from 'heat-sfdx-common';

const options = {
  hostname: 'login.salesforce.com',
  path: '/services/oauth2/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};
const bodyString =
  'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=xxxxxxxxxxxxxxxxxxxx';
const result: any = await httpRequest(options, bodyString);

console.log(JSON.parse(result));
```

```json
{
  "accessToken": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "scope": "web api",
  "instanceUrl": "https://xxxxx.my.salesforce.com",
  "id": "https://login.salesforce.com/id/00Dxxxxxxxxxxxxxxx/005xxxxxxxxxxxxxxx",
  "tokenType": "Bearer"
}
```

#### Code:

> [src/https.ts](https://github.com/takahitomiyamoto/heat-sfdx-common/blob/master/src/https.ts#L20)

<br>

### requestBody2String(params: requestBody[]): string

> `[{key: k1, value: v1}, {key: k2, value: v2}, ... ]` => `k1=v1&k2=v2&...`

- params: requestBody[]
  - requestBody | HTTP request body
    - key: string | key of HTTP request body
    - value: string | value of HTTP request body

#### Example:

```js
import { requestBody2String } from 'heat-sfdx-common';

const bodies: requestBody[] = [
  {
    key: 'grant_type',
    value: 'urn:ietf:params:oauth:grant-type:jwt-bearer'
  },
  {
    key: 'assertion',
    value: 'xxxxxxxxxxxxxxxxxxxx'
  }
];
const bodyString: string = requestBody2String(bodies);

console.log(bodyString);
```

```sh
grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=xxxxxxxxxxxxxxxxxxxx
```

#### Code:

> [src/https.ts](https://github.com/takahitomiyamoto/heat-sfdx-common/blob/master/src/https.ts#L49)

<br>

### json2xml(json: any): string

> convert JSON to XML

- json: any

#### Example:

```js
import { json2xml } from 'heat-sfdx-common';
```

```sh

```

#### Code:

> [src/xml.ts](https://github.com/takahitomiyamoto/heat-sfdx-common/blob/master/src/xml.ts)

<br>

## Emoji

| emoji      | definition                           |
| :--------- | :----------------------------------- |
| :recycle:  | refactored anything                  |
| :bug:      | fixed any bugs                       |
| :+1:       | improved any features                |
| :sparkles: | added any features                   |
| :fire:     | removed any features                 |
| :tada:     | made a major change for any features |
