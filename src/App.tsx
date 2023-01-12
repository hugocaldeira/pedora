import { ConfigProvider, Layout, theme } from "antd";
import News from "./pages/News";
import Title from "antd/es/typography/Title";
import MainMenu from "./components/MainMenu";
import { Route } from "react-router-dom";
import Weather from "./pages/Weather";
import SecretFriend from "./pages/SecretFriend";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  const { Sider, Content } = Layout;

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
          <Sider style={{ backgroundColor: "#ffffff" }}>
            <Title style={{ textAlign: "center" }}>PEDORA</Title>
            <MainMenu />
          </Sider>
          <Content style={{ backgroundColor: "#fafafa", padding: "30px" }}>
            <Route path="/news">
              <News />
            </Route>
            <Route path="/weather">
              <Weather />
            </Route>
            <Route path="/secret-friend">
              <SecretFriend />
            </Route>
          </Content>
        </Layout>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
