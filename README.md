# XML to JSON
A process to convert XML file into JSON and upload to MongoDB.

Technology used: JavaScript, Node, Docker, MongoDB

## Dependencies
* [NodeJS](https://nodejs.org/en/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Install
1. Clone this repository to a machine that has access to the Genesys API.
2. Run `yarn install` in root directory to install necessary modules.
3. Create **config.json** in config directory. See **config.sample.json**.
4. Modify To and From address for email on error in lib/mail.js.

## Run
* **Either** run directly in bin directory:
```bash
node server.js
```
* **Or** run a docker container from root directory:
```bash
docker-compose up -d
```
