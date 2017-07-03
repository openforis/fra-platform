#!/bin/bash

sed -i '' -e 's/nc-//g' icon.svg
sed -i '' -e 's/data-color="color-2" fill="currentColor"//g' icon.svg
sed -i '' -e 's/nc-//g' demo.html
sed -i '' -e 's/icon glyph/icon/g' demo.html
sed -i '' -e 's/icon grid-16 glyph/icon/g' demo.html
sed -i '' -e 's/class="icon"\&/className="icon"\&/g' demo.html
sed -i '' -e 's/icon grid-24 glyph/icon-24/g' demo.html
sed -i '' -e 's/class="icon-24"\&/className="icon-24"\&/g' demo.html
sed -i '' -e 's/xlink:href/xlinkHref/g' demo.html
