import { createRoute, Link } from '@tanstack/react-router';
import { RootComponent } from './__root';
import { postsQueryOptions } from '@/countries';
import { useSuspenseQuery } from '@tanstack/react-query';

/* const postsCache = [] */

const Index = () => {
	const { data, isFetching } = useSuspenseQuery(postsQueryOptions)
	console.log("🚀 ~ Index ~ postQuery:", data)

	if (isFetching) {
		return <div>Loading...</div>
	}
	return (
		<div className="p-2">
			<h3>Welcome</h3>

			{data.map((post) => (
				<Link to={`/detail/$countryId`} params={{ countryId: post.cca2 }} key={post.name.common} className="p-2 border">
					<h4>{post.name.common}</h4>
					<img src={post.flags.png} alt={post.name.common} />
				</Link>
			))}
		</div>
	)
}

export const Route = createRoute({
	getParentRoute: () => RootComponent,
	path: '/',
	component: Index,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(postsQueryOptions),
})