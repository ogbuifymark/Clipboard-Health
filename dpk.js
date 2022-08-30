const crypto = require("crypto");

exports.deterministicPartitionKey = (valuePassed) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let partitionedKey;
  if (valuePassed ) { // checking if the event is not null and if its not equal to zero
    if (valuePassed.partitionKey) { // checking if the valuePassed.partitionKey is not null and if its not equal to zero
      partitionedKey = valuePassed.partitionKey; // assigning the value passed to the variable partitionedKey
    } else {
      const data = JSON.stringify(valuePassed);// Ensuring that the value passed is converted to a string 
      partitionedKey = crypto.createHash("sha3-512").update(data).digest("hex"); // Getting a hash value of the value passed
    }
  }

  if (partitionedKey) { // checking if the partitionedKey is null and if its not equal to zero
    if (typeof partitionedKey !== "string") {
      partitionedKey = JSON.stringify(partitionedKey); // Ensuring that the value passed is converted to a string
    }
  } else {
    partitionedKey = TRIVIAL_PARTITION_KEY;
  }
  if (partitionedKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionedKey = crypto.createHash("sha3-512").update(partitionedKey).digest("hex"); // Getting a hash value of the value passed
  }
  return partitionedKey;
};

console.log(this.deterministicPartitionKey({partitionKey:10}));