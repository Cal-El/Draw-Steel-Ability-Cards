from git import Repo, rmtree
from os import path, makedirs, walk, rmdir, remove
import sys
import json
import yaml
from abilityParser import *
from patcher import *
import shutil

scriptPath = sys.path[0]
tempFolderPath = path.join(scriptPath, 'temp')
patchesFolderPath = path.join(scriptPath, 'patches')
customFolderPath = path.join(scriptPath, 'custom')
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
try:
  rulesRepo.clone_from('git@github.com:SteelCompendium/data-rules-json.git', rulesPath)
except:
  rulesRepo.clone_from('https://github.com/SteelCompendium/data-rules-json.git', rulesPath)
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
        cardData = createBlankCard()
        cardData['level'] = ability['metadata']['level']
        cardData['type'] = getAbilityType(ability)
        cardData['header']['topMatter'] = getTopMatter(className, ability)
        cardData['header']['title'] = ability['name']
        cardData['header']['flavour'] = ability['flavor']
        cardData['header']['keywords'] = ability['keywords']
        cardData['header']['distance'] = parseDistance(ability)
        cardData['header']['target'] = ability['target']
        cardData['body'] = parseBody(ability)
        cardData['cost'] = parseCost(ability)
        cardData['fontSizePtOverrides'] = {'body': 9}

        fileName = ability['metadata']['item_id'] + '.yaml'
        cardData = patchAbility(patchesFolderPath, className, fileName, cardData)
        
        with open(path.join(cardsPath, className, fileName), 'w') as c:
          yaml.dump(cardData, c)
        classManifest.append('/newcards/' + className + '/' + fileName)

  return classManifest

def createCoreManeuver(name):
  with open(path.join(abilitiesPath, 'Common', 'Maneuvers', name + '.json'), encoding='utf-8') as a:
    ability = json.load(a)
    cardData = createBlankCard()
    cardData['type'] = 'Maneuver'
    cardData['header']['topMatter'] = 'Core Maneuver'
    cardData['header']['title'] = ability['name']
    cardData['body'] = parseBody(ability)
    cardData['fontSizePtOverrides'] = {'body': 9}

    fileName = ability['metadata']['item_id'] + '.yaml'
    cardData = patchAbility(patchesFolderPath, 'Common', fileName, cardData)

    with open(path.join(cardsPath, '00-Common', fileName), 'w') as c:
      yaml.dump(cardData, c)
    return '/newcards/00-Common/' + name

def createCommonCards():
  print('Creating common cards')
  makedirs(path.join(cardsPath, '00-Common'))
  classManifest = []
  classManifest.append(createCoreManeuver('Escape Grab'))
  classManifest.append(createCoreManeuver('Grab'))
  classManifest.append(createCoreManeuver('Knockback'))

  return classManifest

def addCustomCards():
  print('Adding in custom cards')
  customManifest = []
  for _, dirs, _ in walk(customFolderPath):
    for d in dirs:
      for root, _, files in walk(path.join(customFolderPath, d)):
        for file in files:
          if path.exists(path.join(cardsPath, d, file)):
            remove(path.join(cardsPath, d, file))
          else:
            customManifest.append('/newcards/' + d + '/' + file)
          if not path.exists(path.join(cardsPath, d)):
            makedirs(path.join(cardsPath, d))
          shutil.copyfile(path.join(root, file), path.join(cardsPath, d, file))
  return customManifest

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
manifest = manifest + createCommonCards()
manifest = manifest + addCustomCards()

print('Creating card manifest')
with open(path.join(cardsPath, 'card-manifest.json'), 'w') as m:
  json.dump(manifest, m)

rmtree(tempFolderPath)
