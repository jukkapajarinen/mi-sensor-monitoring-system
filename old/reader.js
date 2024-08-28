import { createBluetooth } from "node-ble";
import SensorModel from "./models/SensorModel.js";
import SampleModel from "./models/SampleModel.js";

async function main() {
  console.log("::: BLE reading started.", new Date().toUTCString());

  const sensors = new SensorModel();
  const samples = new SampleModel();
  const savedSensors = (await sensors.readAll()).sort(() => Math.random() - 0.5);
  const { bluetooth, destroy } = createBluetooth();
  const adapter = await bluetooth.defaultAdapter();

  console.log("List of BLE Devices:", savedSensors.map(x => x.mac));

  for (const sensor of savedSensors) {
    try {
      if (!(await adapter.isDiscovering())) {
        await adapter.startDiscovery();
      }

      console.log("Connecting to:", sensor.mac);
      const device = await adapter.waitDevice(sensor.mac, 5 * 1000);
      await device.connect();
      const gattServer = await device.gatt();

      console.log("Connected to:", await device.toString());

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

      console.log(`* Battery %: ${battery}`);
      console.log(`* Temperature °C: ${temperature}`);
      console.log(`* Humidity %: ${humidity}`);

      samples.create(sensor.id, battery, temperature, humidity);
      sensors.update(sensor.id, sensor.name, sensor.mac, true)

      await device.disconnect();
    } catch (error) {
      if (error.message === 'operation timed out') {
        console.log("Connecting timeout:", sensor.mac);
        sensors.update(sensor.id, sensor.name, sensor.mac, false)
      } else {
        console.error(error);
      }
    }
  }
  destroy();
  console.log("Processed everything. Redo in 30 seconds.");
  setTimeout(main, 30 * 1000);
}

main();