import json
import sys
import re

branch = sys.argv[1]
RELEASE_REGEX="^(release)+(\/\w\.\w\.\w)$"

isRelease=re.search(RELEASE_REGEX, branch)

if (not isRelease and branch != "develop"):
    sys.exit()

packageFile = open('install_package.json')
packageData = json.load(packageFile) 
packageFile.close()

version = branch.replace("release/", "") if (isRelease) else packageData["version"]

if (isRelease):
    packageData["version"] = f'{version}'
elif (branch == "develop"):
    versionArr = version.split(".")
    buildNo = int(versionArr[len(versionArr)-1])+1
    version = f'{versionArr[0]}.{versionArr[1]}.{buildNo}'
    packageData["version"] = f'{version}-SNAPSHOT'

with open("install_package.json", "w") as outfile:
    json.dump(packageData, outfile)

del packageData["scripts"]

with open("package.json", "w") as outfile:
    json.dump(packageData, outfile)
    
print(version)