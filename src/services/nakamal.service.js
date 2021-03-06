/* eslint-disable */

// import Client from './Clients/AxiosClient';
const resource = '/nakamals';

// const nakamals = [
//   {
//     id: 1,
//     avatar: 'https://picsum.photos/id/2000/1',
//     name: 'Nak Test 1',
//     lat: -17.7,
//     lng: 168.3,
//   },
//   {
//     id: 2,
//     avatar: 'https://picsum.photos/id/2000/2',
//     name: 'Nak Test 2',
//     lat: -17.75,
//     lng: 168.35,
//   },
//   {
//     id: 3,
//     avatar: 'https://picsum.photos/id/2000/3',
//     name: 'Nak Test 3',
//     lat: -17.8,
//     lng: 168.4
//   },
// ];

for (var a = [], i = 0; i < 40; ++i) a[i] = i;

// http://stackoverflow.com/questions/962802#962890
function getNakamalList() {
  let a = [];
  for (i = 1; i < 300; ++i) {
    let n = {};
    n.id = i;
    n.name = `Kava Bar ${i}`;
    n.lat = (Math.random() * (-17.68 - -17.9) + -17.9).toFixed(4);
    n.lng = (Math.random() * (168.45 - 168.25) + 168.25).toFixed(4);
    n.avatar = `https://picsum.photos/id/2000/${i}`;
    a.push(n);
  }
  return a;
}
 
console.log('Building nakamal test list');
let nakamals = getNakamalList();
console.log('Got nakamals');

export default {
  get() {
    // return Client.get(`${resource}`);
    return nakamals;
  },
  getNakamal(id) {
    // return Client.get(`${resource}/${id}`);
    return nakamals.find((n) => n.id === id);
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