const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const debug = require('debug')("app:main");

async function isLoggined(req,res,next){
  const tokenBearer = req.header("Authorization");
  const token = tokenBearer?.slice(7, );
  if(!token){
    res.status(401).send('access denied');
    return;
  } 

  try{
    const decoded = jwt.verify(token, config.get('jwt_key'));
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  }catch(ex){
    res.status(401).send('invalid token');
  }
}

async function isAdmin(req,res,next){
  if(!req.user.isadmin) res.status(403).send('access denied');
  next();
}

module.exports = {
  isLoggined, isAdmin
}