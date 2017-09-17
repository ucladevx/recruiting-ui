# Need a custom image here so that we can incorporate an npm build too
# Alpine is super light
FROM alpine:3.5

# Download and install packages
RUN apk add -U nginx python make g++ nodejs

# Create directories
#   /working is the build directory
#   /static is the directory linked to nginx (serves static content)
RUN mkdir -p /var/www/recruiting/working && \
    mkdir -p /var/www/recruiting/static && \
    mkdir -p /var/www/recruiting/static/build

# Install the required packages to build the frontend
WORKDIR /var/www/recruiting/working
COPY *.json /var/www/recruiting/working/
RUN /usr/bin/node --max_semi_space_size=8 \
                  --max_old_space_size=298 \
                  --max_executable_size=248 \
                  /usr/bin/npm install

# Copy the source files
COPY pages/ /var/www/recruiting/working/pages/
COPY src/ /var/www/recruiting/working/src/
COPY .babelrc *.js Makefile /var/www/recruiting/working/

# build and copy files to server root
RUN make build && \
    cp -rv static/* ../static/ && \
    cp -rv lib/build/* ../static/build/

# Copy the configuration file
RUN mkdir -p /run/nginx
COPY conf/ /etc/nginx/
WORKDIR /var/www/recruiting/static

# Run the server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
