export const defaultTableConfigurationTimeSheets = [
	{
		title: 'Codigo del proyecto',
		sortable: true,
		dataSource: 'projectCode',
		isActiveFilter: true,
		filterType: 'text',
	},
	{
		title: 'Nombre del proyecto',
		sortable: true,
		dataSource: 'projectName',
		isActiveFilter: true,
		filterType: 'Text',
	},
	{
		title: 'Cliente',
		sortable: true,
		dataSource: 'client',
	},
	{
		title: 'Descripción',
		sortable: true,
		dataSource: 'description',
		isActiveFilter: true,
		filterType: 'TEXT',
	},
	{
		title: 'Tarea',
		sortable: true,
		dataSource: 'task',
	},
	{
		title: 'Usuario',
		sortable: true,
		dataSource: 'userName',
	},
	{
		title: 'Correo',
		sortable: true,
		dataSource: 'email',
	},
	{
		title: 'Fecha de inicio',
		sortable: true,
		dataSource: 'startDate',
		isActiveFilter: true,
		filterType: 'Date',
	},
	{
		title: 'Fecha de fin',
		sortable: true,
		dataSource: 'endDate',
		isActiveFilter: true,
		filterType: 'date',
	},
	{
		title: 'Duración',
		sortable: true,
		dataSource: 'duration',
		isActiveFilter: true,
		filterType: 'NUMBER',
	},
]
