import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import AthleteList from './pages/AthleteList';
import AddAthlete from './pages/AddAthlete';
import AthleteDetails from './pages/AthleteDetails';
import { AthleteProvider } from './context/AthleteContext'; // Import the AthleteProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UpdateAthlete from './pages/UpdateAthlete';

setupIonicReact();

const queryClient = new QueryClient();

const App: React.FC = () => (
  <IonApp>
    <QueryClientProvider client={queryClient}>
      <AthleteProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/" component={AthleteList} />
            <Route exact path="/add-athlete" component={AddAthlete} />
            <Route exact path="/edit-athlete/:id" component={UpdateAthlete} />
            <Route
              exact
              path="/athlete-details/:id"
              component={AthleteDetails}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </AthleteProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </IonApp>
);

export default App;
