/**
 * scripts/lib/osm.js
 *
 * Openstreetmap utensils
 */

'use strict';


const tileCacheDb  = "ourTileCacheDb";
function _tile2Key(tile) {
    if (typeof tile === "object") {
        return "z:"+tile.z+"x:"+tile.x+"y:"+tile.y;
    } else if (typeof tile === "string") {
        return tile;
    }
    throw new Error("Unrecognised tile key "+JSON.stringify(tile));
}

class TileCacheDb {

    constructor() {
        this.tileDBReady = new Promise(function(resolve, reject) {
            console.log("Initialising "+tileCacheDb);
            var openDbCreateReq = indexedDB.open(tileCacheDb, 1);
            openDbCreateReq.onsuccess = function(event) {
                console.log(tileCacheDb+" initialised");
                resolve(event.target.result);
            };

            openDbCreateReq.onerror = function(event) {
                reject(new Error("IndexedDB not supported here"));
            };

            openDbCreateReq.onupgradeneeded = function(event) {
                var db = event.target.result;
                if (db.objectStoreNames.length == 0) {
                    // Create an objectStore for this database
                    var tileObjectStore = db.createObjectStore("tile", { keyPath: "tile3" });
                    tileObjectStore.createIndex("tile3", "tile3", { unique: true });
                    tileObjectStore.transaction.oncomplete = function(event) {};
                }
            };
        });
    }

    tile2Key(tile) {
        return _tile2Key(tile);
    }

    ready() {
        return this.tileDBReady;
    }

    get(tile) {
        return this.tileDBReady.then(function(tileDB) {
            return new Promise(function(resolve, reject) {
                var req = tileDB.transaction(["tile"])
                .objectStore("tile")
                .get(_tile2Key(tile));

                req.onsuccess = function(event) {
                    if(event.target.result) {
                        resolve(event.target.result.arrayBuffer);
                    } else {
                        resolve();
                    }
                };
                req.onerror = function(err) {
                    reject(err);
                };
            });
        });
    }

    has(tile) {
        return this.tileDBReady.then(function(tileDB) {
            return new Promise(function(resolve, reject) {
                var req = tileDB.transaction(["tile"])
                .objectStore("tile")
                .count(IDBKeyRange.bound(_tile2Key(tile), _tile2Key(tile)));


                req.onsuccess = function(event) {
                    if(event.target.result) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                };
                req.onerror = function(err) {
                    reject(err);
                };
            });
        });
    }

    all() {
        return this.tileDBReady.then(function(tileDB) {
            return new Promise(function(resolve, reject) {
                var req = tileDB.transaction(["tile"])
                .objectStore("tile")
                .getAllKeys();

                req.onsuccess = function(event) {
                    if(event.target.result) {
                        resolve(event.target.result);
                    } else {
                        resolve();
                    }
                };
                req.onerror = function(err) {
                    reject(err);
                };
            });
        });
    }

    put(tile, arrayBuffer) {
        return this.tileDBReady.then(function(tileDB) {
            return new Promise(function(resolve, reject) {
                var req = tileDB.transaction(["tile"], "readwrite")
                .objectStore("tile")
                .add({tile3: _tile2Key(tile), arrayBuffer: arrayBuffer});

                req.onsuccess = function(event) {
                    resolve(true);
                };
                req.onerror = function(err) {
                    reject(err);
                };
            });
        });
    }

    delete(tile) {
        return this.tileDBReady.then(function(tileDB) {
            return new Promise(function(resolve, reject) {
                var req = tileDB.transaction(["tile"], "readwrite")
                .objectStore("tile")
                .delete(_tile2Key(tile));

                req.onsuccess = function(event) {
                    resolve();
                };
                req.onerror = function(err) {
                    reject(err);
                };
            });
        });
    }
}


const tileCacheDb = new TileCacheDb();
if (typeof module !== "undefined") {
    module.exports = tileCacheDb;
}