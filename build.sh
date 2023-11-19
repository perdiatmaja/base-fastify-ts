echo "build ts to js"
rm -rf "./dist/js"
tsc --build
rm -rf "./dist/js/dist"
