import { postQueryOptions } from '@/countries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/detail/$countryId')({
	component: RouteComponent,
	loader: async ({ context: { queryClient }, params: { countryId } }) =>
		queryClient.ensureQueryData(postQueryOptions(countryId)),
})

function RouteComponent() {
	const { countryId } = Route.useParams();
	const { data, isFetching } = useSuspenseQuery(postQueryOptions(countryId))
	console.log("🚀 ~ Index ~ postQuery:", data)

	if (isFetching) {
		return <div>Loading...</div>
	}

	if(!data || data.length === 0) {
		return <div>Country not found</div>
	}

	const { name, flags } = data[0];

	return (
		<div className="p-2 border">
			<h1>{name.common}</h1>
			<img src={flags.png} alt={name.common} />
		</div>
	)
}