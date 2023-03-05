import { createBluetooth } from "node-ble";
import SensorModel from "./models/SensorModel.js";

async function main() {
  console.log("BLE reading started.", new Date().toUTCString());

  const sensors = new SensorModel();
  const savedDevices = (await sensors.readAll()).map(x => x.mac);
  const { bluetooth, destroy } = createBluetooth();
  const adapter = await bluetooth.defaultAdapter();

  console.log("Saved BLE Devices:", savedDevices);

  for (const mac of savedDevices) {
    try {
      if (!(await adapter.isDiscovering())) {
        await adapter.startDiscovery();
      }

      console.log("Trying to connect to:", mac);
      const device = await adapter.waitDevice(mac);
      await device.connect();
      const gattServer = await device.gatt();

      console.log("Succesfully connected to:", await device.toString());

      // Uuids are checked for LYWSD03MMC with custom ATC firmware
      const batteryService = await gattServer.getPrimaryService(
        "0000180f-0000-1000-8000-00805f9b34fb"
      );
      const sensingService = await gattServer.getPrimaryService(
        "0000181a-0000-1000-8000-00805f9b34fb"
      );
      const batteryCharacteric = await batteryService.getCharacteristic(
        "00002a19-0000-1000-8000-00805f9b34fb"
      );
      const temperatureCharacteric = await sensingService.getCharacteristic(
        "00002a1f-0000-1000-8000-00805f9b34fb"
      );
      const humidityCharacteric = await sensingService.getCharacteristic(
        "00002a6f-0000-1000-8000-00805f9b34fb"
      );

      // Sensory values are advertised as little endian bytes
      const battery = (await batteryCharacteric.readValue()).readUInt8();
      const temperature =
        (await temperatureCharacteric.readValue()).readInt16LE() / 10;
      const humidity =
        (await humidityCharacteric.readValue()).readInt16LE() / 100;

      console.log(`Battery: ${battery}, temperature: ${temperature}, humidity: ${humidity}, ${new Date().toUTCString()}`);

      await device.disconnect();
    } catch (error) {
      console.error("Error happened.", error);
    }
  }
  destroy();
  console.log("Processed all BLE devices.");
}

main();
setInterval(main, 60 * 1000);
