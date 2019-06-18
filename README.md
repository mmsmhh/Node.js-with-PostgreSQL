# Node.js-with-PostgresQL

### Stack Used in this applcation
  - NodeJS
  - ExpressJS
  - PostgreSQL

### Setting up & Installation Locally
1- clone this repository and run npm install
```
npm install
```

2- create .env file in the root directory and add the Database and Port settings
example (file .env):
```
PORT=3000
DATABASE_URL=postgres://wkcflwln:jbJff44Um_PAF1wWXRjDWQRzlVKy25K_@raja.db.elephantsql.com:5432/wkcflwln
SECRET=H`G]%hlR5Tbnkp]^PkRM^KcG7>O'-yUZ,TW]1v7t?7N1.*R)laDFE`#v"4VqG[z
```

3- Install ``nodemon``
```
npm install -g nodemon
```

4- Start the back-end server using ``nodemon ``
```
nodemon start
```