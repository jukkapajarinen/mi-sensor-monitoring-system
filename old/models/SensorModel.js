import knex from "knex";
import knexfile from "../knexfile.js";

class SensorModel {
  constructor() {
    this.db = knex(knexfile);
  }

  async create(deviceName, macAddress, reachable) {
    if ([deviceName, macAddress, reachable].includes(undefined)) {
      throw new Error("Cannot create sensor with undefined value(s).");
    }
    return await this.db
      .insert({ name: deviceName, mac: macAddress, reachable: reachable })
      .into("sensors");
  }

  async read(deviceName, macAddress, reachable) {
    if ([deviceName, macAddress].includes(undefined)) {
      throw new Error("Cannot read sensor with undefined value(s).");
    }
    return await this.db
      .select()
      .from("sensors")
      .where("name", deviceName)
      .andWhere("mac", macAddress)
      .andWhere("reachable", reachable)
      .limit(1);
  }

  async readById(id) {
    if ([id].includes(undefined)) {
      throw new Error("Cannot read sensor with undefined value.");
    }
    return await this.db.select().from("sensors").where("id", id).limit(1);
  }

  async readAll() {
    return await this.db.select().from("sensors");
  }

  async update(id, deviceName, macAddress, reachable) {
    if ([id, deviceName, macAddress, reachable].includes(undefined)) {
      throw new Error("Cannot update sensor with undefined value(s).");
    }
    return await this.db
      .table("sensors")
      .update({ name: deviceName, mac: macAddress, reachable: reachable })
      .where("id", id);
  }

  async delete(id) {
    if ([id].includes(undefined)) {
      throw new Error("Cannot delete sensor with undefined value.");
    }
    return await this.db.del().from("sensors").where("id", id);
  }
}

export default SensorModel;
