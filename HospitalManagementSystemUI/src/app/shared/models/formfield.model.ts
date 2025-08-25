export interface FormField {
    name: string;            // field key (ex: patientId, fullName)
    label: string;           // UI label
    type: string;            // input type: text, number, date, select
    options?: any[];      // for dropdowns
    placeholder?: string;    // input placeholder
    validations?: ValidationRule[];
}

export interface ValidationRule {
    name: string;        // required, minlength, pattern, etc.
    value?: any;         // number, regex, etc.
    message: string;     // error message
}

export interface HeaderConfig {
    textAddHeader?: string;
    textEditHeader?: string;
    textDetailHeader?: string;
    textColor?: string;
    headerText?: string;
    headerTextColor?: string;
    addButtonLabel?: string;
    addButtonColor?: string;
    backButtonColor?: string;
    hrColor?: string;
    detailLabelColor?: string;
    submitButtonColor?: string;
    groupLabelColor?: string;
    groupLabelBorderColor?: string;
}
