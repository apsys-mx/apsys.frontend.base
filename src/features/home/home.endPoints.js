import { timesheetsApi } from '../../store/timesheet-api'

export const timesheetsEndPoint = timesheetsApi.injectEndpoints({
	endpoints: (builder) => ({
		getTimesheets: builder.query({
			query(params) {
				var url = `Timesheets?sortBy=&sortDirection=&pageNumber=&pageSize=`
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
