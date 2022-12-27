import { Button, Form, Input, Select, SelectProps } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const SecretFriend = () => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const onFinish = (values: { names: string[] }) => {
    console.log(values);
    const listExceptions: { [key: string]: string[] } = {};
    listExceptions["hugo"] = ["joana"];

    let shuffledParticipants;
    let ok;
    do {
      ok = true;
      shuffledParticipants = shuffle(values.names);
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
    for (let i = 0; i < values.names.length - 1; i++) {
      secretFriends[values.names[i]] = shuffledParticipants[i + 1];
    }
    secretFriends[values.names[values.names.length - 1]] =
      shuffledParticipants[0];

    console.log(secretFriends);
  };

  function shuffle(array: any): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const options: SelectProps["options"] = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <Form
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
    >
      <Form.List
        name="names"
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
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? "Passengers" : ""}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Name, please",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="Name" style={{ width: "60%" }} />
                </Form.Item>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "20%" }}
                  placeholder="Please select"
                  defaultValue={["a10", "c12"]}
                  onChange={handleChange}
                  options={options}
                />
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
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
  );
};

export default SecretFriend;
