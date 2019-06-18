const db = require('../database');
const Encryption = require('../utils/encryption');
const jwt = require('jsonwebtoken');

module.exports.registration = (req, res, next) => {

  const data = {
    name: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    password: req.body.password,
    email: req.body.email,
  }

  db.query('Select * from Employees where email = $1', [data.email], (err, result) => {
    if (err) {
      return next(err)
    } else {

      if (result.rows.length > 0) {
        return res.status(401).json({
          err: null,
          msg: 'Email Already Exists.',
          data: null,
        });
      }
      else {

        Encryption.hashPassword(data.password, (err, hash) => {
          if (err) {
            console.log(err)
            return next(err);
          }
          data.password = hash;

          const query = 'INSERT INTO Employees(FirstName,LastName,Email,Password) VALUES($1,$2,$3,$4) RETURNING *';
          const values = [data.name.firstName, data.name.lastName, data.email, data.password];

          db.query(query, values, (err, result) => {
            if (err) {
              return next(err)
            }
            result.rows[0].password = undefined;
            return res.status(200).json({
              err: null,
              msg: 'User Created Successfully.',
              data: result.rows[0],
            });
          })
        });
      }
    }
  })
};

module.exports.authentication = (req, res, next) => {

  const query = 'Select * from Employees where email = $1';
  const values = [req.body.email];


  db.query(query, values, (err, result) => {
    if (err) {
      return next(err)
    }
    if (result.rows === undefined || result.rows.length == 0) {
      return res.status(401).json({
        err: null,
        msg: 'Email Not Found.',
        data: null,
      });
    }
    else {

      const user = result.rows[0];

      Encryption.comparePasswordToHash(
        req.body.password,
        user.password,
        (err, passwordMatches) => {
          if (err) {
            return next(err);
          }
          if (!passwordMatches) {
            return res
              .status(401)
              .json({
                err: null,
                msg: 'Password is incorrect.',
                data: null
              });
          }


          const token = jwt.sign({
            id: user.employeeid
          },
            process.env.SECRET, {
              expiresIn: '100d',
            },
          );

          res.status(200).json({
            err: null,
            msg: `Signed in successfully`,
            data: token,
          });
        },
      );
























    }





  })

};

