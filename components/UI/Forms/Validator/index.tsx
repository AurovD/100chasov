import * as Yup from "yup";

const yupValidator = (schema: Yup.AnySchema) => ({
    onChange: (value: any) => {
        try {
            schema.validateSync(value.value);
            return undefined;
        } catch (err: any) {
            return err.message;
        }
    },
});

export default yupValidator;