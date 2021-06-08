const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config.json');
// const config = require('../config/config.test.json');
const url = `mongodb://${config.USERNAME}:${config.PASSWORD}@${config.SERVER}:${config.PORT}`

class Mongo {
  async connectMongo(){
    this.client = await MongoClient.connect(url);
  }

  async disconnectMongo(){
    if (this.client){
      return await this.client.close();
    }
  }
  async insertObject(newObj, name) {
    let dbo = this.client.db(config.DB);
    newObj.fileName = name;
    const result = await dbo.collection("xml").insertOne(newObj);
    console.log('XMl data inserted.');
  }

}
module.exports = Mongo;
