#!/bin/bash

if [ -z "$1" ]
  then
    echo "Give the name of the migration step as parameter"
    exit 2
fi

. .env
_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
_DATE=$(date +%Y%m%d%H%M%S)
_FILENAME=$_DATE-step-$1.ts
_FILEPATH=$_DIR/steps/$_FILENAME

cp $_DIR/steps/template.ts $_FILEPATH

sed -i '' "s/#NAME#/$1/g" $_FILEPATH

echo "Created migration step $_FILEPATH"
