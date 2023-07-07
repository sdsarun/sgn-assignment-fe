import { useEffect, useRef, useState } from "react";
import ChartRace from './ChartRace';
import LoadingPage from "./LoadingPage";

export default function BarRace({ data: rawData }) {
  const dateQuery = Object.keys(rawData[0].cases);
  const dateSplit = dateQuery[dateQuery.length - 1].split("/");
  const month = parseInt(dateSplit[0]);
  const dayEnd = parseInt(dateSplit[1]);
  const year = parseInt(dateSplit[2]);
  const colorLabels = useRef([]);

  const day = useRef(1);
  const [data, setData] = useState(() => {
    rawData.map((e, index) => {
      colorLabels.current.push(`rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`);
      return {
        id: e._id,
        title: e.name,
        value: e.cases[`${month}/${day}/${year}`],
        color: colorLabels.current[index]
      }
    });
  });
  // console.log(rawData);
  // console.log(data);
  // console.log(colorLabels);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updateData = rawData.map((e, index) => {
        // console.log(e);
        return {
          id: e._id,
          title: e.name,
          value: e.cases[`12/${day.current}/21`],
          color: colorLabels.current[index]
        }
      });
      day.current = (day.current) % dayEnd + 1;
      setData(updateData);
    }, 700);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  console.log(day);
  // console.log(data);
  return (
    <div>
      <header className="text-center">
        <h1 className="text-3xl font-bold pt-10 pb-4">Covid Global Cases by SGN</h1>
        <span>Date: {month}/{day.current}/{year}</span>
      </header>
      <main className="flex justify-center items-center">
        <ChartRace data={data}
          gap={2}
          titleStyle={{ font: 'normal 400 13px Arial', color: '#000' }}
          valueStyle={{ font: 'normal 400 11px Arial' }}
        />
      </main>
    </div>
  )
}