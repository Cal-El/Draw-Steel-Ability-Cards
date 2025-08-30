import re

def createBlankCard():
  cardData = {}
  cardData['version'] = 2
  cardData['type'] = ''
  cardData['header'] = {'flavour': '', 'keywords': [], 'target': '', 'distance': {'display': '', 'values': []}}
  cardData['header']['topMatter'] = ''
  cardData['header']['title'] = ''
  cardData['body'] = []
  return cardData

def getTopMatter(className, ability):
  levelBlock = 'Level ' + str(ability['metadata']['level'])
  if 'cost' in ability:
    return levelBlock + ' ' + className + ' Heroic Ability'
  return levelBlock + ' ' + className + ' Ability'

def getAbilityType(ability):
  if 'type' not in ability:
    return ''
  type = ability['type']
  if type == 'Triggered':
    return 'Triggered Action'
  if type == 'Free triggered':
    return 'Free Triggered Action'
  return type

def parseBody(ability):
  body = []
  abilityType = getAbilityType(ability)
  if abilityType == 'Triggered action' or abilityType == 'Free triggered action':
    triggered = {}
    triggered['isEffect'] = True
    triggered['title'] = "Trigger"
    triggered['body'] = ability['trigger']
    body.append(triggered)
  for block in ability['effects']:
    if 'roll' in block:
      body.append(parsePowerRoll(block))
    if 'effect' in block:
      effect = {}
      effect['isEffect'] = True
      if 'name' not in block and 'cost' not in block:
        continue
      if 'name' in block:
        effect['title'] = block['name']
      if 'cost' in block:
        effect['title'] = block['cost']
      effect['body'] = block['effect']
      body.append(effect)
  return body

def parsePowerRoll(block):
  powerRoll = {}
  powerRoll['isPowerRoll'] = True
  powerRoll['characteristicBonus'] = getCharacteristicList(block['roll'])
  powerRoll['t1'] = parsePowerRollTier(block['t1'])
  powerRoll['t2'] = parsePowerRollTier(block['t2'])
  powerRoll['t3'] = parsePowerRollTier(block['t3'])
  return powerRoll

def getCharacteristicList(someString):
  characteristics = []
  lowerCase = someString.lower()
  if 'might' in lowerCase:
    characteristics.append('Might')
  if 'agility' in lowerCase:
    characteristics.append('Agility')
  if 'reason' in lowerCase:
    characteristics.append('Reason')
  if 'intuition' in lowerCase:
    characteristics.append('Intuition')
  if 'presence' in lowerCase:
    characteristics.append('Presence')
  return characteristics

def getPowerRollCharacteristicList(someString):
  characteristics = []
  if 'M' in someString:
    characteristics.append('Might')
  if 'A' in someString:
    characteristics.append('Agility')
  if 'R' in someString:
    characteristics.append('Reason')
  if 'I' in someString:
    characteristics.append('Intuition')
  if 'P' in someString:
    characteristics.append('Presence')
  return characteristics

def getCharacteristic(someString):
  if 'M' in someString:
    return 'Might'
  if 'A' in someString:
    return 'Agility'
  if 'R' in someString:
    return 'Reason'
  if 'I' in someString:
    return 'Intuition'
  if 'P' in someString:
    return 'Presence'
  return ''

def getPotency(someString):
  if someString == 'WEAK':
    return 0
  if someString == 'AVERAGE':
    return 1
  if someString == 'STRONG':
    return 2
  return 0

def parsePowerRollTier(rawTier):
  tier = rawTier.replace("**", "")
  parsed = {}
  r = re.search('^(([^ +]+ \+ )* *[\dMARIP]+ )*([^;\n]*(; .+?)*?(; the Director loses \d+ Malice)*)( \(see .*\))*(; (if the target has )*(M|A|R|I|P) < (WEAK|AVERAGE|STRONG), .*)*$', tier)
  parsed['baseEffect'] = r.group(3).strip()
  if re.match('^(if the target has )* *(M|A|R|I|P)? ?< (WEAK|AVERAGE|STRONG), .*$', parsed['baseEffect']):
    parsed['baseEffect'] = None
  parts = tier.split(';')
  for p in parts:
    if 'damage' in p and '<' not in p:
      pattern = '^(([\ddMAARIP]+ \+ )* *[\ddMAARIP]+) (.*)$'
      d = re.search(pattern, p)
      if not d:
        continue
      damageParts = d.group(1).split('+')
      damage = {'baseValue': 0, 'characteristicBonusOptions': [], 'includedKitValue': 0}
      for x in damageParts: #TODO: handle kits if they get included at some point
        if 'd' in x:
          damage['otherBonus'] = x.strip()
        elif 'M' in x or 'A' in x or 'R' in x or 'I' in x or 'P' in x:
          damage['characteristicBonusOptions'] = getPowerRollCharacteristicList(x)
        else:
          damage['baseValue'] = int(x.strip())
      parsed['damage'] = damage
    elif '<' in p:
      pot = re.search('(M|A|R|I|P) < (WEAK|AVERAGE|STRONG), (.*)', p)
      potency = {}
      potency['characteristic'] = getCharacteristic(pot.group(1))
      potency['strength'] = getPotency(pot.group(2))
      potency['effect'] = pot.group(3)
      parsed['potency'] = potency
  return parsed

def parseCost(ability):
  cost = None
  if 'cost' in ability:
    cost = {}
    c = re.search('(\d+) (.*)', ability['cost'])
    cost['costName'] = c.group(2)
    cost['costValue'] = c.group(1)
  return cost

def parseDistance(ability):
  distance = {}
  values = []
  keywords = ability['keywords']
  distanceString = ability['distance']
  if ('Melee' in keywords or 'Ranged' in keywords) and ('Magic' in keywords or 'Psionic' in keywords or 'Weapon' in keywords):
    if re.match('^(.*? within )(\d+)(.*?)$', distanceString):
      x = re.search('^(.*? within )(\d+)(.*?)$', distanceString)
      distance['display'] = x.group(1) + '[' + x.group(2) + ']' + x.group(3)
      typeString = 'Within'
      if 'Melee' in keywords:
        typeString = 'Melee'
      if 'Ranged' in keywords:
        typeString = 'Ranged'
      distance['values'] = [{'type': typeString, 'baseValue': int(x.group(2)), 'includedKitValue': 0}]
    elif re.match('^[M|m]elee (\d+?) or [R|r]anged (\d+?)$', distanceString):
      x = re.search('^[M|m]elee (\d+?) or [R|r]anged (\d+?)$', distanceString)
      distance['display'] = 'Melee [' + x.group(1) + '] or Ranged [' + x.group(2) + ']'
      distance['values'] = [{'type': 'Melee', 'baseValue': int(x.group(1)), 'includedKitValue': 0}, {'type': 'Ranged', 'baseValue': int(x.group(2)), 'includedKitValue': 0}]
    elif re.match('^[M|m]elee (\d+?)$', distanceString):
      x = re.search('^[M|m]elee (\d+?)$', distanceString)
      distance['display'] = 'Melee [' + x.group(1) + ']'
      distance['values'] = [{'type': 'Melee', 'baseValue': int(x.group(1)), 'includedKitValue': 0}]
    elif re.match('^[R|r]anged (\d+?)$', distanceString):
      x = re.search('^[R|r]anged (\d+?)$', distanceString)
      distance['display'] = 'Ranged [' + x.group(1) + ']'
      distance['values'] = [{'type': 'Ranged', 'baseValue': int(x.group(1)), 'includedKitValue': 0}]
    else:
      distance['display'] = ability['distance']
      distance['values'] = values
  else:
    distance['display'] = ability['distance']
    distance['values'] = values
  return distance
