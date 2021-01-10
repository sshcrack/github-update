# Github Update

## Add a new webhook
1. Go to your repositorys' settings, click on "Webhooks" and "Add Webhook".
2. Use following settings:
  Content-Type: `application/json`
  Secret: <Insert Secret here>
  
## Add env file
Create a new .env file and paste following:
`SECRET=<Insert Webhook Secret here>`

## Custom Port
If you wish to use a custom port insert in the .env file
`PORT=<Your custom port>`

## Install packages
Just run `npm install`

## Start server
Start the server with `npm start`
