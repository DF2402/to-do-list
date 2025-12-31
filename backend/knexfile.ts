import type { Knex } from "knex";
import * as dotenv from "dotenv";
dotenv.config();
// Update with your config settings.

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
      user:"admin",
      password:"admin"
    },
    useNullAsDefault:true,
    migrations:{
      tableName:"knex_migrations",
      directory:"./src/db/migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "admin",
      password: "admin"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/db/migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "admin",
      password: "admin"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/db/migrations"
    }
  }

};

export default config;
