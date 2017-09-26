import Profile from './profile';
import Routes from './routes';
import Essays from './essays';
import Challenges from './challenges';

export default {
	apiHost: process.env.WEBPACK ? 'http://localhost:8080' : '',
	routes:  Routes,
	profile: Profile,
	essays: Essays,
	challenges: Challenges
}