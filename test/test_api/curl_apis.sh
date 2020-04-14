#! /bin/bash

# Usage:
# cat default_params | ./curl_apis.sh
# or ./curl_apis.sh and populate variables with default or custom values

# if bash4:
# declare -A urls=( ["prod"]="https://fra-platform.herokuapp.com/api" ["dev"]="https://dev-fra-platform.herokuapp.com/api" ["local"]="localhost:9001/api")
_local="localhost:9001"
_dev="https://dev-fra-platform.herokuapp.com"
_prod="https://fra-platform.herokuapp.com"

if [ $# -eq 0 ]; then
  base=$_local
elif [ $1 = "--verbose" ]; then
  base=$_local
  verbose=true
elif [ $1 = "local" ]; then
  base=$_local
elif [ $1 = "dev" ]; then
  base=$_dev
elif [ $1 = "prod" ]; then
  base=$_prod
fi

if [[ $2 = "--verbose" ]]; then
  verbose=true
fi

echo -e "Testing \033[00;35m${base}\033[0m:"

read -e -p "country iso? [X01]: " country_iso
country_iso=${country_iso:-X01}

read -e -p "section? [extentOfForest]: " section
section=${section:-extentOfForest}

read -e -p "name? [generalComments]: " name
name=${name:-generalComments}

read -e -p "table_spec_name? [forestAreaChange] <? for more>: " table_spec_name

while [[ $table_spec_name = "?" ]]; do

  echo -e "\n\033[00;35mHit Enter for default.\nPossible table_spec_names:\033[0m\n"

  cat <<EOF
  specificForestCategories,
  forestAreaChange,
  primaryDesignatedManagementObjective,
  areaAffectedByFire,
  areaAffectedByFirePrint1,
  areaAffectedByFirePrint2,
  growingStockComposition,
  holderOfManagementRights,
  nonWoodForestProductsRemovals,
  nonWoodForestProductsRemovalsCurrency,
  degradedForest,
  employment,
  employmentPrint1,
  employmentPrint2,
  graduationOfStudents,
  graduationOfStudentsPrint1,
  graduationOfStudentsPrint2,
  forestOwnership,
  forestAreaWithinProtectedAreas,
  totalAreaWithDesignatedManagementObjective,
  annualReforestation,
  disturbances,
  disturbancesPrint1,
  disturbancesPrint2,
  biomassStock,
  carbonStock,
  carbonStockSoilDepth,
  areaOfPermanentForestEstate,
  forestPolicy,
  otherLandWithTreeCover,
  climaticDomain,
  sustainableDevelopmentAgencyIndicator,
  sustainableDevelopmentAgencySubIndicator1,
  sustainableDevelopmentAgencySubIndicator2,
  sustainableDevelopmentAgencySubIndicator3,
  sustainableDevelopmentAgencySubIndicator4
EOF

  read -e -p "table_spec_name? [forestAreaChange] <? for more>: " table_spec_name

done

table_spec_name=${table_spec_name:-forestAreaChange}

# read -e -p "lang? [[en], es, fr, ru]: " lang
# lang=${lang:-en}

echo
echo -e "country_iso:\t\t$country_iso"
echo -e "section:\t\t$section"
echo -e "name:\t\t\t$name"
echo -e "table_spec_name:\t$table_spec_name"
echo

read -e -p "proceed? [Y/n]: " proceed

if [[ "$proceed" = "n" ]]; then
  echo "Exiting"
  exit 0
fi

endpoints=(
  '/api/country/descriptions/:countryIso/:section/:name'
  '/api/loggedInUser/'
  '/api/users/:countryIso'
  '/api/sustainableDevelopment/:countryIso'
  '/api/odp'
  '/api/odps/:countryIso'
  '/api/traditionalTable/:countryIso/:tableSpecName'
  '/api/country/all'
  '/api/country/overviewStatus/:countryIso'
  '/api/country/config/:countryIso'
  '/api/nde/:section/:countryIso'
  '/api/growingStock/:countryIso'
  '/api/statisticalFactsheets/'
  '/api/statisticalFactsheets/forestCharacteristics'
  '/api/statisticalFactsheets/extentOfForest'
  '/api/statisticalFactsheets/growingStockTotal'
  '/api/statisticalFactsheets/carbonStock'
  '/api/statisticalFactsheets/specificForestCategories'
  '/api/statisticalFactsheets/forestAreaWithinProtectedAreas'
  '/api/statisticalFactsheets/primaryDesignatedManagementObjective'
  '/api/statisticalFactsheets/forestOwnership'
)

# TODO: !publicly available endpoints
# '/api/panEuropean/:countryIso/uploadedQuestionareInfo'
# '/api/panEuropean/:countryIso/download'
# '/api/userChat/:countryIso/messages/all'
# '/api/userChat/:countryIso/messages/new'
# '/api/landing/:countryIso/overview'
# '/api/landing/sdgFocalPoints'

success='\033[00;32msuccess\033[0m'
fail='\033[00;31mfailed\033[0m'
error=false

for endpoint in ${endpoints[@]}; do
  endpoint=${endpoint//:section/$section}
  endpoint=${endpoint//:name/$name}
  endpoint=${endpoint//:tableSpecName/$table_spec_name}
  url=${base}${endpoint//:countryIso/$country_iso}

  statusCode=$(curl -s -o /dev/null -I -w "%{http_code}" $url)

  echo -n -e "$statusCode\t"
  if [[ "$statusCode" != 2* ]]; then
    error=true
    echo -n -e "${fail}\t"
    echo -n -e "${url}\n"
    if [[ "$verbose" == true ]]; then
      echo -n -e "\t"
      # very verbose ? $verbose && curl -vvv $url
      $verbose && curl $url
      echo -e "\n"
    fi
  else
    echo -n -e "${success}"
    echo -e "\t${url/$base/}"
  fi

done

#special case(s)

# '/definitions/:lang/:name'

urls=(
  "${base}/definitions/en/faq"
  "${base}/definitions/en/tad"
)

for url in ${urls[@]}; do
  statusCode=$(curl -s -o /dev/null -I -w "%{http_code}" $url)

  echo -n -e "$statusCode\t"
  if [[ "$statusCode" != 2* ]]; then
    echo -n -e "${fail}"
  else
    echo -n -e "${success}"
  fi

  echo -e "\t${url/$base/}"

done

if [ "$verbose" != true ] && [ "$error" == true ]; then
  echo -e "\nUse --verbose for more information"
fi
