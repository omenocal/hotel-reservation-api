import type { AWS } from '@serverless/typescript';
import {
  createReservation,
  getReservation,
  updateReservation,
  deleteReservation,
} from '@functions/reservation';

const serverlessConfiguration: AWS = {
  service: 'hotel-reservation-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:Query",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: "arn:aws:dynamodb:us-east-1:*:table/ReservationTable",
        }],
      },
    },
  },
  // import the function via paths
  functions: { createReservation, getReservation, updateReservation, deleteReservation },
  package: { individually: true },
  custom:{
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb:{
      start:{
        port: 3000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    }
  },
  resources: {
    Resources: {
      ReservationTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "ReservationTable",
          AttributeDefinitions: [{
            AttributeName: "reservationId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "reservationId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
        },
      },
    },
  },
};
module.exports = serverlessConfiguration;