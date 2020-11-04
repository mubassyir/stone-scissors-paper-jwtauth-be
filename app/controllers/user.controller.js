const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

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

// query all or with email
exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email? {email: {[Op.iLike]: `%${email}%`,},}: null;

  User.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "there is no tutorial with that email",
      });
    });
};

// query with query params id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `there is no tutorial with that ${id}` ,
      });
    });
};

// update user
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { user_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.redirect("/")
      } else {
        res.send({
          message: `Cannot update user with id=${id} `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Errot updating user with ${id}`,
      });
    });
};

// delete with query params
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { user_id: id } })
    .then((num) => {
      if (num == 1) {
        res.redirect("/");
      } else {
        res.send({
          message: `Cannot delete user with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete user with ${id}`,
      });
    });
};

// delele all
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: 'User was deleted successfully',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Deleted  all Failed",
      });
    });
};
