# Berghem_Bike

## A Prototype of a Bike Sharing Website, made from scratch.

Languages used:
- PHP
- Typescript
- Python
- CSS
- HTML

No outside libraries or frameworks were used in this project.

### What's the purpose of this project?

The main goal is to create a website prototype with a user and admin dashboard to manage bike sharing in Bergamo.
I started this project for the following reasons:

- Learning to work with multiple cooperating languages (Full-stack Development)
- Improving CSS skills by making a simple framework in JS and CSS for mobile responsiveness.
- Learning fundamental PHP by making a user managment system and a simple user/admin dashboard
- Learning TypeScript
- Practicing embedded SQL with PHP (using PDO)
- Learning ~~Google Maps API (It now costs money)~~ Leaflet API
- Learning Ajax (XMLHttpRequests) and long-pooling method
  
I also brought this project as thesis for my Diploma in IT.

### If you wish to continue the development, i'll always be available to create a new branch, feel free to contact me!
### Telegram Contact: @Ashra_k

### ______________________________________________________

### Admin Credentials

Username: admin

Password: KXLNKzMxDq3n@

### Every fake user credentials

Username (example): Stan_Lee

Password: Matrix1234567@

### ______________________________________________________

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
