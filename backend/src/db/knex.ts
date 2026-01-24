import knexLib from "knex";
import knexConfig from "../../knexfile.js";

const env = process.env.NODE_ENV || "development";
export const knex = knexLib(knexConfig[env]!);

export default knex; 