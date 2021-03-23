const Pool = require("pg").Pool;

const pool = new Pool({
    user : "joshuakalejaiye@joshuakalejaiyedb",
    password : "Breadsticks1",
    host: "joshuakalejaiyedb.postgres.database.azure.com",
    port: 5432,
    database: "kiosk_db"
});

module.exports = pool;

// Database={your_database};
// Data Source=joshuakalejaiyedb.postgres.database.azure.com;
// User Id=joshuakalejaiye@joshuakalejayedb;
// Password={your_password}i