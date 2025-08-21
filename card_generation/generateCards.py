from git import Repo, rmtree
from os import path, makedirs, walk, rmdir, remove
import sys

scriptPath = sys.path[0]
tempFolderPath = path.join(scriptPath, 'temp')
repoPath = path.join(tempFolderPath, 'repo')
rulesPath = path.join(tempFolderPath, 'rules')

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

print('Cloning rules repo')
rulesRepo = Repo.init(repoPath, bare=True)
rulesRepo.clone_from('git@github.com:SteelCompendium/data-rules-json.git', rulesPath)
rulesRepo.close()

