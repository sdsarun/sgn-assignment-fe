import { fetcher } from './utils/utils.js'
import BarRace from './components/BarRace'
import useSWR from "swr";
import LoadingPage from './components/LoadingPage.jsx';

function App() {
  const { data, isLoading, error } = useSWR("http://localhost:4001/api/country", fetcher);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <BarRace data={data} />
    </>
  )
}

export default App
