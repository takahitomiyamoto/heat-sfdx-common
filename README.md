![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# heat-sfdx-common

This package is responsible for the common features of the heat-sfdx series.

## heat-sfdx series

| category     | package                                                                      |
| :----------- | :--------------------------------------------------------------------------- |
| Metadata API | [head-sfdx-metadata](https://github.com/takahitomiyamoto/heat-sfdx-metadata) |
| Tooling API  | [head-sfdx-tooling](https://github.com/takahitomiyamoto/heat-sfdx-tooling)   |
| Common       | [head-sfdx-common](https://github.com/takahitomiyamoto/heat-sfdx-common)     |

## How to install

```sh
yarn add --dev --exact @takahitomiyamoto/heat-sfdx-common --update-checksums
```

## Reference

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

## Emoji

| emoji      | definition                           |
| :--------- | :----------------------------------- |
| :recycle:  | refactored anything                  |
| :bug:      | fixed any bugs                       |
| :+1:       | improved any features                |
| :sparkles: | added any features                   |
| :fire:     | removed any features                 |
| :tada:     | made a major change for any features |
