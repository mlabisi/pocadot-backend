"use strict";

const { SQLDataSource } = require("datasource-sql");

class Database extends SQLDataSource {
  getUsers() {
    return this.db.select("*").from("users");
  }

  getUsersById(ids) {
    return this.db.select("*").from("users").whereIn('id', ids);
  }

  getUsersByIdolsListed(listingIdolsContain) {
    const owners = this.knex.select("ownerId").from("listings").whereIn("idolId", listingIdolsContain);
    return this.knex.select("*").from("users").whereIn("id", owners);
  }

  getIdols() {
    return this.db.select("*").from("idols");
  }

  getIdolsById(ids) {
    return this.db.select("*").from("idols").whereIn("id", ids);
  }

  getGroups() {
    return this.db.select("*").from("groups");
  }

  getGroupsById(ids) {
    return this.db.select("*").from("groups").whereIn("id", ids);
  }

  getListings() {
    return this.db.select("*").from("listings");
  }

  getListingsById(ids) {
    return this.db.select("*").from("listings").whereIn("id", ids);
  }

  getCollections() {
    return this.db.select("*").from("collections");
  }

  getCollectionsById(ids) {
    return this.db.select("*").from("collections").whereIn("id", ids);
  }
}

module.exports = Database;
