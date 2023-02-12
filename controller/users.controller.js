// TODO 

/*
1. Create Account
2. update account  
3. delete account 
4. get account by account Number 
5. get account by IndentifyNumber
*/
require('../connections/connection');
const users = require('../models/users.models');

const bcrypt = require('bcrypt');

exports.getUserByAccountNumber = async (req, res) => {
  try{

  }catch(err){
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'      
    })
  }
}

exports.getUserByidentityNumber= async (req, res) => {
  try{
    const identity_number = req.query.identity_number
    const user = await users.findOne({identityNumber: identity_number});
    if(!user){
      return res.status(404).json({
        status: 'success',
        message: 'user not found'
      });
    }
    return res.status(200).json({
      status: 'success',
      data: user
    })

  }catch(err){
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'      
    })
  }
}

exports.createUser = async (req, res) => {
  try{
    
    const {
          username,
          account_number, 
          email,
          password,
          identity_number } = req.body

    const hashedPassword = await bcrypt.hash(password, 10);    
    const user = await users.create({
      userName: username,
      accountNumber: account_number,
      emailAddress: email,
      password: hashedPassword,
      identityNumber: identity_number
    });

    if(!user){
      return res.status(400).json({
        status: 'fail',
        message: 'gagal menambahkan users'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'berhasil menambahkan user baru'
    })

  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'      
    })
  }
}
exports.UpdateUser = async (req, res) => {
  try{

  }catch(err){
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'      
    })
  }
}

exports.DeleteUser = async (req, res) => {
  try{

  }catch(err){
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'      
    })
  }
}