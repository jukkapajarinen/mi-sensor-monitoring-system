# Mi Sensor Monitoring System

Xiaomi Mi Temperature and Humidity sensor monitoring system.

## Environment variables

Create an `.env` file with following variables.

```
MARIADB_PASSWORD=<your-value-here>
MARIADB_ROOT_PASSWORD=<your-value-here>
MARIADB_USER=<your-value-here>
MARIADB_DATABASE=<your-value-here>
MARIADB_LOCAL_PORT=3307
MARIADB_DOCKER_PORT=3306
NODE_LOCAL_PORT=3000
NODE_DOCKER_PORT=8080
MARIADB_HOST=mariadb
```

## Build and start docker containers

```
docker-compose up --build
```

Shortly, app will be served in `localhost:3000`.

## Author

- [Jukka Pajarinen](https://www.jukkapajarinen.com)

## [License](LICENSE.md)

Copyright (c) 2023 Jukka Pajarinen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.