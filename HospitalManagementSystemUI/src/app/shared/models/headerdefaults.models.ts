import { HeaderConfig } from "./formfield.model";

export class HeaderDefaults {
    static patientHeader: HeaderConfig = {
        textAddHeader: 'Add Patient',
        textEditHeader: 'Update Patient',
        textDetailHeader: 'Patient Details',
        textColor: 'text-indigo-600',
        headerText: 'Patient Management',
        headerTextColor: 'text-indigo-500',
        addButtonLabel: 'Add Patient',
        addButtonColor: 'bg-indigo-500 hover:bg-indigo-600',
        backButtonColor: 'bg-indigo-200 hover:bg-indigo-400',
        hrColor: 'border-indigo-400',
        detailLabelColor: 'text-indigo-500',
        submitButtonColor: 'bg-indigo-500 hover:bg-indigo-600',
        groupLabelColor:'text-orange-400',
        groupLabelBorderColor:'border-gray-300'
    };

    static doctorHeader: HeaderConfig = {
        textAddHeader: 'Add Doctor',
        textEditHeader: 'Update Doctor',
        textDetailHeader: 'Doctor Details',
        textColor: 'text-green-600',
        headerText: 'Doctor Management',
        headerTextColor: 'text-green-500',
        addButtonLabel: 'Add Doctor',
        addButtonColor: 'bg-green-500 hover:bg-green-600',
        backButtonColor: 'bg-green-200 hover:bg-green-400',
        hrColor: 'border-green-400',
        detailLabelColor: 'text-green-500',
        submitButtonColor: 'bg-green-500 hover:bg-green-600',
        groupLabelColor:'text-pink-500',
        groupLabelBorderColor:'border-gray-300'
    };

    static appointmentHeader: HeaderConfig = {
        textAddHeader: 'Add Appointment',
        textEditHeader: 'Update Appointment',
        textDetailHeader: 'Appointment Details',
        textColor: 'text-purple-600',
        headerText: 'Appointment Management',
        headerTextColor: 'text-purple-500',
        addButtonLabel: 'Add Appointment',
        addButtonColor: 'bg-purple-500 hover:bg-purple-600',
        backButtonColor: 'bg-purple-200 hover:bg-purple-400',
        hrColor: 'border-purple-400',
        detailLabelColor: 'text-purple-600',
        submitButtonColor: 'bg-purple-500 hover:bg-purple-600',
        groupLabelColor:'text-green-600',
        groupLabelBorderColor:'border-gray-300'
    };

    static userHeader: HeaderConfig = {
        textAddHeader: 'Add User',
        textEditHeader: 'Update User',
        textDetailHeader: 'User Details',
        textColor: 'text-teal-500',
        headerText: 'User Management',
        headerTextColor: 'text-teal-500',
        addButtonLabel: 'Add User',
        addButtonColor: 'bg-teal-500 hover:bg-teal-600',
        backButtonColor: 'bg-teal-200 hover:bg-teal-400',
        hrColor: 'border-teal-400',
        detailLabelColor: 'text-teal-600',
        submitButtonColor: 'bg-teal-500 hover:bg-teal-600',
        groupLabelColor:'text-amber-500',
        groupLabelBorderColor:'border-gray-300'
    };
}