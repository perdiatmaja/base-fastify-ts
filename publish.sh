#!/bin/bash

./install.sh
./build.sh

RELEASE="^(release)+(\/\w\.\w\.\w)$"
DEVELOP="develop"

branch_name=$(git symbolic-ref -q HEAD);
branch_name=${branch_name##refs/heads/};
branch_name=${branch_name:-HEAD};

if [[ $branch_name =~ $RELEASE ]] || [ $branch_name == $DEVELOP ];
then
    version=$(python3 version_updater.py $branch_name)
    echo $version
    git add .
    git commit -m "Update version to $version"
    # git push
    # npm publish
fi

./clear.sh