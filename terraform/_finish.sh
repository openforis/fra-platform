# source - don't execute directly!!
# shared final steps for deploy-incubator-*.sh

# generate cache
yarn ts-node src/tools/generateCache

# validate all data
yarn ts-node src/tools/validations/validateAll.ts

# add test user
yarn ts-node src/tools/user/createAdmin.ts

# print web url
heroku apps:info -a fra-platform-incubator -s | grep web_url | cut -d= -f2-
