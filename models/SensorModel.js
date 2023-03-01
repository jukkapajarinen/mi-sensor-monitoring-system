import knex from "knex";
import knexfile from "../knexfile.js";

class SensorModel {
  constructor() {
    this.db = knex(knexfile);
  }

  async create(deviceName, macAddress) {
    if ([deviceName, macAddress].some(undefined)) {
      throw new Error("Cannot create sensor with undefined value(s).");
    }
    return await this.db.insert({'name': deviceName, 'mac': macAddress}).into('sensors');
  }

  async read(deviceName, macAddress) {
    if ([deviceName, macAddress].some(undefined)) {
      throw new Error("Cannot read sensor with undefined value(s).");
    }
    return await this.db.select().from('sensors').where('name', deviceName).andWhere('mac', macAddress).limit(1);
  }

  async readById(id) {
    if ([id].some(undefined)) {
      throw new Error("Cannot read sensor with undefined value.");
    }
    return await this.db.select().from('sensors').where('id', id).limit(1);
  }

  async readAll() {
    return await this.db.select().from('sensors');
  }

  async update(id, deviceName, macAddress) {
    if ([id, deviceName, macAddress].some(undefined)) {
      throw new Error("Cannot update sensor with undefined value(s).");
    }
    return await this.db.update({'name': deviceName, 'mac': macAddress}).where('id', id);
  }

  async delete(id) {
    if ([id].some(undefined)) {
      throw new Error("Cannot delete sensor with undefined value.");
    }
    return await this.db.del().from('sensors').where('id', id);
  }
}

export default SensorModel;