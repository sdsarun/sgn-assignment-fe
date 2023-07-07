import { fetcher } from './utils/utils.js'
import BarRace from './components/BarRace'
import useSWR from "swr";
import LoadingPage from './pages/LoadingPage.jsx';

function App() {
  const { VITE_HOST, VITE_API } = import.meta.env;

  const cacheData = JSON.parse(localStorage.getItem("data"));
  if (cacheData) {
    return <BarRace data={cacheData} />
  } 

  const { data, isLoading, error } = useSWR(VITE_HOST + VITE_API, fetcher);
  if (isLoading) {
    return <LoadingPage />;
  }
  
  if (error) {
    return "!Oops, Something happening on backend server do something else and comeback again.";
  }
  
  localStorage.setItem("data", JSON.stringify(data));
  
  return (
    <>
      <BarRace data={data} />
    </>
  )
}

export default App
