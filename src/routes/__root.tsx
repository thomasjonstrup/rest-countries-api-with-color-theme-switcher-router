import { Button } from '@/components/ui/button';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const RootComponent = () => (
		<>
			<header>
				<div className='p-2 flex justify-between'>
					<Link to='/' className='[&.active]:font-bold'>
						Where in the world?
					</Link>
					<Button>Dark Mode</Button>
				</div>
			</header>
			<Outlet />
			<footer>
				<div className='p-2 flex gap-2'>
					<div className="text-center text-xs">Challenge by <a class="text-red" href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. Coded by <a className="text-red" href="https://github.com/thomasjonstrup">Thomas Jonstrup</a>.</div>
				</div>
			</footer>
			<TanStackRouterDevtools />
		</>
	)

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    )
  },
})