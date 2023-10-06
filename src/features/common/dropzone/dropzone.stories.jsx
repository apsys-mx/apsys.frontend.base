import DropZone from "./dropzone";

export default {
    title: "Dropzone",
    component: DropZone,
    args: { 
        onChange, 
        acceptValue, 
        label, 
        error, 
        helperText, 
        dropzoneLabel }
}

const Template = (args) => <DropZone {...{ onChange, acceptValue, label, error, helperText, dropzoneLabel }} />;

export const Primary = Template.bind({});