const {createBluetooth} = require('node-ble');

async function main() {
  const {bluetooth, destroy} = createBluetooth();
  const adapter = await bluetooth.defaultAdapter();

  console.log("adapter", await adapter.getName());

  if (! await adapter.isDiscovering()) {
    await adapter.startDiscovery();

    // setInterval(async () => {
    //   console.log("devices", await adapter.devices());
    // },1000);

    const device = await adapter.waitDevice('A4:C1:38:55:3C:7B')
    await device.connect()
    const gattServer = await device.gatt()

    console.log("device", await device.toString());
    console.log("services", await gattServer.services());

    (await gattServer.services()).forEach(async s => {
      let service = await gattServer.getPrimaryService(s)
      console.log("service:", s, "characterics:", await service.characteristics());
      (await service.characteristics()).forEach(async c => {
        let characteric = await service.getCharacteristic(c)
        console.log("service:", s, "characterics:", c, "value:", await characteric.readValue());
      });
    });

  }
}

main();