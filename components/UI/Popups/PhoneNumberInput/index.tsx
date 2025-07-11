import React from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import type { E164Number } from 'libphonenumber-js';

type PhoneNumberInputProps = {
    name: string;
    value: E164Number | undefined;
    onChange: (value: E164Number | undefined) => void;
    className?: string;
};

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
                                                               name,
                                                               value,
                                                               onChange,
                                                               className,
                                                           }) => {
    return (
        <PhoneInput
            name={name}
            value={value}
            onChange={onChange}
            placeholder="(___)__-__-__"
            defaultCountry="RU"
            className={className}
        />
    );
};

export default PhoneNumberInput;
