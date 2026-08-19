@extends('layouts.app')

@section('title', 'Sensors')

@section('content')
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

            @if (session('success'))
                <div class="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
                    {{ session('success') }}
                </div>
            @endif

            <div class="bg-white rounded-xl shadow-sm ring-1 ring-gray-900 ring-opacity-5 p-6">
                <h3 class="text-lg font-semibold text-gray-900">
                    {{ $editingSensor ? __('Edit Sensor') : __('Add Sensor') }}
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                    {{ $editingSensor ? __('Update the name or MAC address for this sensor.') : __('Register a new BLE sensor by its MAC address.') }}
                </p>

                <form method="POST" action="{{ $editingSensor ? route('sensors.update', $editingSensor) : route('sensors.store') }}" class="mt-6 max-w-md space-y-5">
                    @csrf
                    @if ($editingSensor)
                        @method('PATCH')
                    @endif

                    <div>
                        <label for="name" class="block font-medium text-sm text-gray-700">Name</label>
                        <input type="text" name="name" id="name" class="mt-1 block w-full appearance-none border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 rounded-md shadow-sm" value="{{ old('name', $editingSensor->name ?? '') }}" required>
                        @error('name')
                            <p class="text-sm text-red-600 mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="mac" class="block font-medium text-sm text-gray-700">MAC Address</label>
                        <input type="text" name="mac" id="mac" class="mt-1 block w-full appearance-none border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 rounded-md shadow-sm font-mono" value="{{ old('mac', $editingSensor->mac ?? '') }}" required>
                        @error('mac')
                            <p class="text-sm text-red-600 mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="flex items-center gap-3 pt-2">
                        <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            {{ $editingSensor ? __('Update Sensor') : __('Add Sensor') }}
                        </button>
                        @if ($editingSensor)
                            <a href="{{ route('sensors.list') }}" class="text-sm font-medium text-gray-500 hover:text-gray-700">
                                {{ __('Cancel') }}
                            </a>
                        @endif
                    </div>
                </form>
            </div>

            <div class="bg-white rounded-xl shadow-sm ring-1 ring-gray-900 ring-opacity-5 overflow-hidden">
                <table class="min-w-full divide-y divide-gray-100">
                    <thead>
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MAC Address</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        @forelse($sensors as $sensor)
                            <tr class="{{ $editingSensor?->is($sensor) ? 'bg-indigo-50' : 'hover:bg-gray-50' }}">
                                <td class="px-6 py-3 text-sm font-medium text-gray-900">{{ $sensor->name }}</td>
                                <td class="px-6 py-3 text-sm text-gray-500 font-mono">{{ $sensor->mac }}</td>
                                <td class="px-6 py-3 text-sm">
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium {{ $sensor->reachable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' }}">
                                        <span class="w-1.5 h-1.5 rounded-full {{ $sensor->reachable ? 'bg-green-500' : 'bg-red-500' }}"></span>
                                        {{ $sensor->reachable ? 'Online' : 'Offline' }}
                                    </span>
                                </td>
                                <td class="px-6 py-3 text-sm text-right">
                                    <a href="{{ route('sensors.edit', $sensor) }}" class="font-medium text-indigo-600 hover:text-indigo-800">Edit</a>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4" class="px-6 py-8 text-center text-sm text-gray-500">No sensors found.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
