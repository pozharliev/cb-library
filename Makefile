DOCKER_SERVER_CONTAINER := cb-library-cms-1

generate-types:
	docker exec ${DOCKER_SERVER_CONTAINER} bash -c "npm run generate:types"

generate-templates:
	docker exec ${DOCKER_SERVER_CONTAINER} bash -c "npm run generate:templates"


run-tests:
	docker exec ${DOCKER_SERVER_CONTAINER} bash -c "npm run test"