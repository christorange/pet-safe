import { QueryClientProvider } from '@tanstack/react-query';
import { reactQueryClient } from './utils/reactQueryClient';
import { trpc, trpcClient } from './api';
import { Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ClerkProvider, SignedIn } from '@clerk/clerk-react';
import MainScreen from './pages/MainScreen';
import Tab2 from './pages/Tab2';
import UserProfile from './pages/UserProfile';
import DetailScreen from './pages/DetailScreen';
import CardsScreen from './pages/CardsScreen';
import './styles/global.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './styles/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <>
    <trpc.Provider client={trpcClient} queryClient={reactQueryClient}>
      <QueryClientProvider client={reactQueryClient}>
        <ClerkProvider publishableKey={import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY}>
          <IonApp>
            <IonReactRouter>
              <IonRouterOutlet>
                <Route exact path="/">
                  <MainScreen />
                </Route>
                <Route exact path="/tab2">
                  <Tab2 />
                </Route>
                <Route 
                  path="/userprofile"
                >
                  <SignedIn>
                    <UserProfile />
                  </SignedIn>
                </Route>
                <Route path='/details'>
                  <DetailScreen />
                </Route>
                <Route path='/browse'>
                  <CardsScreen />
                </Route>
              </IonRouterOutlet>
            </IonReactRouter>
          </IonApp>
        </ClerkProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </>
);

export default App;
