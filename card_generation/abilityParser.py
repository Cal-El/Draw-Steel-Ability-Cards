def getAbilityType(ability):
  if 'type' not in ability:
    return ''
  type = ability['type']
  if type == 'Triggered':
    return 'Triggered Action'
  return type
