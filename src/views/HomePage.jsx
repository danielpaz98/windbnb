// COMPONENTS
import StayList from "~/components/Stay/StayList";
// HOOKS
import { useSearcherContext } from "~/hooks";
// SERVICES
import { getStays } from "~/services";

export default function HomePage() {
	const { search } = useSearcherContext();
	const stays = getStays({ search });

	return <StayList items={stays} />;
}
