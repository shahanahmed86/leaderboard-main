import './App.css';
import { Header } from './components';
import { Users } from './pages';
import { Switch, Redirect, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
	return (
		<div className='full-height'>
			<CssBaseline />
			<Header />
			<main className='body-wrapper'>
				<Switch>
					<Route path='/users' exact component={Users} />
					<Route render={() => <Redirect to='/users' />} />
				</Switch>
			</main>
		</div>
	);
}

export default App;
