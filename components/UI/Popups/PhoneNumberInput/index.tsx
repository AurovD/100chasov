import type { FieldProps, useField } from 'formik';
import React from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneNumberInput: React.FC<FieldProps> = ({ field, form, ...props }) => {
    return (
        <div>
            <PhoneInput
                {...field}
                {...props}
                placeholder={"(___)__-__-__"}
                defaultCountry="RU" // Set the default country for formatting
                onChange={(value) => form.setFieldValue(field.name, value)} // Update Formik field value
            />
            {/*<ErrorMessage name={field.name} component="div" className="error" />*/}
        </div>
    );
};

export default PhoneNumberInput;

