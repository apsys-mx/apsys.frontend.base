import AlertComponent from "./AlertComponent";

export default {
    title: "AlertComponent",
    component: AlertComponent,
    args: {  
        title: "Alert Title",
        description: "This is an Alert",
        severityType: "info",
        open: true,
    }
}

const Template = (args) => <AlertComponent {...args} />;

export const InfoAlert = Template.bind({});
InfoAlert.args ={
    title: "Alert Title",
        description: "This is an info alert",
        severityType: "info",
        open: true,
}

export const ErrorAlert = Template.bind({});
ErrorAlert.args ={
    title: "Alert Title",
        description: "This is an error alert",
        severityType: "error",
        open: true,
}

export const WarningAlert = Template.bind({});
WarningAlert.args ={
    title: "Alert Title",
        description: "This is an warnng alert",
        severityType: "warning",
        open: true,
}

export const SuccessAlert = Template.bind({});
SuccessAlert.args ={
    title: "Alert Title",
        description: "This is an success alert",
        severityType: "success",
        open: true,
}


