#!/bin/bash

cmd="$@"

until psql -h "journal-postgres" -U "postgres" -d journaldb -c '\l'  > /dev/null; do
>&2 echo "Postgres is unavailable - waiting"
sleep 1
done
>&2 echo "Postgres is up - start journal service"



exec $cmd