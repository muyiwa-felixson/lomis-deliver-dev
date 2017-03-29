BABEL_CMD = node_modules/.bin/babel
WEBPACK_CMD = node_modules/.bin/webpack
WEBPACK_SERVER_CMD = node_modules/.bin/webpack-dev-server
WEBPACK_BUNDLE_CMD = node_modules/.bin/webpack-bundle-size-analyzer

start:
	$(WEBPACK_SERVER_CMD) --config ./webpack/webpack.config.js --port 9006

test:
	NODE_ENV=test karma start --single

build_webpack:
	rm -rf static/dist && rm -rf build && NODE_ENV=production $(WEBPACK_CMD) --config ./webpack/webpack.config.js --display-error-details

build_server:
	rm -rf dist && $(BABEL_CMD) ./src -d ./dist -D

prod:
	NODE_ENV=production node ./index.js

pre_lint:
	cd ./node_modules/ && pwd

post_install:
	rsync pre-commit .git/hooks && chmod 755 .git/hooks/pre-commit

analyze_build:
	NODE_ENV=production $(WEBPACK_CMD) --json --config ./webpack/webpack.config.js  > bundle-stats.json

analyze_json:
	$(WEBPACK_BUNDLE_CMD) bundle-stats.json
