import aws from "aws-sdk"

aws.config.update({
    accessKeyId: "AKIAVAXA4HWPCQX3LO3T",
    secretAccessKey: "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",
    region: 'sa-east-1'
}); // Substitua pela sua região
export const dynamodb = new aws.DynamoDB.DocumentClient();