import SelectComponet from './select-componet'
let options = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
]
export default {
	title: 'SelectComponet',
	component: SelectComponet,
	args: {
		options: options,
		defaultValue: options[2],
		title: 'Selector',
		placeholder: 'Placeholder..',
		onChange: () => '',
	},
}

const Template = (args) => <SelectComponet {...args} />

export const Primary = Template.bind({})
