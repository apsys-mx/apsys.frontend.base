import { timesheetsApi } from '../../store/timesheet-api'

export const timesheetsEndPoint = timesheetsApi.injectEndpoints({
	endpoints: (builder) => ({
		getTimesheets: builder.query({
			query(params) {
				const { sorting, pagination, filters } = params
				var { sortBy, sortDirection } = sorting
				var { pageNumber, pageSize } = pagination
				pageNumber = pageNumber ? pageNumber : 0
				pageSize = pageSize ? pageSize : 0
				sortDirection = sortDirection && sortDirection.length > 0 ? sortDirection : 'desc'
				sortBy = sortBy && sortBy.length > 0 ? sortBy : 'projectName'
				var url = `Timesheets?sortBy=${sortBy}&sortDirection=${sortDirection}&pageNumber=${pageNumber}&pageSize=${pageSize}&${filters}`
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
