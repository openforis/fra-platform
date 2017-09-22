#!/bin/bash

set -e

USAGE="USAGE:\nadd-user.sh -l <LOGIN EMAIL> -n \"<USER'S NAME>\" -c <COUNTRY ISO> -r <ROLE> [-e <OTHER EMAIL>] [-c <COUNTRY ISO> -r <ROLE>...]\n"

COUNTRIES=()
ROLES=()

while getopts ":l::c::r::n::e:" opt; do
  case $opt in
    l)
        LOGIN_EMAIL="$OPTARG"
        ;;
    n)
        USERS_NAME="$OPTARG"
        ;;
    c)
        COUNTRIES+=("$OPTARG")
        ;;
    r)
        ROLES+=("$OPTARG")
        ;;
    e)
        OTHER_EMAIL="$OPTARG"
        ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

COUNTRY_AMOUNT="${#COUNTRIES[@]}"
ROLE_AMOUNT="${#ROLES[@]}"

if (( ROLE_AMOUNT != COUNTRY_AMOUNT )); then
    echo "You should give the same amount of roles and countries"
    echo "Instead you gave $COUNTRY_AMOUNT countries and $ROLE_AMOUNT roles"
    exit 1
fi

if (( COUNTRY_AMOUNT < 1 )); then
    printf "$USAGE"
    exit 1
fi

if [ -z "$LOGIN_EMAIL" ]; then
    printf "$USAGE"
    exit 1
fi

if [ -z "$USERS_NAME" ]; then
    printf "$USAGE"
    exit 1
fi

if [ -z "$OTHER_EMAIL" ]; then
    OTHER_EMAIL="$LOGIN_EMAIL"
fi

for ROLE in "${ROLES[@]}"
do
    case "$ROLE" in
        COLLABORATOR|NATIONAL_CORRESPONDENT|REVIEWER)
            ;;
        *)
            echo "Not a valid role $ROLE"
            exit 1
            ;;
    esac
done

MIGRATION_NAME="${LOGIN_EMAIL//@}"

echo "User $FRA_USER Country ${COUNTRIES[@]}"
echo "$MIGRATION_NAME"

MIGRATION_SQL_FILE=`yarn run create-migration "add-user-$MIGRATION_NAME" | grep -Eo "(server.*up.sql)"`

echo "Adding user $LOGIN_EMAIL to Migration file $MIGRATION_SQL_FILE"

cat << EOF > "$MIGRATION_SQL_FILE"
INSERT INTO fra_user (email, name, login_email, lang)
VALUES ('$OTHER_EMAIL', '$USERS_NAME', '$LOGIN_EMAIL', 'en');

EOF

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

I=0
for COUNTRY in "${COUNTRIES[@]}"
do
    set +e
    cat "$DIR/../node_modules/i18n-iso-countries/codes.json" | grep "\"$COUNTRY\""
    if [[ $? != 0 ]]; then
        echo "ERROR: $COUNTRY is not a valid ISO 3166-1 alpha-3 code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3"
        exit 1
    fi
    set -e

    ROLE=`echo ${ROLES[$I]}`
    echo "Adding role $ROLE for country $COUNTRY"
    cat << EOF >> "$MIGRATION_SQL_FILE"
INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), '$COUNTRY', '$ROLE');

EOF
    I=$((I+1))
done

echo "These are your new migration files:"
git status | grep migrations
echo "Review them, if ok, commit and push"

