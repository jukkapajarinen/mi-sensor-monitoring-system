@extends('layouts.app')

@section('header')
    <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        {{ __('Profile') }}
    </h2>
@endsection

@section('content')
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div class="max-w-xl">
                    <section>
                        <header>
                            <h2 class="text-lg font-medium text-gray-900">
                                {{ __('Update Password') }}
                            </h2>

                            <p class="mt-1 text-sm text-gray-600">
                                {{ __('Ensure your account is using a long, random password to stay secure.') }}
                            </p>
                        </header>

                        <form method="post" action="{{ route('password.update') }}" class="mt-6 space-y-6">
                            @csrf
                            @method('put')

                            <div>
                                <label for="update_password_current_password" class="block font-medium text-sm text-gray-700">{{ __('Current Password') }}</label>
                                <input id="update_password_current_password" name="current_password" type="password" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" autocomplete="current-password">
                                @if ($errors->updatePassword->has('current_password'))
                                    <ul class="text-sm text-red-600 space-y-1 mt-2">
                                        @foreach ($errors->updatePassword->get('current_password') as $message)
                                            <li>{{ $message }}</li>
                                        @endforeach
                                    </ul>
                                @endif
                            </div>

                            <div>
                                <label for="update_password_password" class="block font-medium text-sm text-gray-700">{{ __('New Password') }}</label>
                                <input id="update_password_password" name="password" type="password" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" autocomplete="new-password">
                                @if ($errors->updatePassword->has('password'))
                                    <ul class="text-sm text-red-600 space-y-1 mt-2">
                                        @foreach ($errors->updatePassword->get('password') as $message)
                                            <li>{{ $message }}</li>
                                        @endforeach
                                    </ul>
                                @endif
                            </div>

                            <div>
                                <label for="update_password_password_confirmation" class="block font-medium text-sm text-gray-700">{{ __('Confirm Password') }}</label>
                                <input id="update_password_password_confirmation" name="password_confirmation" type="password" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" autocomplete="new-password">
                                @if ($errors->updatePassword->has('password_confirmation'))
                                    <ul class="text-sm text-red-600 space-y-1 mt-2">
                                        @foreach ($errors->updatePassword->get('password_confirmation') as $message)
                                            <li>{{ $message }}</li>
                                        @endforeach
                                    </ul>
                                @endif
                            </div>

                            <div class="flex items-center gap-4">
                                <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">{{ __('Save') }}</button>

                                @if (session('status') === 'password-updated')
                                    <p class="text-sm text-gray-600">{{ __('Saved.') }}</p>
                                @endif
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </div>
@endsection
