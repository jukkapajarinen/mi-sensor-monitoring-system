<?php

function parseValue($output) {
    // Parse the output to extract the value part
    if (preg_match('/value: (.*)/', $output, $matches)) {
        $hexValues = explode(' ', $matches[1]);
        return array_map('hexdec', $hexValues); // Convert hex values to decimal
    }
    return null;
}

function readUInt8($value) {
    // Convert the first byte into an unsigned 8-bit integer
    return $value[0];
}

function readInt16LE($values) {
    // Combine two bytes (little-endian) into a signed 16-bit integer
    $binData = pack('C*', $values[0], $values[1]);
    $data = unpack('s', $binData); // 's' for signed 16-bit (little-endian)
    return $data[1];
}

function main() {
    echo "::: BLE reading started. " . gmdate("Y-m-d\TH:i:s\Z") . "\n";

    // Simulate sensor data retrieval
    $sensors = [
      ['id' => 1, 'name' => 'Sensor 1', 'mac' => '00:00:00:00:00:00'],
      ['id' => 2, 'name' => 'Sensor 2', 'mac' => '11:11:11:11:11:11'],
        // Add more sensors as needed
    ];

    foreach ($sensors as $sensor) {
        try {
            echo "Connecting to: " . $sensor['mac'] . "\n";

            // Example characteristic UUIDs
            $batteryUuid = "00002a19-0000-1000-8000-00805f9b34fb";
            $temperatureUuid = "00002a1f-0000-1000-8000-00805f9b34fb";
            $humidityUuid = "00002a6f-0000-1000-8000-00805f9b34fb";

            // Read characteristics using shell_exec directly
            $batteryOutput = shell_exec("gatttool -b {$sensor['mac']} --char-read --uuid=$batteryUuid");
            $batteryValues = parseValue($batteryOutput);

            $temperatureOutput = shell_exec("gatttool -b {$sensor['mac']} --char-read --uuid=$temperatureUuid");
            $temperatureValues = parseValue($temperatureOutput);

            $humidityOutput = shell_exec("gatttool -b {$sensor['mac']} --char-read --uuid=$humidityUuid");
            $humidityValues = parseValue($humidityOutput);

            if ($batteryValues) {
                $battery = readUInt8($batteryValues);
                echo "* Battery %: $battery\n";
            }

            if ($temperatureValues) {
                $temperature = readInt16LE($temperatureValues) / 10; // Divide by 10 for actual temperature
                echo "* Temperature °C: $temperature\n";
            }

            if ($humidityValues) {
                $humidity = readInt16LE($humidityValues) / 100; // Divide by 100 for actual humidity
                echo "* Humidity %: $humidity\n";
            }

            // Simulate saving to the database
            // $samples->create($sensor['id'], $battery, $temperature, $humidity);
            // $sensors->update($sensor['id'], $sensor['name'], $sensor['mac'], true);

        } catch (Exception $e) {
            echo "Error connecting to: " . $sensor['mac'] . "\n";
            echo $e->getMessage() . "\n";
            // $sensors->update($sensor['id'], $sensor['name'], $sensor['mac'], false);
        }
    }

    echo "Processed everything. Redo in 30 seconds.\n";
    sleep(30);
    main();
}

main();

?>
