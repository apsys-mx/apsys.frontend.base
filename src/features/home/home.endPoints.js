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
				//var url2 = `Timesheets?query=8||Description||ProjectCode&pageNumber=1&pageSize=30&sortBy=projectName&sortDirection=asc`
				return {
					url: url,
					method: 'GET',
				}
			},
		}),
		getCatalogs: builder.query({
			query(fieldName) {
				return {
					url: `Timesheets/catalogs/${fieldName}`,
					method: 'GET',
				}
			},
		}),
	}),
	overrideExisting: true,
})
export const { useGetTimesheetsQuery, useGetCatalogsQuery } = timesheetsEndPoint
