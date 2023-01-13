import {
  Button,
  Divider,
  Form,
  Input,
  List,
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
  const [options, setOptions] = useState<SelectProps["options"]>([]);
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
    setNames((names) => {
      return names?.filter((name) => name !== value);
    });
  };

  const addOption = (value: string) => {
    setOptions((options) => {
      return [...(options ?? []), { label: value, value: value }];
    });
  };

  const removeOption = (value: string) => {
    setOptions((options) => {
      return options?.filter((option) => option.value !== value);
    });
  };

  return (
    <>
      <Form
        form={form}
        name="form"
        {...formItemLayoutWithOutLabel}
        onFinish={onSubmit}
      >
        <Form.List
          name="participants"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 3) {
                  return Promise.reject(new Error("At least three names"));
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
                    addOption(name);
                    addName(name);
                    setName("");
                    add();
                  }}
                />

                <PlusCircleOutlined
                  type="dashed"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    addOption(name);
                    addName(name);
                    setName("");
                    add();
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
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        placeholder="Please select exceptions"
                        options={options?.filter(
                          (option) => option.value !== options[index].value
                        )}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        removeOption(names[index]);
                        removeName(names[index]);
                        remove(field.name);
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SecretFriend;
