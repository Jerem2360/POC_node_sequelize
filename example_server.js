import { createServer } from 'node:http';
import { Sequelize, DataTypes } from 'sequelize';
import { readFileSync } from 'fs'


function db_connect(session, uri) {
    var sessions = JSON.parse(readFileSync('login.json', {encoding: 'utf-8'}));
    var password = sessions[session];
    var username = session;

    var uri = `mysql:${username}@${uri}`;

    var result = new Sequelize(uri, {
        password: password,
        database: 'capstone_project_2025_1'
    });
    result.authenticate();
    return result;
}

function find_user(name) {
    return User.findAll({
        where: {
            'name': name
        },
        include: [
            {
                model: PhoneNumber,
                required: true
            }
        ]
    }
    ).then(users => users[0]);
}


const sequelize = db_connect('root', '127.0.0.1:3307');

const PhoneNumber = sequelize.define('phone_numbers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    country_code: DataTypes.INTEGER,
    digits: DataTypes.STRING(16)
}, {
    timestamps: false
});


const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    phone_id: {
        type: DataTypes.INTEGER,
        references: 'phone_numbers',
        referencesKey: 'id'
    }
}, {
    timestamps: false
});


PhoneNumber.hasOne(User, {foreignKey: "phone_id"});
User.belongsTo(PhoneNumber, { foreignKey: 'phone_id' });



const server = createServer((req, res) => {
    let body_str = '';
    req.on('data', chunk => body_str += chunk);

    req.on('end', () => {
        let body = JSON.parse(body_str);
        let needed_user = body['user'];
        
        console.log(`Received client request for user '${needed_user}'.`);

        find_user(needed_user).then((user) => {
            console.log("User found:");
            console.log(JSON.stringify(user));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'phone_number': user.phone_number
            }));
        });

    })
});

const hostname = '127.0.0.1';
const port = 3001;

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

