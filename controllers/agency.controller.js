
const db = require('../database');


module.exports.createAgency = (req, res, next) => {


  const data = {
    name: req.body.name,
    ownerID: req.decodedToken.id,
    address: req.body.address,
  }


  const query = 'INSERT INTO Agencies(Name,Address,ownerID) VALUES($1,$2,$3) RETURNING *';
  const values = [data.name, data.address, data.ownerID];

  db.query(query, values, (err, result) => {
    if (err) {
      return next(err)
    }
    return res.status(200).json({
      err: null,
      msg: 'Agency Created Successfully.',
      data: result.rows[0],
    });
  })
};

module.exports.deleteAgency = (req, res, next) => {

  db.query('Select * from Agencies where AgencyID = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    } else {

      if (result.rows.length == 0) {
        return res.status(401).json({
          err: null,
          msg: 'No Agency Found.',
          data: null,
        });
      }
      else {
        const agency = result.rows[0];
        if (agency.ownerid != req.decodedToken.id) {
          return res.status(401).json({
            err: null,
            msg: 'You are not the owner of the Agency.',
            data: null,
          });
        }
        else {
          db.query('delete from Agencies where AgencyID = $1', [req.params.id], (err, result) => {
            if (err) {
              return next(err)
            } else {

              return res.status(200).json({
                err: null,
                msg: 'Agency Deleted Successfully.',
                data: null,
              });
            }
          });
        }
      }
    }
  })
};

module.exports.updateAgency = (req, res, next) => {


  let query = null;
  let values = null;
  if (req.body.address && req.body.name) {
    query = 'UPDATE Agencies SET name = $1, Address = $2 where AgencyID = $3;';
    values = [req.body.address, req.body.name, req.body.agencyID];

  }
  else if (req.body.address) {
    query = 'UPDATE Agencies SET Address = $1 where AgencyID = $2;';
    values = [req.body.address, req.body.agencyID];
  }
  else if (req.body.name) {
    query = 'UPDATE Agencies SET Name = $1 where AgencyID = $2;';
    values = [req.body.name, req.body.agencyID];
  }



  db.query('Select * from Agencies where AgencyID = $1', [req.body.agencyID], (err, result) => {
    if (err) {
      return next(err)
    } else {

      if (result.rows.length == 0) {
        return res.status(401).json({
          err: null,
          msg: 'No Agency Found.',
          data: null,
        });
      }
      else {
        const agency = result.rows[0];
        console.log(result.rows[0])
        if (agency.ownerid != req.decodedToken.id) {
          return res.status(401).json({
            err: null,
            msg: 'You are not the owner of the Agency.',
            data: null,
          });
        }
        else {

          db.query(query, values, (err, result) => {
            if (err) {
              return next(err)
            } else {

              return res.status(200).json({
                err: null,
                msg: 'Agency Updated Successfully.',
                data: result.rows,
              });
            }
          });
        }
      }
    }
  })
};


module.exports.assignEmployeesToAgencies = (req, res, next) => {

  const data = {
    ownerID: req.decodedToken.id,
    employeeID: req.decodedToken.id,
    agencyID: req.body.address,
  }



  db.query('Select * from Agencies where AgencyID = $1', [data.agencyID], (err, result) => {
    if (err) {
      return next(err)
    } else {

      if (result.rows.length == 0) {
        return res.status(401).json({
          err: null,
          msg: 'No Agency Found.',
          data: null,
        });
      }
      else {
        const agency = result.rows[0];
        if (agency.ownerid != data.ownerID) {
          return res.status(401).json({
            err: null,
            msg: 'You are not the owner of the Agency.',
            data: null,
          });
        }
        else {
          const query = 'INSERT INTO EmployeesOfAgencies(EmployeeID,AgencyID) VALUES($1,$2) RETURNING *';
          const values = [data.employeeID, data.agencyID];

          db.query(query, values, (err, result) => {
            if (err) {
              return next(err)
            }
            return res.status(200).json({
              err: null,
              msg: 'Employee Assigned Successfully.',
              data: null,
            });
          })
        }
      }
    }
  })
};

module.exports.getAgencies = (req, res, next) => {

  const query = 'select * from Agencies';

  db.query(query, (err, result) => {
    if (err) {
      return next(err)
    }

    return res.status(200).json({
      err: null,
      msg: 'Agencies Retrived Successfully.',
      data: result.rows,
    });
  });


};


module.exports.getEmployeesAgency = (req, res, next) => {

  const query = 'select Employees.EmployeeID,Employees.FirstName,Employees.LastName,Employees.Email from Employees inner join EmployeesOfAgencies on EmployeesOfAgencies.EmployeeID = Employees.EmployeeID where EmployeesOfAgencies.AgencyID = $1';
  const values = [req.params.agencyID];

  db.query(query, values, (err, result) => {
    if (err) {
      return next(err)
    }
    return res.status(200).json({
      err: null,
      msg: 'Employees Retrived Successfully.',
      data: result.rows,
    });
  });

};
