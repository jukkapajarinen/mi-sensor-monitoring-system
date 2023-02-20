/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up({ schema, fn }) {
  return schema
    .createTable("sensors", (table) => {
      table.primary('id').increments().notNullable();
      table.string("name").notNullable();
      table.string("mac").notNullable();
      table.timestamp("created_at").notNullable().defaultTo(fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(fn.now());
    })
    .createTable("samples", (table) => {
      table.primary('id').increments().notNullable();
      table.integer("battery").notNullable();
      table.float("temperature").notNullable();
      table.float("humidity").notNullable();
      table.timestamp("created_at").notNullable().defaultTo(fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(fn.now());
      table.integer("sensor_id").unsigned().notNullable().references("sensors.id").onUpdate('cascade').onDelete('cascade');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down({ schema }) {
  return schema.dropTable("samples").dropTable("sensors");
}
