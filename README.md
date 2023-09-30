# pet-safe

## Environment steup
Follow [this guide](https://capacitorjs.com/docs/getting-started/environment-setup) for environemnt setup before development.

Also, install [pnpm](https://pnpm.io/).
```
brew install pnpm
```

## Development
After cloning the repository, run `pnpm i` to install all dependencies.
Only use `pnpm add` and `pnpm uninstall` to add or remove dependencies. 

Run `npx cap add ios` and `npx cap add android` before development. This will generate a build of the app, an `ios` and an `android` directory.

Create a `.env.local` file, define MapBox token as:
```
VITE_MAPBOX_TOKEN = ...
```

Develop for ios:
```
npm run dev.ios
```

Develop for Android:
```
npm run dev.android
```

Everytime the dependencies or capacitor configs are changed, run `npx cap sync ios` and `npx sync android`.