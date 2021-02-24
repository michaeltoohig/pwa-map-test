import Dexie from 'dexie';

const db = new Dexie('hellodb');
db.version(1).stores({
  tasks: '++id,date,description,done',
});

export default db;
