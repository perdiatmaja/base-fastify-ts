import json
import sys
import re

branch = sys.argv[1]
RELEASE_REGEX = "^(release)+(\/\w\.\w\.\w)$"
SNAPSHOT = "SNAPSHOT"
RELEASE = "RELEASE"

isRelease = re.search(RELEASE_REGEX, branch)

if not isRelease and branch != "develop":
    sys.exit()

packageFile = open("package.json")
packageData = json.load(packageFile)
packageFile.close()
versionHistory = {}
versionHistoryFile = open("version_history", "r")

for data in versionHistoryFile:
    dataArr = data.replace("\n", "").split("=")
    versionHistory[dataArr[0]] = dataArr[1]

versionHistoryFile.close()

version = branch.replace("release/", "") if (isRelease) else str(packageData["version"])

if isRelease and version != versionHistory[RELEASE]:
    packageData["version"] = f"{version}"

elif branch == "develop":
    versionArr = version.split(".")
    buildNo = int(versionArr[len(versionArr) - 1]) + 1
    version = (
        f"{versionArr[0]}.{versionArr[1]}.{buildNo}-{SNAPSHOT}"
        if version == versionHistory[SNAPSHOT]
        else versionHistory[SNAPSHOT]
    )
    packageData["version"] = f"{version}"

with open("package.json", "w") as outfile:
    json.dump(packageData, outfile)

print(version)
