const { zencode_exec } = require("zenroom");

const conf = "memmanager=lw";

const encrypt = async (message, password) => {
  const keys = JSON.stringify({ password });
  const data = JSON.stringify({ message });
  const contract = `Scenario 'ecdh': Encrypt a message with a password/secret 
    Given that I have a 'string' named 'password' 
    and that I have a 'string' named 'message' 
    When I encrypt the secret message 'message' with 'password' 
    Then print the 'secret message'`;
  const { result } = await zencode_exec(contract, { data, keys, conf });
  return result;
};

const decrypt = async (encryptedMessage, password) => {
  const keys = JSON.stringify({ password });
  const data = encryptedMessage;
  const contract = `Scenario 'ecdh': Decrypt the message with the password 
    Given that I have a valid 'secret message' 
    Given that I have a 'string' named 'password' 
    When I decrypt the text of 'secret message' with 'password' 
    Then print the 'text' as 'string'`;
  const { result } = await zencode_exec(contract, { data, keys, conf });
  const decrypted = JSON.parse(result).text;
  return decrypted;
};

const message = "Dear Bob, your name is too short, goodbye - Alice.";
const password = 0xbada55;
(async () => {
  // encrypt the message
  const encrypted = await encrypt(message, password);
  console.log(encrypted); // some crypto magic material
  const decrypted = await decrypt(encrypted, password);
  // let's verify that the original message is the same as the decrypted one
  if (message === decrypted) {
    console.log("🎉 🎉 🎉 ");
    console.log("Yeah! It works");
    console.log("🎉 🎉 🎉 ");
  }
})();
