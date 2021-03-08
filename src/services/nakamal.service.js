/* eslint-disable */

// import Client from './Clients/AxiosClient';
const resource = '/nakamals';

import nakamals from './nakamals.js';

// http://stackoverflow.com/questions/962802#962890
function getNakamalList() {
  let a = [];
  let index = 1;
  nakamals.forEach((nakamal) => {
    index += 1;
    nakamal.id = index; 
    a.push(nakamal);
  });
  return a;
}
 
console.log('Building nakamal test list');
let bars = getNakamalList();
console.log('Got bars');

export default {
  get() {
    // return Client.get(`${resource}`);
    return bars;
  },
  getNakamal(id) {
    // return Client.get(`${resource}/${id}`);
    return bars.find((n) => n.id === id);
  },
  create(payload) {
    // return Client.post(`${resource}`, payload);
  },
  update(payload, id) {
    // return Client.put(`${resource}/${id}`, payload);
  },
  delete(id) {
    // return Client.delete(`${resource}/${id}`)
  },

  // MANY OTHER ENDPOINT RELATED STUFFS
};