const noble = require('@abandonware/noble');

noble.on('stateChange', state => {
  console.log("stateChange", state);
  if (state === 'poweredOn') {
    noble.startScanning([], true, async err => console.log(err));
  }
});

noble.on('scanStart', () => {
  console.log('scanStart');
});

noble.on('discover', peripheral => {
  console.log("discover", peripheral);
  noble.stopScanning();
});

noble.on('scanStop', () => {
  console.log('scanStop');
});
