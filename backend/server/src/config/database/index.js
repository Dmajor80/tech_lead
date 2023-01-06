const { MongoClient } = require("mongodb");
const { getDBURL,getLOCAL_DBURL, getDB_NAME } = require("../env"); 

const DBURL =getDBURL()||getLOCAL_DBURL();
const client = new MongoClient(DBURL);
const db = client.db(getDB_NAME());
const mongodbConnect = async () => {
  try { 
    console.log(`Connecting to database...`);
  
    await client.connect();
    console.log(`Database connected...`);

  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
}
        
module.exports={
    mongodbConnect,
    db,
    client,
}