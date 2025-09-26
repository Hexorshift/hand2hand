import { Route, Switch } from 'wouter';
import { LogIn } from './pages/LogIn';
import { Register } from './pages/Register';

export function App() {
  return (
    <Switch>
      <Route path="/" component={LogIn} />
      <Route path="/register" component={Register} />
    </Switch>
  );
}
