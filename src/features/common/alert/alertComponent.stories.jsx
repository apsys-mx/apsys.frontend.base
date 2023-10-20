import AlertComponent from "./AlertComponent";

export default {
    title: "AlertComponent",
    component: AlertComponent,
    args: {  
        title: "Alert Title",
        description: "This is an Alert",
        severityType: "warning",
        open: false,
    }
}

const Template = (args) => <AlertComponent {...args} />;

export const InfoAlert = Template.bind({});



