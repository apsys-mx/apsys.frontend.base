import AlertComponent from "./alertComponent";

export default {
    title: "AlertComponent",
    component: AlertComponent,
    args: {  
        title: "Alert Title",
        description: "This is an Alert",
        severityType: "success",
    }
}

const Template = (args) => <AlertComponent {...args} />;

export const InfoAlert = Template.bind({});



