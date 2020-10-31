
echo "*********************************************************************************"
echo "*********************************************************************************"
echo "Building and starting trash-bin-service"
docker image build --tag trash-bin-service:$1 .
docker container run -p 3000:3000 --name trash-bin-service trash-bin-service:$1
