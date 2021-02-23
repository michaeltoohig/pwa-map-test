/* eslint-disable */

const tileCacheDbName = 'ourTileCacheDb';

function tile2KeyFn(tile) {
  if (typeof tile === 'object') {
    return `z:${tile.z}x:${tile.x}y:${tile.y}`;
  } if (typeof tile === 'string') {
    return tile;
  }
  throw new Error(`Unrecognised tile key ${JSON.stringify(tile)}`);
}

// function this.tile2KeyFn(tile) {
//   if (typeof tile === 'object') {
//     return `z:${tile.z}x:${tile.x}y:${tile.y}`;
//   } if (typeof tile === 'string') {
//     return tile;
//   }
//   throw new Error(`Unrecognised tile key ${JSON.stringify(tile)}`);
// }

class TileCacheDb {
  constructor() {
    this.tileDBReady = new Promise((resolve, reject) => {
      // console.log(`Initialising ${tileCacheDbName}`);
      const openDbCreateReq = indexedDB.open(tileCacheDbName, 1);
      openDbCreateReq.onsuccess = (event) => {
        // console.log(`${tileCacheDbName} initialised`);
        resolve(event.target.result);
      };

      openDbCreateReq.onerror = () => {
        reject(new Error('IndexedDB not supported here'));
      };

      openDbCreateReq.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (db.objectStoreNames.length === 0) {
          // Create an objectStore for this database
          const tileObjectStore = db.createObjectStore('tile', { keyPath: 'tile3' });
          tileObjectStore.createIndex('tile3', 'tile3', { unique: true });
          tileObjectStore.transaction.oncomplete = () => {};
        }
      };
    });
  }

  tile2Key(tile) {
    return tile2KeyFn(tile);
  }

  ready() {
    return this.tileDBReady;
  }

  get(tile) {
    return this.tileDBReady.then((tileDB) => new Promise((resolve, reject) => {
      const req = tileDB.transaction(['tile'])
        .objectStore('tile')
        .get(this.tile2Key(tile));

      req.onsuccess = (event) => {
        if (event.target.result) {
          resolve(event.target.result.arrayBuffer);
        } else {
          resolve();
        }
      };
      req.onerror = (err) => {
        reject(err);
      };
    }));
  }

  has(tile) {
    return this.tileDBReady.then((tileDB) => new Promise((resolve, reject) => {
      const req = tileDB.transaction(['tile'])
        .objectStore('tile')
        .count(IDBKeyRange.bound(this.tile2Key(tile), this.tile2Key(tile)));

      req.onsuccess = (event) => {
        if (event.target.result) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      req.onerror = (err) => {
        reject(err);
      };
    }));
  }

  all() {
    return this.tileDBReady.then((tileDB) => new Promise((resolve, reject) => {
      const req = tileDB.transaction(['tile'])
        .objectStore('tile')
        .getAllKeys();

      req.onsuccess = (event) => {
        if (event.target.result) {
          resolve(event.target.result);
        } else {
          resolve();
        }
      };
      req.onerror = (err) => {
        reject(err);
      };
    }));
  }

  put(tile, arrayBuffer) {
    return this.tileDBReady.then((tileDB) => new Promise((resolve, reject) => {
      const req = tileDB.transaction(['tile'], 'readwrite')
        .objectStore('tile')
        .add({ tile3: this.tile2Key(tile), arrayBuffer });

      req.onsuccess = () => {
        resolve(true);
      };
      req.onerror = (err) => {
        reject(err);
      };
    }));
  }

  delete(tile) {
    return this.tileDBReady.then((tileDB) => new Promise((resolve, reject) => {
      const req = tileDB.transaction(['tile'], 'readwrite')
        .objectStore('tile')
        .delete(this.tile2Key(tile));

      req.onsuccess = () => {
        resolve();
      };
      req.onerror = (err) => {
        reject(err);
      };
    }));
  }
}

const tileCacheDb = new TileCacheDb();

if (typeof module !== 'undefined') {
  module.exports = tileCacheDb;
}
