require('../connections/connection');
const users = require('../models/users.models');

const bcrypt = require('bcrypt');


exports.searchUser =  async (req, res) => {
  try{
    const identity_number = req.query.identity_number;
    const account_number = req.query.account_number;
    let user = await users.findOne(
      {identityNumber: identity_number}, 
      ['_id','userName', 'accountNumber', 'emailAddress', 'identityNumber']
    );

    if(account_number){
        user = await users.findOne(
        {accountNumber: account_number}, 
        ['_id','userName', 'accountNumber', 'emailAddress', 'identityNumber']
      );

      if(!user){
        return res.status(404).json({
          status: 'fail',
          message: 'user not found'
        });
      }
      return res.status(200).json({
        status: 'success',
        data: user
      })  
    }

    if(!user){
      return res.status(404).json({
        status: 'fail',
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
    });
  }
}

exports.getUser= async (req, res) => {
  try{
    let user = await users.find({}, ['_id','userName', 'accountNumber', 'emailAddress', 'identityNumber']);
    
    
    if(!user){
      return res.status(404).json({
        status: 'fail',
        message: 'user not found'
      });
    }
    
    // let result = user.map(val => ({
    //   id: val._id,
    //   username : val.userName,
    //   account_number: val.accountNumber,
    //   email: val.emailAddress,
    //   identity_number: val.identityNumber
    // }))
    return res.status(200).json({
      status: 'success',
      data: user
    })

  }catch(err){
    console.log(err.message)
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
    
    const validateUsername = await users.findOne({userName: username});
    if(validateUsername){
      return res.status(400).json({
        status: 'fail',
        message: 'username sudah terdaftar. gunakan username lain'
      })
    }

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

    return res.status(201).json({
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
    const username = req.params.id;

    const {
      account_number, 
      email,
      identity_number } = req.body;

      const user = await users.findOne({userName: username});

      if(!user){
        return res.status(404).json({
          status: 'fail',
          message: 'user not found'
        });
      }

      const result = await users.updateOne(
        {userName: username},
        {
          accountNumber: account_number,
          emailAddress: email,
          password: hashedPassword,
          identityNumber: identity_number
        }
      );

      if(!result){
        return res.status(400).json({
          status: 'fail',
          message: 'gagal memperbarui user'
        });
      }
  
      return res.status(200).json({
        status: 'success',
        message: 'berhasil mengubah user '
      })

  }catch(err){
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'      
    })
  }
}

exports.DeleteUser = async (req, res) => {
  try{

    const username = req.params.id;
    
    const user = await users.findOne({userName: username});

    if(!user){
      return res.status(404).json({
        status: 'fail',
        message: 'user not found'
      });
    }

    const result = await users.deleteOne(
      {userName: username}
    );

    if(!result){
      return res.status(400).json({
        status: 'fail',
        message: 'gagal menghapus user'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'success menghapus users'
    })

  }catch(err){
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'      
    })
  }
}