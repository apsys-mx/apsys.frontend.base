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
import { timesheetsApi } from '../store/timesheet-api'

export const timesheetsEndpoint = timesheetsApi.injectEndpoints({
	endpoints: (builder) => ({
		getTimesheets: builder.query({
			query(params) {
				const { sorting, pagination } = params
				var { sortBy, sortDirection } = sorting
				var { pageNumber, pageSize } = pagination
				sortDirection = sortDirection && sortDirection.length > 0 ? sortDirection : 'desc'
				sortBy = sortBy && sortBy.length > 0 ? sortBy : 'projectName'
				pageNumber = pageNumber ? pageNumber : 0
				pageSize = pageSize ? pageSize : 0
				var url = `Timesheets?sortBy=${sortBy}&sortDirection=${sortDirection}&pageNumber=${pageNumber}&pageSize=${pageSize}`
				console.log(`URL::[${url}]`)
				return {
					url: url,
					method: 'GET',
				}
			},
		}),
	}),
	overrideExisting: true,
})

export const { useGetTimesheetsQuery } = timesheetsEndpoint
```

- Este es un fragmento de código que utiliza la función `injectEndpoints` de `@reduxjs/toolkit/query` para definir una solicitud de consulta a una API utilizando el `timesheetsApi` creado previamente en el store.

- El método `injectEndpoints` crea endpoints personalizados a partir de un conjunto de definiciones. En este caso, se define el endpoint `getTimesheets` utilizando el método `builder.query()`. Este endpoint se utiliza para obtener una lista de timesheets que se ordenan, filtran y seccionan según los parámetros pasados.

- El método `useGetTimesheetsQuery` se exporta y se utiliza para conectarse al endpoint `getTimesheets` y ejecutar la solicitud de consulta en el componente React. Este método utiliza un `hook` personalizado que se genera automáticamente a partir del endpoint que se definió previamente. Al ejecutarse, devuelve los datos y el estado de la consulta.

- El objeto `params` que se pasa como argumento en la función `query` contiene los parámetros de ordenación, paginación y filtrado. Estos parámetros se utilizan para construir la URL de la solicitud de consulta en la función query. Luego, se retorna un objeto que contiene la URL y el método HTTP utilizado (GET en este caso).

- El parámetro `overrideExisting` en `injectEndpoints` se establece en `true` para permitir la sobrescritura de endpoints existentes con el mismo nombre en caso de que se agreguen nuevos endpoints con el mismo nombre en el futuro.

- En general, este fragmento de código define un endpoint de consulta personalizado para obtener una lista de timesheets desde una API y exporta un `hook` personalizado para conectarse y ejecutar la consulta en un componente `React`.
