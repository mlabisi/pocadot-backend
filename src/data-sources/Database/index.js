"use strict";

const { SQLDataSource } = require("datasource-sql");

class Database extends SQLDataSource {
  getUsers() {
    return this.knex.select("*").from("users");
  }

  getUsersById(ids) {
    return this.knex.select("*").from("users").whereIn('id', ids);
  }

  getUsersByUsername(usernameContains) {
    return this.knex.select("*").from("users").whereILike('username', `%${usernameContains}%`);
  }

  getUsersByIdolsListed(listingIdolsContain) {
    const targetOwners = this.knex.select("ownerId").from("listings").whereIn("idolId", listingIdolsContain);
    return this.knex.select("*").from("users").whereIn("userId", targetOwners);
  }

  getUsersByCountry(country) {
    return this.knex.select("*").from("users").where("country", country);
  }
}

module.exports = Database;
