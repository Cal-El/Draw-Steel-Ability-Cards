from os import listdir, makedirs
from os.path import isfile, join, exists

print("Generating Card Manifest...")

cards = "cards"
basePath = join("public", cards)

groups = [f for f in listdir(basePath) if not isfile(join(basePath, f))]

if not exists(join("src", "types", "generated")):
    makedirs(join("src", "types", "generated"))

manifestFile = open(join("src", "types", "generated", "card-manifest.ts"), 'w')
publicManifestFile = open(join("public", "card-manifest.json"), 'w')

manifestFile.write("export const cardManifest  = [\n")
publicManifestFile.write("[\n")
publicManString = ""

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
                if name.startswith("'") and name.endswith("'"):
                    print(name)
                    name = name[1:-1].replace('"', '\\"')
                    print(name)
            if "topMatter:" in line:
                topMatter = line[11:-1]
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
