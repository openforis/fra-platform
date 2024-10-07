#!/bin/bash

docker cp ~/Downloads/backup fra-db:/backup
docker exec -i fra-db /bin/bash < ./_pgRestore.sh
