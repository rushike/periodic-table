import json
import re
with open("src/assets/data/elements.json" ) as f:
  elements = json.load( f )

categories = set([element["category"]for element in elements])

print (categories)
