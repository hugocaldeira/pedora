import { ConfigProvider, Layout, theme } from 'antd';
import News from './pages/News';
import { Typography } from 'antd';
import styles from './App.module.css';
import Title from 'antd/es/typography/Title';

function App() {
  const { Text } = Typography;
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout>
        <Layout>
          <Sider style={{ backgroundColor: '#ffffff' }}>
            <Title style={{ textAlign: 'center' }}>PEDORA</Title>
          </Sider>
          <Content style={{ backgroundColor: '#fafafa' }}>
            <News />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
