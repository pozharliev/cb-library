DOCKER_SERVER_CONTAINER := cb-library-cms-1

generate-types:
	docker exec ${DOCKER_SERVER_CONTAINER} bash -c "npm run generate:types"

run-tests:
	docker exec ${DOCKER_SERVER_CONTAINER} bash -c "npm run test"