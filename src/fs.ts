/**
 * @name fs.ts
 * @description utilities for fs
 */
import fs from 'fs';

const UTF8 = 'utf8';

/**
 * @name readFileSyncUtf8
 * @description readFileSync with encoding UTF-8
 */
const readFileSyncUtf8 = (path: string) => {
  return fs.readFileSync(path, {
    encoding: UTF8
  });
};

/**
 * @name readdirSyncUtf8
 * @description readdirSync with encoding UTF-8
 */
const readdirSyncUtf8 = (path: fs.PathLike) => {
  return fs.readdirSync(path, {
    encoding: UTF8,
    withFileTypes: true
  });
};

/**
 * @name writeFileSyncUtf8
 * @description writeFileSync with encoding UTF-8
 */
const writeFileSyncUtf8 = (path: string, data: string) => {
  fs.writeFileSync(path, data, {
    encoding: UTF8
  });
};

export { readFileSyncUtf8, readdirSyncUtf8, writeFileSyncUtf8 };
