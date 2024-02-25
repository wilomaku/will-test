How to get this to run:

* make sure you have node and npm installed locally
* make sure you have a firebase project with a web-app and real-time database (RTDB) connected
* make a fork of this repository
* clone your repository locally and navigate to its directory
* run `npm install` (vulnerabilities are ok... welcome to the frontend world!)
* change the firebase credentials in Firebase.js
* add user(s) under https://console.firebase.google.com/project/YOUR-PROJECT/authentication/users
* make sure RTDB rules are
```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```
* commit and push changes
* run `npm run deploy` (you might have to sign into github in your command line)
* wait until gh-pages did its thing and log in :)