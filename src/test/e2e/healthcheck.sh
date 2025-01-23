#! /bin/bash

result=$(psql -U fra -d fra -t -A -c "SELECT count(*) FROM users WHERE email = 'test@test.com'")
exit $(( result == 1 ? 0 : 1 ))
