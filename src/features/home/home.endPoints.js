import { timesheetsApi } from '../../store/timesheet-api'

export const timesheetsEndPoint = timesheetsApi.injectEndpoints({
	endpoints: (builder) => ({
		getTimesheets: builder.query({
			query(params) {
				const { sorting, pagination, filters } = params
				let { sortBy, sortDirection } = sorting
				let { pageNumber, pageSize } = pagination
				pageNumber = pageNumber || 0
				pageSize = pageSize || 0
				sortDirection = sortDirection && sortDirection.length > 0 ? sortDirection : 'desc'
				sortBy = sortBy && sortBy.length > 0 ? sortBy : 'projectName'
				const url = `Timesheets?sortBy=${sortBy}&sortDirection=${sortDirection}&pageNumber=${pageNumber}&pageSize=${pageSize}&${filters}`
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
