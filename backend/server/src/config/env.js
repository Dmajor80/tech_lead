require("dotenv").config();
module.exports ={
    getDBURL:()=>process.env.DB_URL,
    getDB_NAME:()=>process.env.DB_NAME,
    getLOCAL_DBURL:()=>process.env.LOCAL_DB_URL,
    getServerPort:()=>process.env.PORT,
 getFrontendOrigin:()=>process.env.FRONTEND_ORIGIN_URL,
 getRefreshTokenSecrete:()=>process.env.REFRESH_TOKEN_SECRETE,
 getTokenSecrete:()=>process.env.TOKEN_TOKEN_SECRETE,
}