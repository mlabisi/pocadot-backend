'use strict';

const { SQLDataSource } = require("datasource-sql");

class Database extends SQLDataSource {
    getUsers() {
        return this.knex
            .select("*")
            .from("users")
            .where({})
            .cache();
    }
}

module.exports = Database;
