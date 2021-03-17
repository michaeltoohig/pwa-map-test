/* eslint-disable */

// import Client from './Clients/AxiosClient';
const resource = '/nakamals';

import nakamals from './nakamals.js';
let index = 1;

// http://stackoverflow.com/questions/962802#962890
function getNakamalList() {
  let a = [];
  nakamals.forEach((nakamal) => {
    index += 1;
    nakamal.id = index;
    nakamal.light = 'Unknown';
    nakamal.extras = [];
    a.push(nakamal);
  });
  return a;
}
 
let bars = getNakamalList();

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
    index += 1;
    return {...payload, id: index};
  },
  update(payload, id) {
    // return Client.put(`${resource}/${id}`, payload);
  },
  delete(id) {
    // return Client.delete(`${resource}/${id}`)
  },

  // MANY OTHER ENDPOINT RELATED STUFFS
};