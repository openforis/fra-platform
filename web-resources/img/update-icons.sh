#!/bin/bash

sed -i '' -e 's/nc-//g' icons.svg
sed -i '' -e 's/data-color="color-2"/fill="currentColor"/g' icons.svg
sed -i '' -e 's/&lt;.*#nc-\(.*\)\".*&gt;/\&lt;Icon name="\1" className=""\/\&gt;/g' demo.html

# sed -i '' -e 's/nc-//g' demo.html
# sed -i '' -e 's/svg class="icon icon-grid-16"/svg className="icon"/g' demo.html
# sed -i '' -e 's/svg class="icon icon-grid-24"/svg className="icon-24"/g' demo.html
# sed -i '' -e 's/svg class="icon "/svg className="icon"/g' demo.html
# sed -i '' -e 's/use href/use xlinkHref/g' demo.html

# sed -i '' -e 's/nc-//g' demo.html
# sed -i '' -e 's/nc-icon nc-icon-grid-16/icon/g' demo.html
# sed -i '' -e 's/nc-icon nc-icon-grid-24/icon-24/g' demo.html
# &lt;svg class="nc-icon nc-icon-grid-16"&gt;&lt;use href="img/nc-icons.svg#nc-small-add"/&gt;&lt;/svg&gt;
# sed -i '' -e 's/class="icon"\&/className="icon"\&/g' demo.html
# sed -i '' -e 's/class="icon-24"\&/className="icon-24"\&/g' demo.html
# sed -i '' -e 's/xlink:href/xlinkHref/g' demo.html
