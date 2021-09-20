// COMPONENTS
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
// VIEWS
import HomePage from "~/views/HomePage";
// CONTEXTS
import { SearcherContextProvider } from "~/contexts/SearcherContext";

export default function App() {
	return (
		<>
			<main>
				<div className="container mx-auto mt-8 px-3">
					<SearcherContextProvider>
						<Navbar />

						<HomePage />
					</SearcherContextProvider>
				</div>
			</main>

			<Footer />
		</>
	);
}
