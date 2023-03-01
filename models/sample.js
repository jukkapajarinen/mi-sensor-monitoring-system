import knex from "knex";

class SampleModel {
  static create(sensorId, battery, temperature, humidity) {
    if ([sensorId, battery, temperature, humidity].some(undefined)) {
      throw new Error("Cannot create sample with undefined value(s).");
    }
    return knex.insert({'sensorId': sensorId, 'battery': battery, 'temperature': temperature, 'humidity': humidity}).into('samples');
  }

  static read(sensorId) {
    if ([sensorId].some(undefined)) {
      throw new Error("Cannot read sample with undefined value.");
    }
    return knex.select().from('samples').where('sensorId', sensorId);
  }

  static readById(id) {
    if ([id].some(undefined)) {
      throw new Error("Cannot read sample with undefined value.");
    }
    return knex.select().from('samples').where('id', id).limit(1);
  }

  static readAll() {
    return knex.select().from('samples');
  }

  static update(id, battery, temperature, humidity) {
    if ([id, battery, temperature, humidity].some(undefined)) {
      throw new Error("Cannot update sample with undefined value(s).");
    }
    return knex.update({'battery': battery, 'temperature': temperature, 'humidity': humidity}).where('id', id);
  }

  static delete(id) {
    if ([id].some(undefined)) {
      throw new Error("Cannot delete sample with undefined value.");
    }
    return knex.del().from('samples').where('id', id);
  }
}

export default SampleModel;