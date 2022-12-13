import { ConfigProvider, Layout, theme } from 'antd';
import News from './pages/News';
import { Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import MainMenu from './components/MainMenu';
import { Route } from 'react-router-dom';
import Weather from './pages/Weather';
import UserDetails from './pages/UserDetails';

function App() {
  const { Text } = Typography;
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{ backgroundColor: '#ffffff' }}>
          <Title style={{ textAlign: 'center' }}>PEDORA</Title>
          <MainMenu />
        </Sider>
        <Content style={{ backgroundColor: '#fafafa' }}>
          <Route path='/news'>
            <News />
          </Route>
          <Route path='/weather'>
            <Weather />
          </Route>
          <Route path='/user-details'>
            <News />
          </Route>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
