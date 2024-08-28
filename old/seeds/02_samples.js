/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('samples').del()
  await knex('samples').insert([
    {id: 1, sensor_id: 1, battery: '100', temperature: '21.1', humidity: '23'},
    {id: 2, sensor_id: 1, battery: '99', temperature: '21.2', humidity: '20'},
    {id: 3, sensor_id: 1, battery: '98', temperature: '19.0', humidity: '24'},
    {id: 4, sensor_id: 2, battery: '84', temperature: '20.8', humidity: '18'},
    {id: 5, sensor_id: 2, battery: '83', temperature: '20.7', humidity: '19'}
  ]);
}
