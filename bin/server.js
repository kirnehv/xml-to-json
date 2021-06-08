const { Mail, Mongo } = require('../lib');
const parseString = require('xml2js').parseString;
const fs = require('fs');
// declare objects to access classes

const db = new Mongo();

async function main() {
  await db.connectMongo();
  const path = '/output/Experian/inbound_xml/Part_1'
  // const path = './test';
  const dirents = fs.readdirSync(path, { withFileTypes: true });
  const fileNames = dirents
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name);
  for (let i = 0; i < fileNames.length; i++) {
    console.log(fileNames[i])
    const filePath = path + '/' + fileNames[i];
    const archivePath = path + '/Archived/';
    const xml = await fs.readFileSync(filePath, {encoding: 'utf-8'});
    await parseString(xml, async function (err, result) {
      await db.insertObject(result, fileNames[i]);
      console.log(fileNames[i])
      console.log(archivePath + fileNames[i])
      await fs.renameSync(filePath, archivePath + fileNames[i])
    });
  }
  await db.disconnectMongo();
}

main()
  .catch(async error => {
    // log error to logger
    await console.log(error);
    // send error as mail
    // await mail.sendMail(error.stack);
  })
  .finally(async () => {
    console.info("Program finished.");
  });
