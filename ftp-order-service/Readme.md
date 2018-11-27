#Steps to deploy project

##install dependencies in root folder
sudo npm run install

##install dependencies in function folder
sudo npm run install

##login to firebase
sudo firebase login

## firebase init
### select below options and enter. 
 ◯ Functions: Configure and deploy Cloud Functions
 ◯ Hosting: Configure and deploy Firebase Hosting sites

 Do not overrite index.ts, functions folder and package.json file. 
 Only generate following files
  tsConfig.json
  tslint.json

  ### hosting firebase functions
  sudo firebase deploy

  ### deploying only firebase functions
  npm run deploy




