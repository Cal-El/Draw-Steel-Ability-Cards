from os import listdir, makedirs
from os.path import isfile, join, exists
import yaml
import json

print("Generating Card Manifest...")

cards = "newcards"
basePath = join("public", cards)

groups = [f for f in listdir(basePath) if not isfile(join(basePath, f))]
groups.sort()

if not exists(join("src", "types", "generated")):
    makedirs(join("src", "types", "generated"))

manifestFile = open(join("src", "types", "generated", "card-manifest.ts"), 'w')
publicManifestFile = open(join("public", "newcards", "card-manifest.json"), 'w')

manifestContent = []
publicManifestContent = []
manifestFile.write("export const cardManifest  = ")

def getLevelString(level):
  if level < 10:
    return '0' + str(level)
  return str(level)

for group in groups:
  groupName = group.title()
  groupData = {'label': groupName}
  options = []

  files = [f for f in listdir(join(basePath, group)) if isfile(join(basePath, group, f))]
  for file in files:
    fCon = open(join(basePath, group, file), 'r', encoding='UTF8')
    cardPath = "/" + cards + "/" + group + "/"+ file
    card = yaml.safe_load(fCon)
    topMatter = card['header']['topMatter']
    name = card['header']['title']
    option = {'label': name + " (" + topMatter + ")", 'value': cardPath}
    option['sortKey'] = getLevelString(card['level']) + '-' + name
    options.append(option)
    publicManifestContent.append(cardPath)
  options.sort(key = lambda x : x['sortKey'])
  groupData['options'] = options
  manifestContent.append(groupData)


json.dump(manifestContent, manifestFile, indent=2)
manifestFile.close()

json.dump(publicManifestContent, publicManifestFile, indent=2)
publicManifestFile.close()

print("Generated Card Manifest")
