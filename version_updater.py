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
versionHistories = {}
versionHistoryFile = open("version_history", "r")

for data in versionHistoryFile:
    dataArr = data.replace("\n", "").split("=")
    versionHistories[dataArr[0]] = dataArr[1]

versionHistoryFile.close()

version = branch.replace("release/", "") if (isRelease) else str(packageData["version"])

if isRelease and version != versionHistories[RELEASE]:
    packageData["version"] = f"{version}"

elif branch == "develop":
    version = version.replace(f"-{SNAPSHOT}", "")
    versionArr = version.split(".")
    buildNo = int(versionArr[len(versionArr) - 1]) + 1
    versionHistory = versionHistories[SNAPSHOT]

    updatedVersion = (
        f"{versionArr[0]}.{versionArr[1]}.{buildNo}-{SNAPSHOT}"
        if f"{version}-{SNAPSHOT}" == versionHistory
        else f"{version}-{SNAPSHOT}"
    )

    packageData["version"] = f"{updatedVersion}"
    versionHistories[SNAPSHOT] = updatedVersion

with open("package.json", "w") as outfile:
    json.dump(packageData, outfile, indent=4)

versionHistoryFile = open("version_history", "w")

for key in versionHistories:
    versionHistoryFile.writelines(f"{key}={versionHistories[key]}\n")

versionHistoryFile.close()

print(version)
