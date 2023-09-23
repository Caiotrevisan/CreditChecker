import aws from "aws-sdk"

aws.config.update({
    accessKeyId: "AKIAVAXA4HWPHVP3VG4J",
    secretAccessKey: "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",
    region: 'sa-east-1'
}); // Substitua pela sua região
export const dynamodb = new aws.DynamoDB.DocumentClient();