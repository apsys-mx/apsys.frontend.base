import propTypes from 'prop-types'

/**
 * Define the proptypes related to the datagrid configuration
 */
const tableConfigProps = propTypes.shape({
	title: propTypes.oneOfType([propTypes.string, propTypes.node]),
	dataSource: propTypes.string,
	sortable: propTypes.bool,
	onRenderItem: propTypes.func,
	width: propTypes.any,
	visible: propTypes.bool,
	dataType: propTypes.oneOf(['string', 'date', 'currency', 'number', null, undefined]),
})

export { tableConfigProps }
