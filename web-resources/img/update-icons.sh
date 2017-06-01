#!/bin/bash

sed -i '' -e 's/nc-//g' icon.svg
sed -i '' -e 's/nc-//g' demo.html
sed -i '' -e 's/icon glyph/icon/g' demo.html
sed -i '' -e 's/icon grid-16 glyph/icon/g' demo.html
