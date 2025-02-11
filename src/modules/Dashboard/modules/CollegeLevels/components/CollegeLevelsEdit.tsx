import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikReactSelect, {
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButtons.module.css";
import { type } from "os";
import { editCollegeLevels } from "../apis";
import { levelCount } from "../Utisl";

type Props = {
    onClose: any;
    org_id: string;
    refetch?: Function;
};

const CollegeLevelsEdit = (props: Props) => {
    console.log(props.org_id);
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                // igName: name
                level: ""
            }}
            validationSchema={Yup.object({
                level: Yup.number().required("Required")
            })}
            onSubmit={values => {
                (async () => {
                    await editCollegeLevels(props.org_id, values);
                    if (props.refetch) props.refetch();
                    props.onClose(null);
                })();
            }}
        >
            <Form className={styles.form}>
                <FormikReactSelect
                    name="level"
                    label="Levels"
                    options={[...new Array(levelCount).keys()].map(val => ({
                        label: (val + 1).toString(),
                        value: val + 1
                    }))}
                    isClearable
                    isSearchable
                />

                <div className={styles.buttonContainer}>
                    <MuButton
                        type="button"
                        className={`${mustyles.btn} ${styles.decline}`}
                        text={"Decline"}
                        onClick={() => {
                            props.onClose(null);
                        }}
                    />
                    <MuButton
                        className={`${mustyles.btn} ${styles.confirm}`}
                        text="Confirm"
                        type="submit"
                    />
                </div>
            </Form>
        </Formik>
    );
};

export default CollegeLevelsEdit;
