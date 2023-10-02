# pet-safe

## Environment steup
Follow [this guide](https://capacitorjs.com/docs/getting-started/environment-setup) for environemnt setup before development.

Also, install [pnpm](https://pnpm.io/).
```
brew install pnpm
```

We will use pnpm as our package manager for this project, only the pnpm lock file should be tracked with git, **only use `pnpm add` and `pnpm uninstall` to add or remove dependencies**. When running other commands, like `npx ...` ( `pnpm ...` )or `npm run ...` ( `pnpm run...` ), you can freely choose your preferred one since they're equivalent.

Next, install Ionic CLI globally on your machine
```
npm (or use pnpm) install -g @ionic/cli
```

Last, install following VS Code extensions:
- Ionic
- Ionic Snippets
- Tailwind CSS IntelliSense
## Development
After cloning the repository, run `pnpm i` to install all dependencies. Run `npm run build` to build the app, a `dist` folder will be generated.


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

For the first time of development, if the simulator doesn't show up, run `npx cap open ios/android` to open the workspace in Xcode/Android Studio, run the project there. Then run `npm run dev.ios/android`, this will link the code to simulator and enable hot updates.

Everytime the dependencies or capacitor configs are changed, run `npx cap sync ios` and `npx sync android`.

You can also use the Ionic extension for these procedures.