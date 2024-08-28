<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  public function index()
  {
      $sensors = Sensor::with('data')->get();
      return view('dashboard', compact('sensors'));
  }
}
