<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use Illuminate\Http\Request;

class SensorController
{
    /**
     * Display the sensor list along with the add-sensor form.
     */
    public function list()
    {
        return view('sensors', [
            'sensors' => Sensor::with('data')->get(),
            'editingSensor' => null,
        ]);
    }

    /**
     * Store a newly created sensor in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'mac' => 'required|string|max:255|unique:sensors,mac',
        ]);

        Sensor::create($request->only('name', 'mac'));

        return redirect()->route('sensors.list')->with('success', 'Sensor added successfully.');
    }

    /**
     * Display the sensor list with the edit form for the given sensor.
     */
    public function edit(Sensor $sensor)
    {
        return view('sensors', [
            'sensors' => Sensor::with('data')->get(),
            'editingSensor' => $sensor,
        ]);
    }

    /**
     * Update an existing sensor in storage.
     */
    public function update(Request $request, Sensor $sensor)
    {
      $request->validate([
          'name' => 'required|string|max:255',
          'mac' => 'required|string|max:255|unique:sensors,mac,' . $sensor->id,
      ]);

      $sensor->update($request->only('name', 'mac'));

      return redirect()->route('sensors.list')->with('success', 'Sensor updated successfully.');
    }
}
