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

#### params: authentication

- privateKey: local path of a private key file for a certificate added to a connected app
- clientId: consumer key in a connected app
- username: username of a login user
- hostname: hostname of a login URL

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

### httpRequest

send HTTP request

Example:

```js
import { httpRequest } from 'heat-sfdx-common';

const options = {};
const bodyString = '';
const result: any = await httpRequest(options, bodyString);
console.log(JSON.parse(result));
```

> [src/https.ts](https://github.com/takahitomiyamoto/heat-sfdx-common/blob/master/src/https.ts#L20)

#### requestBody2String

`[{key: k1, value: v1}, {key: k2, value: v2}, ... ]` => `k1=v1&k2=v2&...`

> [src/https.ts](https://github.com/takahitomiyamoto/heat-sfdx-common/blob/master/src/https.ts#L46)

## Emoji

| emoji      | definition                           |
| :--------- | :----------------------------------- |
| :recycle:  | refactored anything                  |
| :bug:      | fixed any bugs                       |
| :+1:       | improved any features                |
| :sparkles: | added any features                   |
| :fire:     | removed any features                 |
| :tada:     | made a major change for any features |
