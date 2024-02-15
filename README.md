# Berghem_Bike

## A Prototype of a Bike Sharing Website, made from scratch.

[Live Demo Website](https://berghem-bike.typotek.space/)

### Credentials

- Username: Stan_Lee
- Password: Matrix1234567@

### ______________________________________________________

Languages used:
- PHP (User management system, Admin and User Dashboard)
- Typescript (Simple responsive system based on user agent and client width)
- Python (To create demo data)
- CSS
- HTML

No outside libraries or frameworks were used in this project.

### What's the purpose of this project?

My main goal was to create a website prototype with a user and admin dashboard to manage bike sharing in Bergamo.
I started this project for the following reasons:

- Learning to work with multiple cooperating languages (Full-stack Development)
- Improving CSS skills by making a simple framework in JS and CSS for mobile responsiveness.
- Learning fundamental PHP by making a user managment system and a simple user/admin dashboard
- Learning TypeScript
- Practicing embedded SQL with PHP (using PDO)
- Learning ~~Google Maps API (It now costs money)~~ Leaflet API
- Learning Ajax (XMLHttpRequests) and long-pooling method
  
I brought this project as thesis for my Diploma in IT.

### Feel free to contact me for any questions!
### Telegram Contact: @Ashra_k

### ______________________________________________________

### Project is setup for Visual Studio Code

### Tools used:

- TSLint
- gts (Google TypeScript Style) (includes ESLint)

### Install dependecies:

```shell
$ npm install
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

remember to not overwrite any file if so is asked.

### Compile

```shell
$ npm run build
```
