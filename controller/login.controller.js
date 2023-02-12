require('../connections/connection');
const users = require('../models/users.models');
const bcrypt = require('bcrypt');
const helper = require('../helper/jwt');


exports.login = async (req, res) => {
  try{
    const {email, password} = req.body;
    let user = await users.findOne(
      {emailAddress: email}
    );

    console.log(user);

    if(!user){
      return res.status(400).json({
        status: 'fail',
        message: 'email / password salah'
      })
    }


    const match = await bcrypt.compare(password, user.password);

    if(!match){
      return res.status(400).json({
        status: 'fail',
        message: 'email / password salah'
      })
    }
    
    const encode = {
      userName: user.userName
    }
    const token = helper.generateToken(encode);
    return res.status(200).json({
      jwtTokken: token
    });
    
    
  }catch(err){
    return res.status(500).json({
      status: 'failed',
      message: err.message
    });
    
  }
}