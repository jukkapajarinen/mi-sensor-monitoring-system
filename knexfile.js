import dotenv from "dotenv";

dotenv.config();

const config = {
  client: "sqlite3",
  connection: {
    filename: process.env.SQLITE_FILE_PATH,
  },
  migrations: {
    directory: `./migrations`,
  },
  seeds: {
    directory: `./seeds`,
  },
  useNullAsDefault: true,
};

export default config;
