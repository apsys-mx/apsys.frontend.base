// Mui material imports
import { Box, TextField } from '@mui/material'
import DialogComponet from './dialog-componet'
import ErrorIcon from '@mui/icons-material/Error'
export default {
	title: 'DialogComponet',
	component: DialogComponet,
	args: {
		open: true,
		onclose: false,
		disabled: true,
		title: 'Titulo',
		subtitle: 'Subtitle',
		icon: <ErrorIcon sx={{ color: 'primary.main' }} />,
		primaryActionTitle: 'Guardar',
		secondaryActionTitle: 'Cancelar',
		children: (
			<Box>
				<TextField label={'TextField de prueba'} fullWidth />
			</Box>
		),
		contentTitle: ' Descripción del contenido',
	},
}

const Template = (args) => <DialogComponet {...args} />

export const Primary = Template.bind({})
