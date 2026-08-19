<?php

namespace App\Http\Controllers;

use App\Models\Sensor;

class DashboardController
{
  public function index()
  {
      $sensors = Sensor::with('data')->get();
      return view('dashboard', compact('sensors'));
  }
}
