import axios from 'redaxios'
import { queryOptions } from '@tanstack/react-query'

export class NotFoundError extends Error {}

type CountryType = {
    flags: {
        png: string,
        svg: string,
        alt: string
    },
	cca2: string,
	flag: string,
    name: {
        common: "South Georgia",
        official: "South Georgia and the South Sandwich Islands",
        nativeName: {
            eng: {
                official: string,
                common: string
            }
        }
    }
}

const fetchCountries = async () => {
  console.info('Fetching posts...')
  await new Promise((r) => setTimeout(r, 500))
  return axios
    .get<Array<CountryType>>('https://restcountries.com/v3.1/all?fields=name,flags,flag')
    .then((r) => r.data.slice(0, 10))
}

const fetchCountryDetails = async (countryId: string) => {
  console.info(`Fetching post with id ${countryId}...`)
  await new Promise((r) => setTimeout(r, 500))
  const post = await axios
    .get<Array<CountryType>>(`https://restcountries.com/v3.1/alpha/${countryId}`)
    .then((r) => r.data)


  if (!post) {
    throw new NotFoundError(`Post with id "${countryId}" not found!`)
  }

  return post
}

export const postQueryOptions = (countryId: string) =>
  queryOptions({
    queryKey: ['posts', { countryId }],
    queryFn: () => fetchCountryDetails(countryId),
  })

export const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetchCountries(),
})