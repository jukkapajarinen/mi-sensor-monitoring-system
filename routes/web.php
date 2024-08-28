<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SensorController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
  return redirect('/dashboard'); // Redirect to your desired route
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
  Route::get('/sensors', [SensorController::class, 'list'])->name('sensors.list');
  Route::get('/sensors/create', [SensorController::class, 'create'])->name('sensors.create');
  Route::post('/sensors', [SensorController::class, 'store'])->name('sensors.store');
  Route::get('/sensors/{sensor}/edit', [SensorController::class, 'edit'])->name('sensors.edit');
  Route::patch('/sensors/{sensor}', [SensorController::class, 'update'])->name('sensors.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
