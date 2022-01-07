![inmige](./client/src/images/logo.png)
# Decentralized image hosting and sharing.

* [About the Project](#IntroductionProjectPurposeWhyshouldusercare)
* [Features](#Features)
* [Run locally](#Howtoinstallconfiglaunch)
* [Live App](#Linktoapplicationdemo)
* [Screenshots](#Screenshotsofapp)
* [Technologies used](#Technologiesused)
* [Shout outs](#ResourcesShoutsoutsCredit)


##  <a name='IntroductionProjectPurposeWhyshouldusercare'></a>About The Project
- inmige takes heavy inspiration from the image hosting app [imgur](https://www.imgur.com). The project was inspired by web3 hype and although not entirely decentralized, is a step in that direction.
- inmige was built by [me](https://www.jonathanewarner.com) for an applied computer science intensive (think 2 week hackathon) at Dominican University of California. 

##  <a name='Features'></a>Features
- inmige offers image hosting and sharing features such as commenting, liking, etc.
- inmige stores all uploaded media on the decentralized ipfs network ensuring that your images remain safe.

##  <a name='Howtoinstallconfiglaunch'></a>Run locally
- You can run inmige locally by cloning the repo and running `npm install` in both the client and api folders.
- Then run `npm start` in both the client and api folders too.
- You will need to make sure your local mongodb engine is running for storing user accounts.

##  <a name='Linktoapplicationdemo'></a>Link App
- Check out the live project deployed at: [www.jonathanewarner.com/inmige/](https://www.jonathanewarner.com/inmige/)

##  <a name='Screenshotsofapp'></a>Screenshots of app


##  <a name='Technologiesused'></a>Technologies used
- inmige is built on Mongodb, Express, React, Node.js, (MERN stack). Image storage for the app is powered by the interplanetary file system [IPFS](https://ipfs.io/)

##  <a name='ResourcesShoutsoutsCredit'></a>Shout outs
- Shout out to [imgur](https://www.imgur.com) for design and feature inspiration.
- Shout out to [this](https://dev.to/dabit3/uploading-files-to-ipfs-from-a-web-application-50a) tutorial on uploading images to ipfs using react for getting me started.