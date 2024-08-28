<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use Illuminate\Http\Request;

class SensorController extends Controller
{
    /**
     * Display the list of Sensors.
     */
    public function list()
    {
        $sensors = Sensor::with('data')->get();
        return view('sensors.list', compact('sensors'));
    }

    /**
     * Display the form to create a new sensor.
     */
    public function create()
    {
        return view('sensors.create');
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
     * Display the form to edit an existing sensor.
     */
    public function edit(Sensor $sensor)
    {
        return view('sensors.edit', compact('sensor'));
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
