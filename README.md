UI interface to seisma test analytic server
===========================================


Build image
-----------

```bash
make build
```

Publish image
-------------

```bash
export REGISTRY_LOGIN=<login>
export REGISTRY_PASSWORD=<password>

make publish
```

Container environments
----------------------

* **API_HOST** - api server host
* **WORKER_PROCESSES** - nginx worker processes
* **WORKER_CONNECTIONS** - nginx worker connections
