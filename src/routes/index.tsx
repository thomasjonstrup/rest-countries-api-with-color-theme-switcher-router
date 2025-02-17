import { createFileRoute, Link } from '@tanstack/react-router';
import { postsQueryOptions } from '@/countries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Region, regions } from '@/lib/constants';
import { useMemo, useState } from 'react';
import { SearchIcon } from 'lucide-react';

/* const postsCache = [] */

const Index = () => {
	const { data, isFetching } = useSuspenseQuery(postsQueryOptions)

	const [searchValue, setSearchValue] = useState('');
	const [regionValue, setRegionValue] = useState<Region | null>(null);

	const filteredData = useMemo(() => {
		if (!searchValue) {
			return data;
		}

		return data.filter((country) => country.name.common.toLowerCase().includes(searchValue.toLowerCase()) && (!regionValue || country.region === regionValue))

	}, [data, searchValue, regionValue])

	if (isFetching) {
		return <div className="text-center">Loading...</div>
	}

	return (
		<div className='p-2'>
			<div className="flex justify-between gap-4 p-2">
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<div className="relative">
						<div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
						<SearchIcon className="h-4 w-4" />
						</div>
						<Input id="search" type="search"  value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="Search for a country..." className="w-full rounded-lg bg-background pl-8 dark:bg-dark-blue dark:text-white" />
					</div>
				</div>
				<Select onValueChange={(value) => setRegionValue(value as Region)} value={regionValue as string}>
				<SelectTrigger className="w-[180px] dark:bg-dark-blue dark:text-white">
					<SelectValue placeholder="Filter by Region" />
				</SelectTrigger>
				<SelectContent className="dark:bg-dark-blue dark:text-white">
					{regions.map((region) => (
						<SelectItem key={region} value={region}>{region}</SelectItem>
					))}
				</SelectContent>
				</Select>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-2">
				{filteredData.map((country) => (
					<Link to={`/detail/$countryId`} params={{ countryId: country.cca2 }} key={country.name.common}  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-dark-blue dark:border-gray-700">
						<div className="h-[200px] w-full">
							<img className="rounded-t-lg w-full h-full object-cover" src={country.flags.png} alt="" />
						</div>
						<div className="p-5 flex flex-col gap-2">
							<h2 className='font-bold text-2xl'>{country.name.common}</h2>
							<p><strong className='font-semibold'>Population:</strong> {country.population}</p>
							<p><strong className='font-semibold'>Region:</strong> {country.region}</p>
							<p><strong className='font-semibold'>Capital:</strong> {country.capital}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export const Route = createFileRoute('/')({
	component: Index,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(postsQueryOptions),
})
