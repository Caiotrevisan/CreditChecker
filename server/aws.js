import aws from "aws-sdk"

aws.config.update({
    accessKeyId: "AKIAVAXA4HWPG3L3HLPX",
    secretAccessKey: "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",
    region: 'sa-east-1'
}); // Substitua pela sua região
export const dynamodb = new aws.DynamoDB.DocumentClient();