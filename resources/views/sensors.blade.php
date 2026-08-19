@extends('layouts.app')

@section('header')
    <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        {{ __('Sensors') }}
    </h2>
@endsection

@section('content')
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

            @if (session('success'))
                <div class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                    {{ session('success') }}
                </div>
            @endif

            <div class="bg-white shadow sm:rounded-lg p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">
                    {{ $editingSensor ? __('Edit Sensor') : __('Add Sensor') }}
                </h3>

                <form method="POST" action="{{ $editingSensor ? route('sensors.update', $editingSensor) : route('sensors.store') }}">
                    @csrf
                    @if ($editingSensor)
                        @method('PATCH')
                    @endif

                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" id="name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value="{{ old('name', $editingSensor->name ?? '') }}" required>
                        @error('name')
                            <span class="text-red-500 text-sm">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="mb-4">
                        <label for="mac" class="block text-sm font-medium text-gray-700">MAC Address</label>
                        <input type="text" name="mac" id="mac" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" value="{{ old('mac', $editingSensor->mac ?? '') }}" required>
                        @error('mac')
                            <span class="text-red-500 text-sm">{{ $message }}</span>
                        @enderror
                    </div>

                    <div class="flex justify-end gap-3">
                        @if ($editingSensor)
                            <a href="{{ route('sensors.list') }}" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Cancel</a>
                        @endif
                        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg">
                            {{ $editingSensor ? __('Update Sensor') : __('Add Sensor') }}
                        </button>
                    </div>
                </form>
            </div>

            <div class="bg-white shadow sm:rounded-lg p-6">
                <table class="min-w-full bg-white divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MAC Address</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @forelse($sensors as $sensor)
                            <tr class="{{ $editingSensor?->is($sensor) ? 'bg-blue-50' : '' }}">
                                <td class="px-4 py-2 text-sm text-gray-900">{{ $sensor->name }}</td>
                                <td class="px-4 py-2 text-sm text-gray-900">{{ $sensor->mac }}</td>
                                <td class="px-4 py-2 text-sm">
                                    <a href="{{ route('sensors.edit', $sensor) }}" class="text-blue-600 hover:text-blue-900">Edit</a>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="3" class="px-4 py-2 text-center text-sm text-gray-500">No sensors found.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
