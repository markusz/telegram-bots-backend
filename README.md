## How to build your own chat bot

1. Talk to the BotFather on Telegram (https://web.telegram.org/#/im?p=@BotFather) to get API-Token
2. Change `/setprivacy` to enabled
3. Have AWS Account and setup Token as described in serverless docs
4. Deploy to AWS Lambda / API Gateway with `serverless deploy` and note down resource-URL, i.e. `POST - https://<randomId>.execute-api.<your-region>.amazonaws.com/prod/bots/grantler/grantel`
5. Set stageVariable `BOT_TOKEN` to the token retrieved by the botfather
6. Wire Bot and AWS by calling `https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<resource-URL>`
7. Profit