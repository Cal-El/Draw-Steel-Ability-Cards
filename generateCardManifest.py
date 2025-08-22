from os import listdir, makedirs
from os.path import isfile, join, exists
import yaml

print("Generating Card Manifest...")

cards = "newcards"
basePath = join("public", cards)

groups = [f for f in listdir(basePath) if not isfile(join(basePath, f))]

if not exists(join("src", "types", "generated")):
    makedirs(join("src", "types", "generated"))

manifestFile = open(join("src", "types", "generated", "card-manifest.ts"), 'w')
publicManifestFile = open(join("public", "newcards", "card-manifest.json"), 'w')

manifestFile.write("export const cardManifest  = [\n")
publicManifestFile.write("[\n")
publicManString = ""

for group in groups:
    groupName = group.title()
    manifestFile.write("    {\n")
    manifestFile.write("        label: \"" + groupName + "\",\n")
    manifestFile.write("        options: [\n",)

    files = [f for f in listdir(join(basePath, group)) if isfile(join(basePath, group, f))]
    for file in files:
        fCon = open(join(basePath, group, file), 'r', encoding='UTF8')
        card = yaml.safe_load(fCon)
        topMatter = card['header']['topMatter']
        name = card['header']['title']
        manifestFile.write("            {\n")
        manifestFile.write("                label: \"" + name + " (" + topMatter + ")\",\n")
        manifestFile.write("                value: \"/" + cards + "/" + group + "/"+ file + "\",\n")
        manifestFile.write("            },\n")
        publicManString = publicManString + "  \"/" + cards + "/" + group + "/"+ file + "\",\n"
    manifestFile.write("        ],\n",)
    manifestFile.write("    },\n")


manifestFile.write("]\n")
manifestFile.close()

publicManifestFile.write(publicManString[:-2])
publicManifestFile.write("\n]")
publicManifestFile.close()

print("Generated Card Manifest")
