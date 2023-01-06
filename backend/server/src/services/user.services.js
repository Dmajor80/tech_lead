const dbconnect = require('../config/db.config');

exports.getUser =async(seller_id,seller_zip_code_prefix)=>{
    try{
  const collecton = dbconnect.db.collection('sellers');
  const user = await collecton.find({seller_id,seller_zip_code_prefix}).toArray();
  
      return user;
    }catch(error){
        return {"error":error};
    }
}
exports.getSellerById =async(seller_id)=>{
    try{
        const collecton = dbconnect.db.collection('sellers');
        const user = await collecton.findOne({seller_id});
     return user
    }catch(error){
        return {"error":error};
    }
}
exports.update=async(userData,seller_id)=>{
    try {
        const collecton = dbconnect.db.collection('sellers');
        const user = await collecton.findOneAndUpdate({seller_id},{$set:{...userData}}, {"returnNewDocument": true} )
        
        return user;
    } catch (error) {
        return {"error": error};
    }
}