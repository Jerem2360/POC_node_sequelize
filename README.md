# POC_node_sequelize
Proof of concept nodejs server that interacts with a database using the sequelize library.


## Database setup

Create your database in your DBMS.

Then run `table_creation.sql` and `populate.sql` in the newly created database. Note that those queries are made for MySQL, so they might need tweaking for them to work.


## Database connection

Create a 'db_sessions.json' file with the following content:

```json
{
    "mySession": {
        "dialect": "mysql",
        "host": "127.0.0.1:3307",
        "username": "root",
        "password": "MyPassword",
        "database": "mydatabase"
    }
}
```
where:
- "mySession" is replaced by the name of the session
- "dialect" should be the name of the DBMS
- "host" should be the URI used to connect to the DBMS, possibly including the port.
- "username" should be the name of the user used to connect to the DBMS
- "pass"


## Running/testing the script

Make sure the dependencies in `package.json` are installed.

Run `node example_server.js`.

Then send an HTTP request to `127.0.0.1:3001` with the following body:
```json
{
  "user": "<name of the user>"
}
```

