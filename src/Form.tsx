import * as React from "react"
import { Form, Input, InputNumber, Button } from "antd";

type ValidationResult = {
  validateStatus: "error" | "success";
  help: string;
}

type FormDataKey = "name" | "email" | "age" | "website"
type FormData = Record<FormDataKey, string>;

export const RegistrationForm: React.FC<{ onSuccess: (values: FormData) => void }> = ({
  onSuccess,
}) => {
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<FormData>({
    "name": "",
    "email": "",
    "age": "",
    "website": "",
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const onSubmit = () => {
    setSubmitted(true);

    if (
      validateField("name", true) === undefined &&
      validateField("email", true) === undefined &&
      validateField("age", true) === undefined &&
      validateField("website", true) === undefined
    ) {
      onSuccess(values);
    }
  };

  const updateField = (field: FormDataKey, val: string) => {
    setValues({
      ...values,
      [field]: val,
    })
  }

  const validateField = (field: FormDataKey, force?: boolean): ValidationResult | undefined => {
    if (!submitted && !force) { return }

    if (values[field]) {
      return
    }

    return {
      validateStatus: "error",
      help: `${field} is required`
    }
  };


  return (
    <div className="form-container">
      <Form
        {...layout}
        name="form-messages"
        onFinish={onSubmit}
      >
        <Form.Item
          data-testid="name"
          name="name"
          label="Name"
          {...validateField("name")}
        >
          <Input onChange={(ev => updateField("name", ev.target.value))} />
        </Form.Item>
        <Form.Item
          data-testid="email"
          name="email"
          label="Email"
          {...validateField("email")}
        >
          <Input onChange={(ev => updateField("email", ev.target.value))} />
        </Form.Item>
        <Form.Item
          data-testid="age"
          name="age"
          label="Age"
          {...validateField("age")}
        >
          <InputNumber onChange={(ev => updateField("age", ev.toString()))} />
        </Form.Item>
        <Form.Item
          data-testid="website"
          name="website"
          label="Website"
          {...validateField("website")}
        >
          <Input onChange={(ev => updateField("website", ev.target.value))} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
