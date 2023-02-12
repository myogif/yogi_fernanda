const jwt = require('jsonwebtoken');

const scret = "testBENodeJS";

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
      const parted = headers.authorization.split(' ');
      if (parted.length === 2) {
          return parted[1];
      }
  }
  return undefined;
};


function generateToken(parameter) {

  var token = jwt.sign(parameter, scret, { expiresIn: '1d' });
  console.log(token)
  return token
}


function decodejwt(data){
  try{
    let decoded = jwt.verify(data, scret);
    return decoded;
  }catch(err){
    return err;
  }
}


const verify = async(req, res, next) =>{
  try{  
    let cekToken = getToken(req.headers);
    if(!cekToken){
      return res.status(401).json({
        status: 'failed',
        message: 'Token is not Found'
      });
    }
    
    const decoded = decodejwt(cekToken);
    if(!decoded){
      return res.status(401).json({
        status: 'failed',
        message: 'Token is not valid'
      });
    }
  
    let datatoken = decoded;
    req.username = datatoken.userName;
    next();
  }catch(error){
    return res.status(400).json({
      status: 'failed',
      message: error.message
    });
  }

}


module.exports = { generateToken, verify }