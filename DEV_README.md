# Hurence JSON Datasource Dev guide

## Build

### Required

This plugin requires node 12 or more as pointed in package.json.
It needs yarn 1.22.0, but you just need to have the latest version on your machine as
the version used in this project has been forced locally.

* node 12+
* yarn 1.22+

### build

Once you installed those two tools just run :

```
yarn install
```

Never commit the yarn.lock file unless you made a change in dependencies in package.json. If the file changed checkout the file and re run the
command with the option --pure-lockfile

```
yarn install --pure-lockfile
```

Then run yarn build to generate dist folder files. Those are the files that will be used by grafana to load the plugin.

## Architecture

TODO