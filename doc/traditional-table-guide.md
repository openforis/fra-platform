# Creating traditional tables with FRA platform's lightweight framework

FRA platform includes a simple framework to create more or less fixed
tables with input fields. These tables are saved to database in a
format which should be easily queryable and readable.

The following steps show how to create a new view with this kind of
traditional table. We'll use "Designated management objective"
as an example.

## 1. Create the database mapping model

We'll move from bottom-up, and create a database description
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

Note that we only listed the rows and columns which have
user-entered, dynamic data.

We'll create the corresponding database mapping file which has more
database-friendly naming (these are used directly as column names and
row identifiers):

```
module.exports = {
  tableName: 'designated_management_objective',
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
  columns: [
    {name: '1990', type: 'numeric'},
    {name: '2000', type: 'numeric'},
    {name: '2010', type: 'numeric'},
    {name: '2015', type: 'numeric'},
    {name: '2020', type: 'numeric'}
  ]
}

```

All the fields are numbers, so we store/map them with the type `numeric`

That mapping file is then stored under:
`server/traditionalTable/mappings/designatedManagementObjective.js`
and a reference to it is added into:
`server/traditionalTable/tableMappings.js`. Below is the diff of the addition.

```
+const designatedManagementObjective = require('./mappings/designatedManagementObjective')

-const mappings = {specificForestCategories, forestAreaChange}
+const mappings = {specificForestCategories, forestAreaChange, designatedManagementObjectives}

```

## 2. Creating the table

We are ready to create the table based on the DB mapping above. Let's
run the following command:

```
node tools/createTraditionalTable.js designatedManagementObjective
```

The name *designatedManagementObjective* above came from the
change we did to *tableMappings.js*. Now we get this output:

```
CREATE TABLE designated_management_objective ("country_iso" VARCHAR, "row_name" VARCHAR, "1990" NUMERIC, "2000" NUMERIC, "2010" NUMERIC, "2015" NUMERIC, "2020" NUMERIC, PRIMARY KEY (country_iso, row_name));

```

This table definition is ready to use, we can just add it as a new migration SQL
file:

```
yarn run create-migration create-designated-management-objective
```

After this we copy/paste the _create table_ statemenet above into
`server/db/migration/migrations/sqls/<timestamp>-create-designated-management-objective-up.sql`

Next time we start the server, the table will be created.

## 3. Create tableSpec for the UI

The front-end table is described via a *tableSpec* js-file which
contains the description of the table and possibly also some code.

First, we add a new js file
`webapp/designatedManagementObjectives/tableSpec.js` and add
React import there: `import React from 'react'`. The tableSpec is a JavaScript
object exported from the module. Let's create an empty one (we'll fill
in the attributes next).

```
export default {}
```

Now we'll describe the attributes that tableSpec consists of.

### Name

The tableSpec name, which is used to identify the table. We already
practically chose it when we named our new mapping in
`tableMappings.js` above. The name is also used to match the front-end
data with backend persistence-functionality.

So in our case we add:

```name: "designatedManagementObjective"```

### Header

The header-portion is just plain JSX which should provide a lot of
flexibility if we want to e.g. have multiple header rows with varying
colspans and styles.

We add just the full *thead* here:

```
header: <thead>
  <tr>
    <th className="fra-table__header-cell"/>
    <th className="fra-table__header-cell">1990</th>
    <th className="fra-table__header-cell">2000</th>
    <th className="fra-table__header-cell">2010</th>
    <th className="fra-table__header-cell">2015</th>
    <th className="fra-table__header-cell">2020</th>
  </tr>
</thead>
```

First column is empty, we'll ad "row-headers" there.

### Rows

For the "row-heading" (the first column which contains just static
text), well add this inside a rows attribute which contains an array:

```
rows: [{type: 'readOnly', jsx: <td key="expansion" className="fra-table__category-cell">Production</td>}]

```

This is a Javascript Object which describes a readonly-cell with
custom JSX. So we have one row with one cell now. Next, let's add a
dynamic input field cell:

```
{type: 'integerInput'}
```

Now the whole row looks like this:

```
[{type: 'readOnly', jsx: <td key="production" className="fra-table__category-cell">Production</td>},
 {type: 'integerInput'}]
```

We have one readonly and one input cell. To add all the input fields,
we just paste more of them:

```
[{type: 'readOnly', jsx: <td key="production" className="fra-table__category-cell">Production</td>},
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
  {type: 'readOnly', jsx: <td key="production" className="fra-table__category-cell">Production</td>},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'}
 ],
 [
  {type: 'readOnly', jsx: <td key="protection" className="fra-table__category-cell">Protection of soil and water</td>},
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
  {type: 'readOnly', jsx: <td key="protection" className="fra-table__category-cell">{rowHeader}</td>},
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

Our example table also needs a sum row at the bottom. There is a
custom cell type which provides a function. This function accepts
a properties object as parameter which contains the whole table's data
(among other things). The function should return JSX. A simple example
of such cell and an aggregate function:

```
const rowAmount = 7
const sum = (tableData, column) => R.reduce((sum, rowIdx) => {
    return sum + tableData[rowIdx][columnIdx],
    0,
    R.range(0, rowAmount)
  )
...
{type: 'custom', render: (props) => <td {sum(props.tableData, 1)} </td>}
```

We have to take into account null/undefined values as well though. The
table data is initialized with undefined values and can contain nulls
as well (this happens when user erases the field value). We'll deal
with both undefined and null with Ramda's `isNil` function. So our
example gets a bit more complicated. We'll add a cell like this for
each column for which we calculate the sum:

```
{type: 'custom', render: totalForestAreaCell(1)}

```

And the functions which the cell uses is the actual beef here:

```
const totalForestArea = (tableData, columnIdx) =>
  R.reduce((sum, rowIdx) => {
    const value = tableData[rowIdx][columnIdx]
    if (!R.isNil(value))
      return sum + value
    else
      return sum
    },
    0,
    R.range(0, 7)
  )

const totalForestAreaCell = (column) => (props) =>
  <td className="fra-table__calculated-cell">
    {totalForestArea(props.tableData, column)}
  </td>

```

We can make as many sum rows or even columns as we want with this
custom cell type. We'll just have to exclude those from the data that
we sent to server to save, which is the next topic. To summarize our
table specification is now:

```
export default {
  name: 'designatedManagementObjective',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell"/>
    <th className="fra-table__header-cell">1990</th>
    <th className="fra-table__header-cell">2000</th>
    <th className="fra-table__header-cell">2010</th>
    <th className="fra-table__header-cell">2015</th>
    <th className="fra-table__header-cell">2020</th>
  </tr>
  </thead>,
  rows: [
    createPdmoInputRow('Production'),
    createPdmoInputRow('Protection of soil and water'),
    createPdmoInputRow('Conservation of biodiversity'),
    createPdmoInputRow('Social Services'),
    createPdmoInputRow('Multiple use'),
    createPdmoInputRow('Other'),
    createPdmoInputRow('No/unknown'),
    [{type: 'readOnly', jsx: <td className="fra-table__header-cell-left">Total forest area</td>},
     {type: 'custom', render: totalForestAreaCell(1)},
     {type: 'custom', render: totalForestAreaCell(2)},
     {type: 'custom', render: totalForestAreaCell(3)},
     {type: 'custom', render: totalForestAreaCell(4)},
     {type: 'custom', render: totalForestAreaCell(5)}]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
}
```

### valueSlice

To make the code simpler, traditional tables create a tableData
structure which has as many rows and columns as our tableSpec's `rows` matrix
defines. Note that `header` is not included, so you can have as many `<tr>`s as
you want there and they are not included when indexing rows.

Because the tableData can contain, for example:

* Cells which are static row headers like
the ones we created with `{type: 'readOnly'}` earlier
* Aggregate, calculated cells which are created with `{type: 'custom'}`

it is clear that tableData will contain cells we do not want to save
into the database. The way to tackle that is tableSpec's `valueSlice`
attribute. It is optional, you don't have to specify it if there are
no cells which should not be saved like custom or readOnly in your
tableSpec. It's attributes are also optional, so you can just provide
one of them. Here's an example which contains all of it's attributes:

```
  valueSlice: {
    rowStart: 0,
    rowEnd: -1,
    columnStart: 1,
    columnEnd: undefined
  }
```

This will remove one column from start ("row headers") with
`columnStart: 1` and one row at the end with `rowEnd: -1`. Negative
indexing means that we count down from the length of the row or column
array. Zero in `rowStart` can be omitted because that's the default,
also undefined in `columnEnd` is same as the default so it can be
omitted (means that no columns from the end are removed).

Because of the defaults, we can have a more compact version:

```
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
```

We have now defined a valueSlice which handles the removal of our totals and the row header column
we specified. Those will not be sent to server for saving (they
contain just undefined values anyway).

## 4. Add the table to a view.

Adding a view to the FRA Platform navigation is covered in sections 5 and 6. But now we will show 
how to add a table to any view/page. We assume that a view file has been created and it's in
`webapp/designatedManagementObjective/designatedManagementObjectiveView.js`.

Next, we need to import the tableSpec we just created:

```import tableSpec from './tableSpec```

And the TraditionalTable component:

```
import TraditionalTable from '../traditionalTable/traditionalTable'
```

Now we can use the TraditionalTable component in our render-method or
function like this:

```
<TraditionalTable tableSpec={tableSpec} countryIso={this.props.match.params.countryIso}/>
```

(The above assumes countryIso is in the props, but it can of course come from
anywhere)

And we're finished! The table is rendered in the UI, fetches it's
own data and autosaves it.

## 5. Create a route for the view

For the view to be accessible from a url we need to create a route for it in
`webapp/app/routes.js`

Next, we import the view

```
import designatedManagementObjectiveView from '@webapp/assessmentFra/designatedManagementObjective/designatedManagementObjectiveView'
```

Next, we add a route

```
const routes = {
  '/country/:countryIso/designatedManagementObjective': designatedManagementObjectiveView
}
```

## 6. Add view to navigation

Now that we have a url for the view we need to add it to the navigation, open `webapp/navigation/items.js`

Next, import the table spec

```
import designatedManagementObjectiveTableSpec from '@webapp/assessmentFra/designatedManagementObjective/tableSpec'
```

Next, we add it to the navigation

```
export const fra2020Items = i18n => [
  {
    tableNo: '1f',
    label: i18n.t('designatedManagementObjective.designatedManagementObjective'),
    pathTemplate: '/country/:countryIso/designatedManagementObjective',
    section: designatedManagementObjectiveTableSpec(i18n).name
  },
]
```
