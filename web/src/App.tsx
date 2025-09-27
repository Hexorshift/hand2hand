import { Route, Switch } from 'wouter';
import { LogIn } from './pages/LogIn';
import { Register } from './pages/Register';
import { Home } from './pages/home/Home';
import { Profile } from './pages/profile/Profile';
import { Create } from './pages/create/Create';

export function App() {
  return (
    <Switch>
      <Route path="/" component={LogIn} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/create" component={Create} />
    </Switch>
  );
}
