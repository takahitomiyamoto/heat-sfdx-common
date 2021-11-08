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
export const readFileSyncUtf8 = (path: string) => {
  return fs.readFileSync(path, {
    encoding: UTF8
  });
};

/**
 * @name readdirSyncUtf8
 * @description readdirSync with encoding UTF-8
 */
export const readdirSyncUtf8 = (path: fs.PathLike) => {
  return fs.readdirSync(path, {
    encoding: UTF8,
    withFileTypes: true
  });
};

/**
 * @name writeFileSyncUtf8
 * @description writeFileSync with encoding UTF-8
 */
export const writeFileSyncUtf8 = (path: string, data: string) => {
  fs.writeFileSync(path, data, {
    encoding: UTF8
  });
};

/**
 * @name existsSync
 * @description existsSync
 */
export const existsSync = (path: string) => {
  return fs.existsSync(path);
};

/**
 * @name rmdirSync
 * @description rmdirSync
 */
export const rmdirSync = (path: string, options: any) => {
  return fs.rmdirSync(path, options);
};

/**
 * @name rmSync
 * @description rmSync
 */
export const rmSync = (path: string, options: any) => {
  return fs.rmSync(path, options);
};

/**
 * @name mkdirSync
 * @description mkdirSync
 */
export const mkdirSync = (path: string) => {
  return fs.mkdirSync(path);
};
