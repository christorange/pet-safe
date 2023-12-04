# pet-safe

- [Ionic React](https://ionicframework.com/docs/react): Build mobile apps with React
- [Vite](https://vitejs.dev/): Build tool
- [TailwindCSS](https://tailwindcss.com/): CSS-in-JS framework, use [cheatsheet](https://tailwindcomponents.com/cheatsheet/) for classes quick lookup
- [DaisyUI](https://daisyui.com/): UI library, works perferctly with TailwindCSS
- [tRPC](https://trpc.io/docs/client/react): Type safe APIs in RPC protocol
- [ReactQuery](https://tanstack.com/query/latest/docs/react/overview): hooks for http requests, integrated with tRPC
- [react-map-gl](https://visgl.github.io/react-map-gl/): Map library, React wrapper on [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/)
## Environment steup
Follow [this guide](https://capacitorjs.com/docs/getting-started/environment-setup) for environemnt setup before development.

Also, install [pnpm](https://pnpm.io/).
```
brew install pnpm
```

We will use pnpm as our package manager for this project, only the pnpm lock file should be tracked with git, **only use `pnpm i` and `pnpm uninstall` to add or remove dependencies**. When running other commands, like `npx ...` ( `pnpm ...` )or `npm run ...` ( `pnpm run...` ), you can freely choose your preferred one since they're equivalent.

Next, install Ionic CLI globally on your machine
```
npm (or use pnpm) install -g @ionic/cli
```

Last, install following VS Code extensions:
- Ionic Snippets
- Tailwind CSS IntelliSense
## Development
After cloning the repository, run `pnpm i` to install all dependencies. Run `npm run build` to build the app, a `dist` folder will be generated.


Run `npx cap add ios` and `npx cap add android` before development. This will generate a build of the app, an `ios` and an `android` directory.

Create a `.env.local` file, define MapBox token as:
```
VITE_MAPBOX_TOKEN = ...
```
Also add API urls:
```
VITE_DEV_API_URL = 'http://0.0.0.0:3475/trpc'
VITE_PROD_API_URL = 'https://petventure-be.up.railway.app/trpc'
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

Everytime the dependencies or capacitor configs are changed, run `npx cap sync`.

After you run `api-export` on backend, run `npm run api-import` here to consume the updated API types.
## Commit guidelines

Write your commit message in this way:

**[type] ( [scope?] ): [description]**

Types:
- feat: A new feature
- fix: A bug fix
- refactor: A code change that neither fixes a bug nor adds a feature
- doc: Documentation changes
- build: Changes that affect the build system or external dependencies
- chore: Other changes that don\'t modify src or test files
- revert: Reverts a previous commit

Scope: Optional, refers to the part of code changed in this commit.