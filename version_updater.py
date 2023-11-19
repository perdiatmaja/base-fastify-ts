import json
import sys

branch = sys.argv[1]

if (branch != "main" and branch != "develop"):
    sys.exit()
 
packageFile = open('package.json')
packageData = json.load(packageFile) 
packageFile.close()

version = packageData["version"]

versionArr = version.split(".")
buildNo = int(versionArr[len(versionArr)-1])+1
version = f'{versionArr[0]}.{versionArr[1]}.{buildNo}'

if (branch == "main"):
    packageData["version"] = f'{version}'
elif (branch == "develop"):
    packageData["version"] = f'{version}-SNAPSHOT'

del packageData["scripts"]

with open("package.json", "w") as outfile:
    json.dump(packageData, outfile)
    
sys.exit(version)