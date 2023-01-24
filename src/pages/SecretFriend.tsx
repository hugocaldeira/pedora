import {
  Button,
  Form,
  Input,
  Select,
  SelectProps,
  Space,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSecretFriend2 } from "../hooks/useSecretFriend";

const SecretFriend = () => {
  const [name, setName] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);
  const [exceptionsOptions, setExceptionsOptions] = useState<
    SelectProps["options"]
  >([]);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [receivers, setReceivers] = useState<{ [key: string]: string }>({});
  const [form] = Form.useForm();
  const { Text } = Typography;
  const secretFriend2 = useSecretFriend2();

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const onSubmit = (values: {
    participants: { name: string; exceptions: string[] }[];
  }) => {
    secretFriend2.mutate(values, {
      onSuccess: (data) => {
        setReceivers(data.data);
      },
    });
  };

  const changeName = (e: any) => {
    const value = e.target.value;
    setName(value);
  };

  const addName = (value: string) => {
    setNames((names) => {
      return [...(names ?? []), value];
    });
  };

  const removeName = (value: string) => {
    form.validateFields();
    setNames((names) => {
      return names?.filter((name) => name !== value);
    });
  };

  const addExceptionOption = (value: string) => {
    setExceptionsOptions((options) => {
      return [...(options ?? []), { label: value, value: value }];
    });
  };

  const removeExceptionOption = (value: string) => {
    setExceptionsOptions((options) => {
      return options?.filter((option) => option.value !== value);
    });
  };

  const handlerAddName = (addToForm: () => void) => {
    if (
      name &&
      names.filter((nameInTheList) => nameInTheList === name).length === 0
    ) {
      addExceptionOption(name);
      addName(name);
      setName("");
      addToForm();
    }
  };

  const handlerRemoveName = (
    index: number,
    fieldName: number,
    removeFromForm: (fieldName: number) => void
  ) => {
    removeExceptionOption(names[index]);
    removeName(names[index]);
    removeFromForm(fieldName);
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisableSubmit(hasErrors);
  };

  return (
    <>
      <Form
        form={form}
        name="form"
        {...formItemLayoutWithOutLabel}
        onFinish={onSubmit}
        onFieldsChange={handleFormChange}
      >
        <Form.List
          name="participants"
          rules={[
            {
              validator: (_, participants) => {
                if (!participants || participants.length < 3) {
                  return Promise.reject(new Error("At least three names"));
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              <Form.Item>
                <Input
                  placeholder="Name"
                  style={{ width: 150 }}
                  value={name}
                  onChange={changeName}
                  onPressEnter={(e) => {
                    e.preventDefault();
                    handlerAddName(add);
                  }}
                />

                <PlusCircleOutlined
                  type="dashed"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    handlerAddName(add);
                  }}
                />
              </Form.Item>
              {fields.map((field, index) => (
                <Form.Item key={field.key}>
                  <Space>
                    <Form.Item
                      name={[field.name, "name"]}
                      validateTrigger={["onChange", "onBlur"]}
                      initialValue={names[names.length - 1]}
                      noStyle
                    >
                      <Input
                        placeholder="Name"
                        style={{ width: 150 }}
                        readOnly
                      />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "exceptions"]}
                      style={{ width: 200, marginBottom: 0 }}
                      rules={[
                        {
                          validator: (_, exceptionsList) => {
                            if (exceptionsList?.length >= names.length - 1) {
                              return Promise.reject(
                                new Error("Computer says no...")
                              );
                            } else {
                              return Promise.resolve();
                            }
                          },
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        placeholder="Please select exceptions"
                        options={exceptionsOptions?.filter(
                          (option) =>
                            option.value !== exceptionsOptions[index].value
                        )}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        handlerRemoveName(index, field.name, remove);
                      }}
                    />
                    <Form.Item noStyle>
                      <Text>{receivers[names[index]]}</Text>
                    </Form.Item>
                  </Space>
                </Form.Item>
              ))}
              <Form.Item>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={disableSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SecretFriend;
