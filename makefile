holder: 

docker:
	docker pull mitchellwatkins125/travelwise
	docker run -it --rm -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true mitchellwatkins125/travelwise
