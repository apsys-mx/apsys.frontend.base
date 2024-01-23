import { backendApi } from '../../store/backend-api'

export const homeEndpoint = backendApi.injectEndpoints({
	endpoints: (builder) => ({
		getHelloWorld: builder.query({
			query() {
				return {
					url: `home/hello`,
					method: 'GET',
				}
			},
		}),
	}),
	overrideExisting: true,
})
export const { useGetHelloWorldQuery } = homeEndpoint
