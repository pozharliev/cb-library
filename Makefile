DOCKER_SERVER_CONTAINER := cb-library-server-1

generate-types:
	cd server && npm run generate:types

run-tests:
	sudo docker exec ${DOCKER_SERVER_CONTAINER} bash -c "npm run test"