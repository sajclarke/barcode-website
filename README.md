# Barcode Developer Community

Community website for the Barcode developer community

## Quickstart

```sh
# Install dependencies
yarn install

# Enable husky
yarn husky install

# Start dev server
yarn dev
```

## Roadmap

- [x] Configure init NextJS website (with Typescript)
- [ ] Setup firebase configuration
- [ ] Add Chakra-UI
- [ ] Social authentication (Github only)
- [ ] Membership Profiles
- [ ] Community Projects
- [ ] Job board

## Before you start

- Setup new project on firebase.com
- Download the firebase config settings
- Download the service account for firebase admin sdk
- Enable the Cloud Firestore
- Enable Email/Password Authentication (Authentication > Sign-in method > Sign-in providers)
- Enable Github Authentication [see instructions](https://firebase.google.com/docs/auth/web/github-auth?authuser=0)

## Setup Instructions

- Clone repo to local machine
- Copy your firebase config settings to `.env.example` file
- Rename `.env.example` to `.env`
- Install dependencies using `yarn`
- Run locally using `yarn dev`

## Deploy Instructions

- Build for production using `yarn build`
- Upload to hosting provider of choice
