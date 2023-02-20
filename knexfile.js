import dotenv from "dotenv";

dotenv.config();

const config = {
  client: "mysql",
  connection: {
    database: process.env.MARIADB_DATABASE,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_DOCKER_PORT
  },
  migrations: {
    directory: `./migrations`,
  },
  seeds: {
    directory: `./seeds`,
  },
};

export default config;
