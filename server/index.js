const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '89fa0ae1d74a693fb454a0ed4aa0c1ec4c6f40065a6b6c00db970d7829acd583';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { proof, name } = req.body;

  // Use the verifyProof function to check if the proof is valid
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  
  const body = req.body;
  
  if(isInTheList) {
    res.send("You got 69 ETH!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

const cors = require('cors');
app.use(cors());
