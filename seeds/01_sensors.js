/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('sensors').del()
  await knex('sensors').insert([
    {id: 1, name: 'TESTI_1', mac: 'A4:C1:38:E0:0A:51'},
    {id: 2, name: 'TESTI_2', mac: 'A4:C1:38:E9:49:32'}
  ]);
}
