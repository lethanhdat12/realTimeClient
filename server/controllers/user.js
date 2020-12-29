const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require("google-auth-library");

const client = new OAuth2Client(
  "58649999431-amsen9pga2avtp9cr9eq7mccdust95sc.apps.googleusercontent.com"
);


module.exports = {
  postLoginGoogle: (req, res, next) => {
    const {
      tokenId
    } = req.body;
    client
      .verifyIdToken({
        idToken: tokenId,
        audience: "58649999431-amsen9pga2avtp9cr9eq7mccdust95sc.apps.googleusercontent.com",
      })
      .then((data) => {
        const {
          email,
          name,
          imageUrl,
          sub
        } = data.payload;


        if (data) {
          UserModel.findOne({
              "google.email": email,
            })
            .exec()
            .then((user) => {
              if (user) {
                const token = jwt.sign({
                    _id: user._id,
                  },
                  "secret", {
                    expiresIn: "7d",
                  }
                );
                return res.status(200).json({
                  token,
                  user: user,
                });
              } else {
                const user = new UserModel({
                  fullname: name,
                  "google.email": email,
                  "google.uid": sub,
                  avatar: imageUrl,
                });
                user
                  .save()
                  .then((result) => {
                    const token = jwt.sign({
                        _id: result._id,
                      },
                      "secret", {
                        expiresIn: "7d",
                      }
                    );
                    return res.status(200).json({
                      token,
                      user: result,
                    });
                  })
                  .catch((err) => {
                    res.status(500).json({
                      error: err,
                    });
                  });
              }
            });
        }
      });
  },
};
