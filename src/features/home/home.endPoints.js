import { timesheetsApi } from '../../store/timesheet-api'

export const timesheetsEndPoint = timesheetsApi.injectEndpoints({
	endpoints: (builder) => ({
		getTimesheets: builder.query({
			query(params) {
				const { pagination } = params
				var { pageNumber, pageSize } = pagination
				pageNumber = pageNumber ? pageNumber : 0
				pageSize = pageSize ? pageSize : 0
				var url = `Timesheets?sortBy=&sortDirection=&pageNumber=${pageNumber}&pageSize=${pageSize}`
				console.log(`URL::[${url}]`)
				return {
					url: url,
					method: 'GET',
				}
			},
			transformResponse: (response) => {
				return {
					items: response,
					page: 0,
					rowsPerPage: 20,
					rowsCount: response.length,
				}
			},
		}),
	}),
	overrideExisting: true,
})
export const { useGetTimesheetsQuery } = timesheetsEndPoint
