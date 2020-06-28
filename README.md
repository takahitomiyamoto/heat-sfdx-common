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

### auth

#### loginJwt

login with JWT Bearer Flow

> [src/auth.ts](https://github.com/takahitomiyamoto/heat-sfdx-common/blob/master/src/auth.ts#L112)

### https

#### httpRequest

send HTTP request

> [src/https.ts](https://github.com/takahitomiyamoto/heat-sfdx-common/blob/master/src/https.ts#L20)

#### requestBody2String

`[{key: k1, value: v1}, {key: k2, value: v2}, ... ]` => `k1=v1&k2=v2&...`

> [src/https.ts](https://github.com/takahitomiyamoto/heat-sfdx-common/blob/master/src/https.ts#L46)

## Emoji

| emoji      | definition                           |
| :--------- | :----------------------------------- |
| :recycle:  | refactored anything                  |
| :bug:      | fixed any bugs                        |
| :+1:       | improved any features                |
| :sparkles: | added any features                   |
| :fire:     | removed any features                 |
| :tada:     | made a major change for any features |
