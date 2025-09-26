import { Route, Switch } from 'wouter';
import { LogIn } from './pages/LogIn';
import { Register } from './pages/Register';
import { Home } from './pages/home/Home';

export function App() {
  return (
    <Switch>
      <Route path="/" component={LogIn} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
    </Switch>
  );
}
