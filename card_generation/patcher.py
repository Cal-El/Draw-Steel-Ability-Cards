from os import path
import yaml

def patchAbility(patchFolderPath, group, fileName, card):
  patchFilePath = path.join(patchFolderPath, group, fileName)
  if not path.exists(patchFilePath):
    return card
  updated = card.copy()
  with open(patchFilePath, encoding='utf-8') as p:
    patch = yaml.safe_load(p)
    if 'level' in patch:
      updated['level'] = patch['level']
    if 'type' in patch:
      updated['type'] = patch['type']
    if 'cost' in patch:
      updated['cost'] = patch['cost']
    if 'header' in patch:
      header = patch['header']
      if 'topMatter' in header:
        updated['header']['topMatter'] = patch['header']['topMatter']
      if 'title' in header:
        updated['header']['title'] = patch['header']['title']
      if 'flavour' in header:
        updated['header']['flavour'] = patch['header']['flavour']
      if 'keywords' in header:
        updated['header']['keywords'] = patch['header']['keywords']
      if 'distance' in header:
        updated['header']['distance'] = patch['header']['distance']
      if 'target' in header:
        updated['header']['target'] = patch['header']['target']
    if 'body' in patch:
      updated['body'] = patch['body']
    if 'fontSizePtOverrides' in patch:
      updated['fontSizePtOverrides'] = patch['fontSizePtOverrides']
  return updated
