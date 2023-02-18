const {createBluetooth} = require('node-ble');

async function main() {
  const {bluetooth, destroy} = createBluetooth();
  const adapter = await bluetooth.defaultAdapter();

  console.log("BLE adapter:", await adapter.getName());

  if (! await adapter.isDiscovering()) {
    await adapter.startDiscovery();
    const device = await adapter.waitDevice('A4:C1:38:E0:0A:51');
    await device.connect();
    const gattServer = await device.gatt();

    console.log("BLE peripheral:", await device.toString());

    const batteryService = await gattServer.getPrimaryService("0000180f-0000-1000-8000-00805f9b34fb");
    const sensingService = await gattServer.getPrimaryService("0000181a-0000-1000-8000-00805f9b34fb");
    const batteryCharacteric = await batteryService.getCharacteristic("00002a19-0000-1000-8000-00805f9b34fb");
    const temperatureCharacteric = await sensingService.getCharacteristic("00002a1f-0000-1000-8000-00805f9b34fb");
    const humidityCharacteric = await sensingService.getCharacteristic("00002a6f-0000-1000-8000-00805f9b34fb");

    console.log("Battery:", await batteryCharacteric.readValue());
    console.log("Temperature:", await temperatureCharacteric.readValue());
    console.log("Humidity:", await humidityCharacteric.readValue());
  }
}

main();