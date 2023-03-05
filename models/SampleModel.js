import knex from "knex";
import knexfile from "../knexfile.js";

class SampleModel {
  constructor() {
    this.db = knex(knexfile);
  }

  async create(sensorId, battery, temperature, humidity) {
    if ([sensorId, battery, temperature, humidity].includes(undefined)) {
      throw new Error("Cannot create sample with undefined value(s).");
    }

    return await this.db
      .insert({
        sensor_id: sensorId,
        battery: battery,
        temperature: temperature,
        humidity: humidity,
      })
      .into("samples");
  }

  async read(sensorId) {
    if ([sensorId].includes(undefined)) {
      throw new Error("Cannot read sample with undefined value.");
    }

    return await this.db.select().from("samples").where("sensor_id", sensorId);
  }

  async readById(id) {
    if ([id].includes(undefined)) {
      throw new Error("Cannot read sample with undefined value.");
    }

    return await this.db.select().from("samples").where("id", id).limit(1);
  }

  async readAll() {
    return await this.db.select().from("samples");
  }

  async update(id, battery, temperature, humidity) {
    if ([id, battery, temperature, humidity].includes(undefined)) {
      throw new Error("Cannot update sample with undefined value(s).");
    }

    return await this.db
      .table("samples")
      .update({
        battery: battery,
        temperature: temperature,
        humidity: humidity,
      })
      .where("id", id);
  }

  async delete(id) {
    if ([id].includes(undefined)) {
      throw new Error("Cannot delete sample with undefined value.");
    }

    return await this.db.del().from("samples").where("id", id);
  }
}

export default SampleModel;
