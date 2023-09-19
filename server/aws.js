import aws from "aws-sdk"

aws.config.update({ region: 'sa-east-1' }); // Substitua pela sua região
export const dynamodb = new aws.DynamoDB.DocumentClient();