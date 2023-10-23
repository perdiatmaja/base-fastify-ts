echo "build ts to js"
rm -rf "./src/js"
tsc --build "./tsconfig.builder.json"