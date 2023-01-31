import logo from "./logo.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query"; // 引入ReactQuery 快取provider
import { ReactQueryDevtools } from "react-query/devtools";
import MainPage from "./pages/MainPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <MainPage />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
