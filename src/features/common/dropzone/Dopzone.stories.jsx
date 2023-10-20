import DropZone from "./Dropzone";

export default {
    title: "Dropzone",
    component: DropZone,
    args: {  
        label: "Drop zone",
        action: "Additional Text", 
        error: false,
        icon :  null }
}

const Template = (args) => <DropZone {...args} />;

export const Primary = Template.bind({});