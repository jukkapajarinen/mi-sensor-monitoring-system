import knex from "knex";

class SensorModel {
  static create(deviceName, macAddress) {
    if ([deviceName, macAddress].some(undefined)) {
      throw new Error("Cannot create sensor with undefined value(s).");
    }
    return knex.insert({'name': deviceName, 'mac': macAddress}).into('sensors');
  }

  static read(deviceName, macAddress) {
    if ([deviceName, macAddress].some(undefined)) {
      throw new Error("Cannot read sensor with undefined value(s).");
    }
    return knex.select().from('sensors').where('name', deviceName).andWhere('mac', macAddress).limit(1);
  }

  static readById(id) {
    if ([id].some(undefined)) {
      throw new Error("Cannot read sensor with undefined value.");
    }
    return knex.select().from('sensors').where('id', id).limit(1);
  }

  static readAll() {
    return knex.select().from('sensors');
  }

  static update(id, deviceName, macAddress) {
    if ([id, deviceName, macAddress].some(undefined)) {
      throw new Error("Cannot update sensor with undefined value(s).");
    }
    return knex.update({'name': deviceName, 'mac': macAddress}).where('id', id);
  }

  static delete(id) {
    if ([id].some(undefined)) {
      throw new Error("Cannot delete sensor with undefined value.");
    }
    return knex.del().from('sensors').where('id', id);
  }
}

export default SensorModel;