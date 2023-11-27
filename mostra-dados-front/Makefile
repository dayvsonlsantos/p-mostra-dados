# Set up the Dockerfile requirements.
file:
	docker build -t dockerfile . 

# Bring up/start the docker-compose.
up:
	docker-compose up

# Stop the docker-compose.
stop:
	docker-compose stop

# To stop the container, its volumes, and anything related to it.
# Remove the image created by the docker-compose."
kill:
	docker-compose down --volumes --remove-orphans
	docker rmi angular_04_echarts-front

# Run make stop and make kill.
down:
	make stop
	make kill

# Run make stop and make kill, then restart the docker-compose.
remake:
	make stop
	make kill
	docker-compose up

# Stop and restart the docker-compose
edit:
	make down
	make up