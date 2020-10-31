
echo "*********************************************************************************"
echo "*********************************************************************************"
echo "Building and starting postgres-dal-service"
docker image build --tag postgres-dal-service:$1 .
docker container run -p 8000:8000 --name postgres-dal-service postgres-dal-service:$1
