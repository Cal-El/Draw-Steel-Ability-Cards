from os import listdir, makedirs
from os.path import isfile, join, exists

print("Generating Card Manifest...")

cards = "cards"
basePath = join("public", cards)

groups = [f for f in listdir(basePath) if not isfile(join(basePath, f))]

if not exists(join("src", "types", "generated")):
    makedirs(join("src", "types", "generated"))

manifestFile = open(join("src", "types", "generated", "card-manifest.ts"), 'w')

manifestFile.write("export const cardManifest  = [\n")

for group in groups:
    groupName = group[3:].title()
    manifestFile.write("    {\n")
    manifestFile.write("        label: \"" + groupName + "\",\n")
    manifestFile.write("        options: [\n",)

    files = [f for f in listdir(join(basePath, group)) if isfile(join(basePath, group, f))]
    for file in files:
        fCon = open(join(basePath, group, file), 'r')
        topMatter = ""
        name = ""
        for line in fCon:
            if "title:" in line:
                name = line[7:-1]
            if "topMatter:" in line:
                topMatter = line[11:-1]
        manifestFile.write("            {\n")
        manifestFile.write("                label: \"" + topMatter + " | " + name + "\",\n")
        manifestFile.write("                value: \"/" + cards + "/" + group + "/"+ file + "\",\n")
        manifestFile.write("            },\n")
    manifestFile.write("        ],\n",)
    manifestFile.write("    },\n")


manifestFile.write("]\n")
manifestFile.close()

print("Generated Card Manifest")
