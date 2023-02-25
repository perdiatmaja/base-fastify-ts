docker stop lms_service
docker rm lms_service
docker rmi asasurance-be_lms_service

./install.sh
./build.sh

docker-compose up -d --build --remove-orphans

rm -rf build
rm -rf node_modules
rm -rf package-lock.json