import { Card, Descriptions } from 'antd';
import Link from 'antd/es/typography/Link';
import { GithubOutlined } from '@ant-design/icons';

const About = () => {
  return (
    <Card title='About PEDORA' style={{ width: '50%' }}>
      <Descriptions column={1}>
        <Descriptions.Item label='Author'>Hugo Caldeira</Descriptions.Item>
        <Descriptions.Item label='Repository'>
          <Link href='https://github.com/hugocaldeira/pedora' target='_blank'>
            <GithubOutlined /> GitHub
          </Link>
        </Descriptions.Item>
        <Descriptions.Item label='Libraries '>
          React, Ant Design, React-Query, Axios
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default About;
