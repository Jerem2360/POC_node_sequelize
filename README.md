# POC_node_sequelize
Proof of concept nodejs server that interacts with a database using the sequelize library.


## Database setup

Create your database in your DBMS.

Then run `table_creation.sql` and `populate.sql` in the newly created database. Note that those queries are made for MySQL, so they might need tweaking for them to work.


## Database connection

Create a 'db_sessions.json' file with the following content:

```json
{
    "mySession": {   // session name, used to select session in code
        "dialect": "mysql",  // can be any sql dialect (e.g. postgre, mongo, ...)
        "host": "127.0.0.1:3307",  // host for connection to DBMS
        "username": "root",  // DBMS user
        "password": "MyPassword",  // DBMS password
        "database": "mydatabase"  // database name
    }
}
```


## Running/testing the script

Make sure the dependencies in `package.json` are installed.

Run `node example_server.js`.

Then send an HTTP request to `127.0.0.1:3001` with the following body:
```json
{
  "user": "<name of the user>"
}
```

