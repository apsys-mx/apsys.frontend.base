import DropZone from "./dropzone";

export default {
    title: "Dropzone",
    component: DropZone,
    args: {  
        label: "Drop zone",
        error: false, 
        helperText: "Additional Text", 
        dropzoneLabel: null }
}

const Template = (args) => <DropZone {...args} />;

export const Primary = Template.bind({});