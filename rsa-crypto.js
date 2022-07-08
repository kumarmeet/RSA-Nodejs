const express = require("express");
const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	modulusLength: 2048,
});

const data = "my secret data";
const verifyData = "correct";

const encryptedData = crypto.publicEncrypt(
	{
		key: publicKey,
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
	},
	// We convert the data string to a buffer using `Buffer.from`
	Buffer.from(data)
);

console.log(encryptedData.toString("base64"));

const decryptedData = crypto.privateDecrypt(
	{
		key: privateKey,
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
	},
	encryptedData
);

console.log(decryptedData.toString());

const signature = crypto.sign("sha256", Buffer.from(verifyData), {
	key: privateKey,
	padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
});

console.log(signature.toString("base64"));

const isVerified = crypto.verify(
	"sha256",
	Buffer.from(verifyData),
	{
		key: publicKey,
		padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
	},
	signature
);

console.log(isVerified);

const app = express();

app.listen(6666);
