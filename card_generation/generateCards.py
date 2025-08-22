from git import Repo, rmtree
from os import path, makedirs, walk, rmdir, remove
import sys
import json
import yaml
from abilityParser import *

scriptPath = sys.path[0]
tempFolderPath = path.join(scriptPath, 'temp')
repoPath = path.join(tempFolderPath, 'repo')
rulesPath = path.join(tempFolderPath, 'rules')
cardsPath = path.normpath(path.join(scriptPath, '..', 'public', 'newcards'))

def clearTempRepo():
  if path.exists(rulesPath):
    rmtree(rulesPath)
  for root, dirs, files in walk(tempFolderPath, topdown=False):
    for name in files:
        remove(path.join(root, name))
    for name in dirs:
        rmdir(path.join(root, name))
  rmdir(tempFolderPath)

if path.exists(tempFolderPath):
  print('temp already exists, clearing')
  clearTempRepo()

makedirs(tempFolderPath)

print('Clearing existing cards')
if path.exists(cardsPath):
  rmtree(cardsPath)
makedirs(cardsPath)

print('Cloning rules repo')
rulesRepo = Repo.init(repoPath, bare=True)
rulesRepo.clone_from('git@github.com:SteelCompendium/data-rules-json.git', rulesPath)
rulesRepo.close()

abilitiesPath = path.join(rulesPath, 'Abilities')
manifest = []

def createCards(className):
  print('Creating cards for ' + className)
  makedirs(path.join(cardsPath, className))
  classManifest = []
  for root, _, files in walk(path.join(abilitiesPath, className)):
    for file in files:
      if not file.endswith('.json'):
        print('File ' + file + ' is not the correct format')
        continue
      with open(path.join(root, file), encoding='utf-8') as a:
        ability = json.load(a)
        if 'metadata' not in ability or 'feature_type' not in ability['metadata'] or ability['metadata']['feature_type'] == 'trait':
          continue
        cardData = {}
        cardData['version'] = 2
        cardData['level'] = ability['metadata']['level']
        cardData['type'] = getAbilityType(ability)
        cardData['header'] = {}
        cardData['header']['topMatter'] = className + ' Level ' + str(cardData['level']) + ' Ability'
        cardData['header']['title'] = ability['name']
        cardData['header']['flavour'] = ability['flavor']
        cardData['header']['keywords'] = ability['keywords']
        cardData['header']['distance'] = parseDistance(ability)
        cardData['header']['target'] = ability['target']
        cardData['body'] = parseBody(ability)
        cardData['cost'] = parseCost(ability)

        fileName = ability['metadata']['item_id'] + '.yaml'
        with open(path.join(cardsPath, className, fileName), 'w') as c:
          yaml.dump(cardData, c)
        classManifest.append('/newcards/' + className + '/' + fileName)

  return classManifest

# Create censor cards
manifest = manifest + createCards('Censor')
manifest = manifest + createCards('Conduit')
manifest = manifest + createCards('Elementalist')
manifest = manifest + createCards('Fury')
manifest = manifest + createCards('Null')
manifest = manifest + createCards('Shadow')
manifest = manifest + createCards('Tactician')
manifest = manifest + createCards('Talent')
manifest = manifest + createCards('Troubadour')

print('Creating card manifest')
with open(path.join(cardsPath, 'card-manifest.json'), 'w') as m:
  json.dump(manifest, m)
