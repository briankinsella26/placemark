const AWS = require("aws-sdk");

module.exports = () => {
	const region = "us-east-1";
	const client = new AWS.SecretsManager({ region });

	const SecretId = "test-secret";
	return new Promise((resolve, reject) => {
		client.getSecretValue({ SecretId }, (err, data) => {
			if (err) {
				reject(err);
			} else {
				const secretsJSON = JSON.parse(data.SecretString);
				let secretsString = "";
				Object.keys(secretsJSON).forEach((key) => {
					secretsString += `${key}=${secretsJSON[key]}\n`;
				});
				resolve(secretsString);
			}
		});
	});
};