// util/redisConfig.js
const redis = require('redis');
require('dotenv').config();

var client;
const initRedis =  () =>{
  client =  redis.createClient({
    username: 'default',
    password: '3qApQMlPx9fvZxCA3hSyJ5efVl8kl2/V96VmuerboTvs9Ox8am3UFeSRvdl1gUdLTFPOzgWhQLCkU1vE',
    host: 'localhost',
    port: 6379,
  });

  // handleEventConnect({
  //   connectionRedis: client,
  // });
}

const getRedis = () => {
  return client;
}

const closeRedis = () =>{
  
}

module.exports = {
  initRedis,
  getRedis,
  closeRedis,
}


// statusConnectRedis = {
//   CONNECT: 'connected',
//   END: 'end',
//   RECONNECT: 'reconnecting',
//   ERROR: 'error'
// }

// const handleTimeoutError = () => {
//   connectionTimeout = setTimeout( () =>{
//     throw new ERROR("Redis connected failed");
//   })
// }
// const handleEventConnect = async ( {
//   connectionRedis
// }) => { 
//   // console.log(1);
//   connectionRedis.on(statusConnectRedis.CONNECT, () =>{
//     console.log('Connection to Redis - status: Connected');
//     clearTimeout(connectionTimeout);
//   })

//   connectionRedis.on(statusConnectRedis.END, () =>{
//     console.log('Connection to Redis - status; Disconnected');
//     handleTimeoutError();
//   })

//   connectionRedis.on(statusConnectRedis.RECONNECT, () =>{
//     console.log('Connection to Redis - status: Reconnecting');
//     clearTimeout(connectionTimeout);
//   })

//   connectionRedis.on(statusConnectRedis.ERROR, (error) =>{
//     console.log(`Connection to Redis - status: ${error}`);
//     handleTimeoutError();
//   })
// }