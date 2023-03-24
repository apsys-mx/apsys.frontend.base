## Establecer conexión con Backend

### Crear archivo api para conexión con Backend

- Crear el archivo `timesheet-api.js` dentro de la carpeta store

```jsx
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const timesheetsApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://localhost:7155/',
	}),
	tagTypes: [],
	reducerPath: ['timesheetsApi'],
	endpoints: () => ({}),
})
```

- La opción `baseQuery` se pasa a la función `fetchBaseQuery` y especifica la configuración predeterminada para realizar solicitudes. En este caso, se especifica una baseUrl de `https://localhost:7155/`.

- La opción `tagTypes` es un array de objetos que define cómo manejar los datos devueltos por los endpoints de la API. Cada objeto debe tener una propiedad `type` y una propiedad `reducer`.

- La opción reducerPath especifica la ruta de acceso al estado en el Redux Store que se utilizará para almacenar los datos devueltos por los endpoints de la API.

- La opción endpoints es una función que devuelve un objeto que contiene definiciones de endpoints. Cada definición de endpoint especifica un método de solicitud HTTP (como get o post) y una ruta de URL.

- En este caso, la función endpoints devuelve un objeto vacío porque no hay definiciones de endpoint definidas. Las definiciones de endpoint se pueden agregar al objeto devuelto por la función endpoints para crear endpoints que permitan realizar solicitudes HTTP a la API.

### Configurar Api en el Store

- Importa `timesheetsApi` en la sección de importación
- Agrega `timesheetsApi` a la configuración de `rootReduce`
- Igualmente agrega en la configuración del `middleware` en la exportación del `store`

```jsx
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

/** Slices import section */
import homeSlice from '../features/home/home.slice'

/** oidc related import section */
import { reducer as oidcReducer } from 'redux-oidc'
import createOidcMiddleware from 'redux-oidc'
import userManager from '../auth/user-manager'
import { timesheetsApi } from './timesheet-api'

const oidcMiddleware = createOidcMiddleware(userManager)

const rootReducer = combineReducers({
	oidc: oidcReducer,
	homeSlice: homeSlice,
	[timesheetsApi.reducerPath]: timesheetsApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			oidcMiddleware,
			timesheetsApi.middleware
		),
	devTools: import.meta.env.DEV,
})
```

### Crear archivo endpoints para realizar las peticiones

- Crear el archivo `timesheet-endpoints.js` dentro de la carpeta timesheets, o editar el archivo `home.endPoints.js`

```jsx
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
		}),
	}),
	overrideExisting: true,
})
export const { useGetTimesheetsQuery } = timesheetsEndPoint
```

- Este es un fragmento de código que utiliza la función `injectEndpoints` de `@reduxjs/toolkit/query` para definir una solicitud de consulta a una API utilizando el `timesheetsApi` creado previamente en el store.

- El método `injectEndpoints` crea endpoints personalizados a partir de un conjunto de definiciones. En este caso, se define el endpoint `getTimesheets` utilizando el método `builder.query()`. Este endpoint se utiliza para obtener una lista de timesheets que se ordenan, filtran y seccionan según los parámetros pasados.

- El método `useGetTimesheetsQuery` se exporta y se utiliza para conectarse al endpoint `getTimesheets` y ejecutar la solicitud de consulta en el componente React. Este método utiliza un `hook` personalizado que se genera automáticamente a partir del endpoint que se definió previamente. Al ejecutarse, devuelve los datos y el estado de la consulta.

- El objeto `params` que se pasa como argumento en la función `query` contiene los parámetros de ordenación, paginación y filtrado. Estos parámetros se utilizan para construir la URL de la solicitud de consulta en la función query. Luego, se retorna un objeto que contiene la URL y el método HTTP utilizado (GET en este caso).

- El parámetro `overrideExisting` en `injectEndpoints` se establece en `true` para permitir la sobrescritura de endpoints existentes con el mismo nombre en caso de que se agreguen nuevos endpoints con el mismo nombre en el futuro.

- En general, este fragmento de código define un endpoint de consulta personalizado para obtener una lista de timesheets desde una API y exporta un `hook` personalizado para conectarse y ejecutar la consulta en un componente `React`.

### Llamar el endpoint en el index

- Importar el endpoint `useGetTimesheetsQuery` en el index, en este caso el archivo `home.jsx`.
- Declara las constantes para el endPoint (`data`, `isLoading`, `isError`, `error`), estas son generales para cada endPoint, se pueden renombrar para distinguir cada propiedad de los diferentes endPoint que se utilicen, como se ve a continuación para la propiedad data (`data: timeSheetsResponse`).
- Agrega las condiciones de `isLoading`, con lo cual muestra el texto `Loading…` mientras se obtiene la respuesta del API, y la condición `isError`, para mostrar el error en caso de que no se pueda obtener respuesta del Api.

```jsx
import React from 'react'
import { useGetTimesheetsQuery } from '../home.endPoints'

/** Import templates */
import DesktopTemplate from './home.template'

/**
 * Home component
 */
const Home = () => {
	const { data: timeSheetsResponse, isLoading, isError, error } = useGetTimesheetsQuery()
	if (isLoading) return <div>Loading...</div>
	if (isError) {
		return <div>{JSON.stringify(error)}</div>
	}
	return <DesktopTemplate />
}

export default Home
```

## Mostrar Tabla con información

### Crear configuración de tabla

- Crea el archivo `configurationTable.jsx` dentro de la carpeta `index`.
- Este archivo contiene la configuración de las columnas que tendrá la table: encabezados, si la columna tiene ordenamiento, el origen de la información `dataSource` el cual es el nombre de la propiedad de la respuesta o `JSON`, si la columna contiene filtros, y el tipo de dato de los filtros (text, date, number).

```jsx
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
```

### Crea componente para la tabla

- Crea el archivo `home.table` vacío por el momento, exporta como `TimesheetsTable`.
- Importa `DataGrid` componente de la sección `common/datagrid`, y `propTypes`.
- Incluye los parámetros del componente, inicialmente `items` y `tableConfig`, define los `propTypes` (tipo de dato de las propiedades) y `defaultProps` (valores por defecto en caso de no enviar la propiedad).

```jsx
//Material
import React from 'react'
import propTypes from 'prop-types'
//Templates
import DataGrid from '../../common/datagrid/data-grid'
//
const TimesheetsTable = ({
	items,
	tableConfig,
}) => {
	return (
		<div>
			<DataGrid headers={tableConfig} data={items} />
		</div>
	)
}
TimesheetsTable.propTypes = {
	items: propTypes.array,
}
TimesheetsTable.defultProps = {
	items: [],
}
export default TimesheetsTable
```
### Pasar la respuesta del Api al componente

- Edité el archivo `home.jsx`, envié la respuesta de ` useGetTimesheetsQuer` a ` DesktopTemplate`. 

```jsx
import React from 'react'
/**Import EndPoints */
import { useGetTimesheetsQuery } from '../home.endPoints'

/** Import templates */
import DesktopTemplate from './home.template'

/**
 * Home component
 */
const Home = () => {
	//:::::::::::::::::::::::::::::::::::::::::::::::::::://
	//:::::::::::::::::(API´s):::::::::::::::::::::::::::://
	const { data: timeSheetsResponse, isLoading, isError, error } = useGetTimesheetsQuery()
	//:::::::::::::::::::::::::::::::::::::::::::::::::::://
	if (isLoading) return <div>Loading...</div>
	if (isError) {
		return <div>{JSON.stringify(error)}</div>
	}
	return <DesktopTemplate {...timeSheetsResponse} />
}

export default Home
```

- Posteriormente en el archivo `home.template.jsx` importe la configuración de la tabla y el componente de la tabla, los cuales se crearon anteriormente.
- Agregue la definición `props` en la constante `HomeTemplate`.
- Incluya el componente de la tabla enviando las configuraciones de la tabla y la respuesta del Api.

```jsx
//React
import React from 'react'
//Material
import { Box } from '@mui/material'
//Component
import TimesheetsTable from './home.table'
import { defaultTableConfigurationTimeSheets } from './configurationTable'

/**
 * Home component
 */
const HomeTemplate = (props) => {
	return (
		<Box>
			<TimesheetsTable tableConfig={defaultTableConfigurationTimeSheets} {...props} />
		</Box>
	)
}

export default HomeTemplate

```

### Personalización de columnas

- Edita `home.table`, importa `useEffect`, `useState` y `moment`.

```jsx
import React, { useEffect, useState } from 'react'
import moment from 'moment'
```

- Crea las constantes para la configuración y actualización de la tabla, las cuales depende de `useSate`.

```jsx
const [localTableConfig, setLocalTableConfig] = useState([])
```

- Utiliza `useEffect` para obtener mapear y actualizar la configuración de la tabla.

```jsx
useEffect(() => {
		if (tableConfig) {
			var local = tableConfig.map((config) => {
				return { ...config }
			})
			setLocalTableConfig(local)
		}
	}, [tableConfig])
```

- Crea la constante para personalizar la configuración ` enhancedConfiguration` la cual realiza el proceso de actualización, dependiendo del `dataSource` se modifica según el nombre indicando la transformación y el valor que se devuelve, en este caso se le da formato alas fechas.

```jsx
const enhancedConfiguration = localTableConfig.map((config) => {
		switch (config.dataSource) {
			case 'startDate':
				config.onRenderProperty = (item) => {
					return moment(item.startDate).format('DD/MM/YYYY')
				}
				break
			case 'endDate':
				config.onRenderProperty = (item) => {
					return moment(item.endDate).format('DD/MM/YYYY')
				}
				break
			default:
		}
		return config
	})
```
- Envié la nueva configuración en el encabezado de `DataGrid`.

```jsx
<DataGrid headers={enhancedConfiguration} data={items} />
```

## Añadir Paginado de tabla

### Añadir Paginado al componente de tabla

- En el archivo `home.template.jsx` importa el componente `Pagination` para la paginación, el cual debería estar en los componentes comunes en la carpeta `common/datagrid`.

```jsx
import Pagination from '../../common/datagrid/pagination'
```

- Agregue las nuevas propiedades que debe recibir el componente para el paginado.

```jsx
const HomeTemplate = ({ response, onChangePage, handleChangeRowsPerPage })
```

-  Asígnelas a su correspondiente componente.

```jsx
<TimesheetsTable tableConfig={defaultTableConfigurationTimeSheets} {...response} />
			<Pagination
				pagination={response}
				onPageChange={onChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
```

### Define estados iniciales de Redux

- Agregue el estado inicial de las propiedades de la paginación en `home.slice.js`, en `initialState`.

```jsx
const initialState = {
	title: 'Hello world',
	toaster: defaultToasterState,
	pagination: {
		rowsCount: 0,
		rowsPerPage: 20,
		page: 0,
	},
}
```

- Crea los métodos correspondientes para `setear` los valores de la paginación.

```jsx
export const homeSlice = createSlice({
	name: 'homeSlice',
	initialState,
	reducers: {
		setTitle: (state, action) => {
			state.title = action.payload
		},
		setToasterState: (state, action) => {
			state.toaster = action.payload
		},
		setPageNumber: (state, action) => {
			state.pagination.page = action.payload
		},
		setPageSize: (state, action) => {
			state.pagination.rowsPerPage = action.payload
		},
	},
})
```

- Exporta los métodos de paginación aciendo referencia al `action` del `slice`.

```jsx
export const { setTitle, setToasterState, setPageNumber, setPageSize } = homeSlice.actions
```

### Definir funciones y callbacks 

- Diríjase al archivo `index` en este caso `home.jsx`, importa los métodos del `slice`, y `useDispatch`.

```jsx
import { useDispatch } from 'react-redux'
import { setPageNumber, setPageSize } from '../home.slice'
```
- Declara la constante de `dispatch`.

```jsx
const dispatch = useDispatch()
```

- Establece las funciones para el paginado: ` handleChangePage ` y ` handleChangeRowsPerPage `.

```jsx
    const handleChangePage = (pageNumber) => {
		dispatch(setPageNumber(pageNumber))
	}
	const handleChangeRowsPerPage = (pageSize) => {
		dispatch(setPageSize(pageSize))
	}
```

- Añade las funciones en los parámetros del `DesktopTemplate`.

```jsx
<DesktopTemplate
			response={timeSheetsResponse}
			onChangePage={handleChangePage}
			handleChangeRowsPerPage={handleChangeRowsPerPage}
		/>
```
