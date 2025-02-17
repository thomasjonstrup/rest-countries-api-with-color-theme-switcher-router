import { Button } from '@/components/ui/button';
import { useDarkMode } from '@/lib/hooks';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Moon } from "lucide-react";

export const RootComponent = () => {
	const {toggleDarkMode} = useDarkMode();
	return (
		<div className="bg-very-light-gray dark:bg-very-dark-blue text-very-dark-blue dark:text-white flex flex-col min-h-screen">
			<header className='shadow-custom-2'>
				<div className='mx-auto container p-4 flex justify-between max-md items-center'>
					<Link to='/' className='[&.active]:font-bold'>
						Where in the world?
					</Link>
					<Button onClick={toggleDarkMode}>
						<Moon className="h-4 w-4 md:h-5 md:w-5 dark:fill-white" />
						<span>Dark Mode</span></Button>
				</div>
			</header>
			<div className="flex-1 mx-auto container max-md">
				<Outlet />
			</div>
			<footer>
				<div className='p-2 flex gap-2 justify-center'>
					<p className="text-center text-xs">Challenge by <a className="text-red" href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. Coded by <a className="text-red" href="https://github.com/thomasjonstrup">Thomas Jonstrup</a>.</p>
				</div>
			</footer>
			<TanStackRouterDevtools />
		</div>
	)
}

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