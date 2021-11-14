# Vighnesh's JS Docs

This project is a notes and documentation site which supports code cells 
and rich-text (with markdown) cells too. 

For the code cells, it makes use of in-browser bundling using `esbuild`. Because of 
this, we can make use of any `npm` library, which could run on a browser.

[Visit docs.vighnesh153.com](https://docs.vighnesh153.com)

### Sample image
![](https://i.imgur.com/krgq7mB.png)


### Functionality
* There are 2 root directories in the explorer panel. 
  - `public`
  - `private`
* `public`
  - read: all
  - write: admins
* `private`
    - read: admins
    - write: admins
* Admin emails configured in `constants/configuration.js` 
and `firestore.rules` file.
* Admins can create any file and folder inside any folder. Supports 
any level of nesting. Each file or folder can be deleted via the 
delete button from the explorer actions. (File/Folder needs to be 
focussed to do that)
* Admins can also change the name of the file or folder by clicking the
edit button from the explorer actions. (File/Folder needs to be 
focussed to do that) 
* Refresh button in the explorer-actions is just to refreshing the 
explorer-tree of files and folders.
* In each file, you can create any number of rich-text or code cells, 
move them around, delete them if not needed, or update them.
* The code cells supports javascript (with JSX) and you can import 
any library from NPM (which would work in browser), and play around 
with it. Uses in-browser transpiling for running the code cells using 
`esbuild`.
* To save the changes, you need to **COME OUT OF EDIT MODE FROM THE CELLS** 
and hit (CMD + S). If you use this on Windows, you can configure the
(CTRL + S) key-binding for save in the code.
* Login to the portal via Google (Firebase integration). Click on the 
google icon in the top-right on the NavBar to login.


### Note to general users
* You will only see the cells. You can edit them, but you will lose the 
changes on refresh. Clone this project for yourself to have your own 
Notes website. Check the "Want to use this for yourself?" section to learn 
how you can use it for yourself.
* You cannot create/delete files or folders or cells in my build. 


### Tools
##### Tech stack
* React
* NextJS
* Material UI
* Firebase for backend as a service
  - Google Login
  - Firestore for storing data
  - Firestore rules for security
* Vercel for deployment
* Github for version control

##### Major libraries used
* Material UI
* Monaco Editor (React)
* Remirror (rich-text editor)
* axios
* esbuild-wasm
* react-resizable
* react-spring
* react-toastify
* firebase


### Want to use this for yourself?
##### First steps
* Fork the repository (duh!)

##### Setup Firebase
* Create a firebase project.
* Add the firebase-configuration in the `constants/configuration.js` file.
* Update the admin email addresses to your google email addresses in both 
`constants/configuration.js` and `firestore.rules` files.
* The firestore rules are automatically updated. You have to create a 
firestore database in firebase and add these rules to that.

##### Deployment
You can choose any provider you like. Your options are AWS, Netlify, etc. 
I used Vercel and the following are the steps in brief.
* Connect your repo to Vercel to deploy the `main` branch 
automatically, everytime you make a push to it. 
* In Vercel, you can also customize the domain.

##### Final steps
* Configure the Firebase authentication to allow-list your domain 
where you deploy. Also, while developing locally, allow-list `localhost` 
in Firebase authentication too so that you can login locally and update 
stuff.


### Liked this and/or found this useful?
* Drop a star ⭐️ on this repo. 
* Connect with me on [LinkedIn](https://www.linkedin.com/in/vighnesh153/). Would love to chat about this.


### Found issues or have any questions?
* Feel free to open a ticket in Github issues. I would be happy to assist.



## Thanks for taking time to go through this. It means a lot to me. 🙏😍🥺 
