import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  SelectProps,
  Space,
  Typography,
} from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  RightOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useSecretFriend2 } from "../hooks/useSecretFriend";

type Participant = { name: string; exceptions: string[] };
type Participants = Participant[];

const SecretFriend = () => {
  const [name, setName] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);

  const [exceptionsOptions, setExceptionsOptions] = useState<
    SelectProps["options"]
  >([]);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [receivers, setReceivers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();
  const { Text } = Typography;
  const secretFriend2 = useSecretFriend2();

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const onSubmit = (values: { participants: Participants }) => {
    setIsLoading(true);
    setIsModalOpen(true);
    secretFriend2.mutate(values, {
      onSuccess: (data) => {
        setReceivers(data.data);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  const changeName = (e: any) => {
    const value = e.target.value;
    setName(value);
  };

  const addName = (value: string) => {
    form.validateFields();
    setNames((names) => {
      return [...(names ?? []), value];
    });
  };

  const removeName = (value: string) => {
    let participantsClean: Participants = [];
    const participants: Participants = form.getFieldsValue().participants;
    participants.forEach((participant) => {
      participantsClean.push({
        name: participant.name,
        exceptions: participant.exceptions?.filter((p) => p !== value),
      });
    });
    form.setFieldsValue({ participants: participantsClean });
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

  const itemFormValidator = (exceptionsList: string[]) => {
    const participants: Participants = form.getFieldsValue().participants;
    let a: string[] = [];
    participants?.forEach((participant) => {
      participant?.exceptions?.forEach((exception) => {
        a.push(exception);
      });
    });
    const count: { [key: string]: number } = {};
    for (const element of a) {
      count[element] = count[element] ? count[element] + 1 : 1;
    }
    for (const key in count) {
      if (count.hasOwnProperty(key) && count[key] >= participants.length - 1) {
        return Promise.reject(new Error("Computer says no, no..."));
      }
    }
    if (exceptionsList?.length >= names.length - 1) {
      return Promise.reject(new Error("Computer says no..."));
    }
    return Promise.resolve();
  };

  const formListValidator = (participants: Participants) => {
    if (!participants || participants.length < 3) {
      return Promise.reject(new Error("At least three names"));
    } else {
      return Promise.resolve();
    }
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
              validator: (_, participants: Participants) => {
                return formListValidator(participants);
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              <Form.Item>
                <Row gutter={16} align="middle">
                  <Col span={8}>
                    <Input
                      placeholder="Name"
                      style={{ width: "100%" }}
                      value={name}
                      onChange={changeName}
                      onPressEnter={(e) => {
                        e.preventDefault();
                        handlerAddName(add);
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <PlusCircleOutlined
                      type="dashed"
                      style={{ fontSize: "20px", color: "blue" }}
                      onClick={() => {
                        handlerAddName(add);
                      }}
                    />
                  </Col>
                </Row>
                <Divider />
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
                            return itemFormValidator(exceptionsList);
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
                      style={{ fontSize: "20px", color: "red" }}
                      onClick={() => {
                        handlerRemoveName(index, field.name, remove);
                      }}
                    />
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
          <Button
            type="primary"
            htmlType="submit"
            disabled={disableSubmit}
            loading={isLoading}
          >
            Draw
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Results"
        open={isModalOpen && !isLoading}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Card>
          {Object.keys(receivers).map((key) => (
            <p>
              <Space>
                <Text> {key}</Text>
                <RightOutlined />
                <Text>{receivers[key]}</Text>
              </Space>
            </p>
          ))}
        </Card>
      </Modal>
    </>
  );
};

export default SecretFriend;
