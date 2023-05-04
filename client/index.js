const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // The name we want to prove is in the list
  const name = 'Kakashi Hatake'

  // Generate the merkle tree from the nice list and create the proof for the client to use
  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(niceList.findIndex(n => n === name));

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: proof,
    name: name,
  });

  console.log({ gift });
}

main();