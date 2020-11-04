const db = require("../models");
const User = db.user;
const passport = require("passport");
require("../config/passport")(passport);
const jwt = require("jsonwebtoken");

//SignUp
exports.signUp = async(req, res) => {
    try{
      let{email,password} = req.body;
      await User.findOne({where:{email:email}}).then((result)=>{
      if(result.email===email){
      return res.status(500).send({message:"data already exsit"})
    }
  })
      await User.create({email:email, password:password }) 
      .then(() => {
        res.send({message:"creating data success"});
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some error while creating User data",
        });
      });
    }catch(err){
      res.json({message : err.message})
    }
};

//SignIn
exports.signIn= (req,res)=>{
  let{email,password} =req.body;
  User.findOne({where: {email: email}}).then((user) => {
      if (!user) {
        return res.status(401).send({
          message: "Username not found",
        });
      };
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign(JSON.parse(JSON.stringify(user)),"nodeauthsec",{expiresIn: 86400 * 30 });
          jwt.verify(token, "nodeauthsec", function (err, user) {console.log(err, user)});
          res.json({success: true,token: "JWT " + token,});
        } else {
          res.status(401).send({
            success: false,
            message: "Authentication failed. Wrong password" 
          });
        }
      });
    
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message || "something error when login",
      });
    });
}
