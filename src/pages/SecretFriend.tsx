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

const SecretFriend = () => {
  const [name, setName] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [receivers, setReceivers] = useState<{ [key: string]: string }>({});
  const [form] = Form.useForm();
  const { Text } = Typography;

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const onFinish = (values: {
    participants: { name: string; exceptions: string[] }[];
  }) => {
    const participants = values.participants;

    const listExceptions: { [key: string]: string[] } = {};
    const listNames: string[] = [];

    participants.forEach((participant) => {
      listNames.push(participant.name);
      listExceptions[participant.name] = participant.exceptions;
    });

    console.log("listNames", listNames);
    console.log("listExceptions", listExceptions);

    let shuffledParticipants;
    let ok;
    do {
      ok = true;
      shuffledParticipants = shuffle(listNames);
      const a = shuffledParticipants;
      for (let i = 0; i < shuffledParticipants.length; i++) {
        if (
          listExceptions[shuffledParticipants[i]]?.some(
            (elem) => elem === a[i + 1]
          )
        ) {
          ok = false;
        }
      }
      if (
        listExceptions[
          shuffledParticipants[shuffledParticipants.length - 1]
        ]?.some((elem) => elem === a[0])
      ) {
        ok = false;
      }
    } while (!ok);

    const secretFriends: { [key: string]: string } = {};
    for (let i = 0; i < participants.length - 1; i++) {
      secretFriends[listNames[i]] = shuffledParticipants[i + 1];
    }
    secretFriends[listNames[listNames.length - 1]] = shuffledParticipants[0];

    console.log(secretFriends);
    setReceivers(secretFriends);
  };

  function shuffle(array: any): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

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
    console.log("addOptions", value);
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
        onFinish={onFinish}
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
                  onChange={changeName}
                  onPressEnter={() => {
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
      <Divider orientation="left">To do list</Divider>
      <List
        bordered
        dataSource={[
          "validar se o nome a introduzido já existe",
          "quando se apaga um participante, tem de se apagar tb nas excepções",
          "options e names podem ser a mesma coisa?",
          "passar a função que cálcula os amigos secretos para as functions da digital ocean e em Node JS",
        ]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
};

export default SecretFriend;
