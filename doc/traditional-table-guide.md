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

## 3. Create tableSpec for the UI

The front-end table is described via a *tableSpec* js-file which
contains the description of the table and possibly also some code. 

First, we add a new js file
`webapp/primaryDesignatedManagementObjectives/tableSpec.js` and add
React import there: `import React from 'react'`

Next we describe the parts that tableSpec consists of.

### Name

The tableSpec name, which is used to identify the table. We already
practically chose it when we named our new mapping in
`tableMappings.js` above. The name is also used to match the front-end
data with backend persistence-functionality.

So in our case we add:

```name: "primaryDesignatedManagementObjective"```

### Header

The header-portion is just plain JSX which should provide a lot of
flexibility if we want to e.g. have multiple header rows with varying
colspans and styles.

We add just the full *thead* here:

```
header: <thead>
  <tr>
    <td className="fra-table__header-cell"/>
    <td className="fra-table__header-cell-align-right">1990</td>
    <td className="fra-table__header-cell-align-right">2000</td>
    <td className="fra-table__header-cell-align-right">2010</td>
    <td className="fra-table__header-cell-align-right">2015</td>
    <td className="fra-table__header-cell-align-right">2020</td>
  </tr>
</thead>
```

First column is empty, we'll ad "row-headers" there.

### Rows

For the "row-heading" (the first column which contains just static
text), well add this inside a rows-array attribute:

```
rows: [{type: 'readOnly', jsx: <td key="expansion" className="fra-table__header-cell">Production</td>}]

```

This is a Javascript Object which describes a readonly-cell with
custom JSX. So we have one row with one cell now. Next, let's add a
dynamic input field cell:

```
{type: 'integerInput'}
```

Now the whole row looks like this:

```
[{type: 'readOnly', jsx: <td key="production" className="fra-table__header-cell">Production</td>},
 {type: 'integerInput'}]
```

We have one readonly and one input cell. To add all the input fields,
we just paste more of them:

```
[{type: 'readOnly', jsx: <td key="production" className="fra-table__header-cell">Production</td>},
 {type: 'integerInput'},
 {type: 'integerInput'},
 {type: 'integerInput'},
 {type: 'integerInput'},
 {type: 'integerInput'}
 ]
```

Rest of the rows with input-fields look the same, only the text
in the readOnly-cell changes:


```
rows: [
 [
  {type: 'readOnly', jsx: <td key="production" className="fra-table__header-cell">Production</td>},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'}
 ],
 [
  {type: 'readOnly', jsx: <td key="protection" className="fra-table__header-cell">Protection of soil and water</td>},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'}
 ]
]
```

This starts to look really repetitive. Thankfully this is not json,
but Javascript. So nothing prevents us from having some code to reduce
the copy/paste stuff. Let's use a function to create
all the rows which are almost identical:

```
const createPdmoIOnputRow = (rowHeader) => [
  {type: 'readOnly', jsx: <td key="protection" className="fra-table__header-cell">{rowHeader}</td>},
  ...(R.times(() => ({type: 'integerInput'}), 5))
]
```

Now our row-definitions look more compact:

```
  rows: [
    createPdmoIOnputRow('Production'),
    createPdmoIOnputRow('Protection of soil and water'),
    createPdmoIOnputRow('Conservation of biodiversity'),
    createPdmoIOnputRow('Social Services'),
    createPdmoIOnputRow('Multiple use'),
    createPdmoIOnputRow('Other'),
    createPdmoIOnputRow('No/unknown')
  ],

```

## 4. Add the table to a view.

Adding a view to the FRA Platform navigation is out of scope for this
guide. But we will show how to add a table to any view/page.

