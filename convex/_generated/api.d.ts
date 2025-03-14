/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as files from '../files.js';
import type * as http from '../http.js';
import type * as openai from '../openai.js';
import type * as podcasts from '../podcasts.js';
import type * as users from '../users.js';

import type { ApiFromModules, FilterApi, FunctionReference } from 'convex/server';
/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  files: typeof files;
  http: typeof http;
  openai: typeof openai;
  podcasts: typeof podcasts;
  users: typeof users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<typeof fullApiWithMounts, FunctionReference<any, 'public'>>;
export declare const internal: FilterApi<typeof fullApiWithMounts, FunctionReference<any, 'internal'>>;

export declare const components: {
  aggregate: {
    btree: {
      aggregateBetween: FunctionReference<
        'query',
        'internal',
        { k1?: any; k2?: any; namespace?: any },
        { count: number; sum: number }
      >;
      atNegativeOffset: FunctionReference<
        'query',
        'internal',
        { k1?: any; k2?: any; namespace?: any; offset: number },
        { k: any; s: number; v: any }
      >;
      atOffset: FunctionReference<
        'query',
        'internal',
        { k1?: any; k2?: any; namespace?: any; offset: number },
        { k: any; s: number; v: any }
      >;
      get: FunctionReference<'query', 'internal', { key: any; namespace?: any }, null | { k: any; s: number; v: any }>;
      offset: FunctionReference<'query', 'internal', { k1?: any; key: any; namespace?: any }, number>;
      offsetUntil: FunctionReference<'query', 'internal', { k2?: any; key: any; namespace?: any }, number>;
      paginate: FunctionReference<
        'query',
        'internal',
        {
          cursor?: string;
          k1?: any;
          k2?: any;
          limit: number;
          namespace?: any;
          order: 'asc' | 'desc';
        },
        {
          cursor: string;
          isDone: boolean;
          page: Array<{ k: any; s: number; v: any }>;
        }
      >;
      paginateNamespaces: FunctionReference<
        'query',
        'internal',
        { cursor?: string; limit: number },
        { cursor: string; isDone: boolean; page: Array<any> }
      >;
      validate: FunctionReference<'query', 'internal', { namespace?: any }, any>;
    };
    inspect: {
      display: FunctionReference<'query', 'internal', { namespace?: any }, any>;
      dump: FunctionReference<'query', 'internal', { namespace?: any }, string>;
      inspectNode: FunctionReference<'query', 'internal', { namespace?: any; node?: string }, null>;
    };
    public: {
      clear: FunctionReference<
        'mutation',
        'internal',
        { maxNodeSize?: number; namespace?: any; rootLazy?: boolean },
        null
      >;
      deleteIfExists: FunctionReference<'mutation', 'internal', { key: any; namespace?: any }, any>;
      delete_: FunctionReference<'mutation', 'internal', { key: any; namespace?: any }, null>;
      init: FunctionReference<
        'mutation',
        'internal',
        { maxNodeSize?: number; namespace?: any; rootLazy?: boolean },
        null
      >;
      insert: FunctionReference<
        'mutation',
        'internal',
        { key: any; namespace?: any; summand?: number; value: any },
        null
      >;
      makeRootLazy: FunctionReference<'mutation', 'internal', { namespace?: any }, null>;
      replace: FunctionReference<
        'mutation',
        'internal',
        {
          currentKey: any;
          namespace?: any;
          newKey: any;
          newNamespace?: any;
          summand?: number;
          value: any;
        },
        null
      >;
      replaceOrInsert: FunctionReference<
        'mutation',
        'internal',
        {
          currentKey: any;
          namespace?: any;
          newKey: any;
          newNamespace?: any;
          summand?: number;
          value: any;
        },
        any
      >;
    };
  };
};
