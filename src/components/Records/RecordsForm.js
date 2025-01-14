import React, { forwardRef, useState } from "react";
import { Formik, Form } from "formik";
import { RecordsFormValidation } from "components/Records/RecordsFormValidation";
import { Radio, RadioGroup, useToast } from "@chakra-ui/react";
import { createRecord } from "api/api";
import { useAuthentication } from "hooks/useAuthentication";
import {
  Flex,
  FlexItem,
  InputField,
  SelectField,
  DateField,
} from "components/Common";
import { useCategoriesList } from "hooks/useCategoriesList";
import NumberFormat from "react-number-format";

export const RecordsForm = forwardRef(({ ...rest }, ref) => {
  const toast = useToast();
  const [color, setColor] = useState();
  const {
    user: { user },
  } = useAuthentication();
  const { categories } = useCategoriesList();

  return (
    <Formik
      initialValues={{
        title: "",
        date: "",
        category: {},
        value: "",
        description: "",
        type: "",
      }}
      validationSchema={RecordsFormValidation}
      innerRef={ref}
      onSubmit={(data) => {
        createRecord({
          title: data.title,
          date: new Date(data.date),
          category: { name: data.category, color },
          userId: user.uid,
          value: data.value,
          description: data.description,
          type: data.type,
        }).then(({ status, title, message }) => {
          toast({
            title,
            description: message,
            status,
            duration: 9000,
            isClosable: true,
            position: "bottom-left",
          });
        });
      }}
    >
      {({ values, setFieldValue, ...rest }) => {
        return (
          <Form className="form">
            <div className="form__content">
              <RadioGroup
                name="type"
                id="type"
                onChange={(value) => {
                  setFieldValue("type", value);
                }}
                defaultValue={values.type}
              >
                <Radio value="income">Income</Radio>
                <Radio value="expense">Expense</Radio>
              </RadioGroup>
              <Flex fullWidth>
                <FlexItem lg={"6"}>
                  <InputField name="title" label="Title" type="text" />
                  <SelectField
                    type="text"
                    name="category"
                    label="Categories"
                    options={categories}
                    onChange={(value) => {
                      setFieldValue("category", value.value);
                      setColor(value.color);
                    }}
                    value={values.category}
                  />
                </FlexItem>
                <FlexItem lg={"6"}>
                  <DateField
                    name="date"
                    label="Date"
                    onChange={(dateValue) => {
                      setFieldValue("date", dateValue);
                    }}
                  />
                  <NumberFormat
                    customInput={InputField}
                    name="value"
                    label="Value"
                    thousandSeparator={true}
                    onChange={(e) => {
                      setFieldValue(
                        "value",
                        +e.target.value.replace(/[,.]/gi, "")
                      );
                    }}
                  />
                </FlexItem>
                <FlexItem lg={"12"}>
                  <InputField
                    name="description"
                    label="Description"
                    type="text"
                  />
                </FlexItem>
              </Flex>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
});
