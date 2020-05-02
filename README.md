# Berghem_Bike

## A basic Bike Sharing project, made from scratch.

### What's the purpose of this project?

- Working with multiple cooperating languages 
- Learning TypeScript 
- Learning ~~Google Maps API~~ Leaflet  
- Learning Ajax (XMLHttpRequests) and long-pooling method
- Learning fundamental PHP by making a user managment system and a simple user/admin dashboard
- Practicing embedded SQL with PHP
- Improving CSS skills and mobile responsiveness.

Updates:

+ Javascript Bundlers (Rollup)
+ Javascript Minifier (Terser)
  
Also, i might bring this project as thesis for my Diploma.


### Project is setup for Visual Studio Code

### Tools used:

- TSLint
- gts (Google TypeScript Style) (includes ESLint)

### Install dependecies:

```shell
$ npm i typescript rollup terser -g
```

Go to ```ts/``` directory
```shell
$ cd ts
```

Initiliaze Typescript
but do **NOT** overwrite
*tsconfig.json*
```shell
$ tsc --init
```
### install types, needed for the compiler

```shell
$ npm install --save @types/leaflet
```

```shell
$ npm install --save @types/geojson
```

### install rollup plugins needed to make the bundle

Leaflet is built around CommonJS 

```shell
$ npm install @rollup/plugin-commonjs --save-dev
```

node-resolve is used to automatically find dependencies in node_modules

```shell
$ npm install @rollup/plugin-node-resolve --save-dev
```

this plugin is needed to load the package.json of Leaflet

```shell
$ npm install @rollup/plugin-json --save-dev
```

### Install Leaflet 

```shell
$ npm install leaflet
```

### Change "main": "dist/leaflet-src.js" to "src/Leaflet.js"

Go to 
```shell
node_modules/leaflet/package.json
```
then change main (at line 108) into 
```shell
"main": "src/Leaflet.js",
```

This is needed because otherwise the bundler won't be able to find the exports of leaflet 

### Install TSLint 
#### (optional)

```shell
$ npm i tslint --g
```

Initialize TSLint
```shell
$ tslint --init
```

remember to not overwrite any file if so is asked.

### Install gts:
#### (optional)

```shell
$ npx gts init
```

Install dependencies
```shell
$ npm install
```

remember to not overwrite any file if so is asked.

### Compile

```shell
$ npm run build
```
