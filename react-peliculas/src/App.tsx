import { BrowserRouter } from 'react-router';
import './App.css';
import Sidebar from './componentes/Sidebar';
import AppRoutes from './AppRoutes';
import Menu from './componentes/Menu';

export default function App() {

	return (
		<>
			<BrowserRouter>

				<Menu />
				<Sidebar />

				<main>
					<AppRoutes />
				</main>

			</BrowserRouter>
		</>
	)
}
