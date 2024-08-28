<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            @if($sensors->isEmpty())
                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div class="max-w-xl">
                        <p class="text-sm text-gray-600">
                            No sensors available.
                        </p>
                    </div>
                </div>
            @else
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    @foreach($sensors as $sensor)
                        <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div class="max-w-xl">
                                <h3 class="text-lg font-medium {{ $sensor->reachable ? 'text-gray-900' : 'text-red-500' }}">
                                    {{ $sensor->name }} ({{ $sensor->mac }})
                                </h3>

                                @if($sensor->data->isNotEmpty())
                                    <!-- Chart canvas -->
                                    <div class="mt-4">
                                      <canvas class="chart" id="chart_{{ $sensor->id }}" 
                                              data-chartdata="{{ $sensor->data->toJson() }}"></canvas>
                                    </div>
                                    @php
                                        $latestData = $sensor->data->last();
                                    @endphp
                                    <div class="mt-4 flex space-x-4">
                                      <div class="flex-1">
                                          <p class="text-sm text-gray-600">
                                              <strong>Battery:</strong> {{ $latestData->battery }}%
                                          </p>
                                      </div>
                                      <div class="flex-1">
                                          <p class="text-sm text-gray-600">
                                              <strong>Temp:</strong> {{ $latestData->temperature }}°C
                                          </p>
                                      </div>
                                      <div class="flex-1">
                                          <p class="text-sm text-gray-600">
                                              <strong>Humidity:</strong> {{ $latestData->humidity }}%
                                          </p>
                                      </div>
                                  </div>
                                @else
                                    <p class="mt-4 text-sm text-gray-600">
                                        No data available for this sensor.
                                    </p>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
    
    <!-- Include Chart.js library -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        for(chart of document.getElementsByClassName("chart")) {
          const data = JSON.parse(chart.dataset.chartdata);
          const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear().toString().slice(-2);
            const hours = date.getHours();
            const minutes = ('0' + date.getMinutes()).slice(-2);
            return `${day}.${month}.${year}: ${hours}.${minutes}`;
          }
          new Chart(chart, { type: 'line', data: {
                labels: data.map(x => formatDate(x.created_at)),
                datasets: [ { label: 'Temp °C', data: data.map(x => x.temperature) },
                  { label: 'Humidity %', data: data.map(x => x.humidity) }
                ]
              }
            }
          );
        }
    </script>
</x-app-layout>
