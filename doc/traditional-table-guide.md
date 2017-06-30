# Creating traditional tables with FRA platform's lightweight framework

FRA platform includes a simple framework to create more or less fixed
tables with input fields. These tables are saved to database in a
format which should be easily queryable and readable.

The following steps show how to create a new view with this kind of
traditional table. We'll use "Primary designated management objective"
as an example.

## 1. Create the database mapping model.

We start with from the bottom, and create a database description
file. This can be used to create the database table in the next
step.

The table has the the columns 1990, 2000, 2010, 2015 and 2020 and the
following rows:

* Production
* Protection of soil and water
* Conservation of biodiversity
* Social Services
* Multiple use
* Other
* No/unknown

Note that we are only listing the rows and columns which have
user-entered, dynamic data.

We'll create the corresponding database mapping file which has more
database-friendly naming (these are used directly as column names and
row identifiers):

```
module.exports = {
  tableName: 'primary_designated_management_objective',
  rows: {
    names: [
      'production',
      'protection_of_soil_and_water',
      'conservation_of_biodiversity',
      'social_services',
      'multiple_use',
      'other',
      'no_unknown']
  },
  columns: {
    names: ['1990', '2000', '2010', '2015', '2020']
  }
}

```

That mapping file is then stored under:
`server/traditionalTable/mappings/primaryDesignatedManagementObjective.js`
and a reference to it is added into:
`server/traditionalTable/tableMappings.js`. Below is the diff of the addition.

```
+const primaryDesignatedManagementObjective = require('./mappings/primaryDesignatedManagementObjective')

-const mappings = {specificForestCategories, forestAreaChange}
+const mappings = {specificForestCategories, forestAreaChange, primaryDesignatedManagementObjectives}

```

## 2. Creating the table

We are ready to create the table based on the DB mapping above. Let's
run the following command:

```
node tools/createTraditionalTable.js primaryDesignatedManagementObjective
```

The name *primaryDesignatedManagementObjective* above came from the
change we did to *tableMappings.js*. Now we get this output:

```
CREATE TABLE primary_designated_management_objective ("country_iso" VARCHAR, "row_name" VARCHAR, "1990" NUMERIC, "2000" NUMERIC, "2010" NUMERIC, "2015" NUMERIC, "2020" NUMERIC, PRIMARY KEY (country_iso, row_name));

```

This table is ready to use, we can just add it as a new migration SQL
file:

```
yarn run create-migration create-designated-management-objective
```

After this we copy/paste the _create table_ statemenet above into
`server/db/migration/migrations/sqls/<timestamp>-create-designated-management-objective-up.sql`

Next time we start the server, the table is there.


