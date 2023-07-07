import { useEffect, useRef, useState } from "react";
import ChartRace from './ChartRace';
import { generateRGB } from "../utils/utils";

export default function BarRace({ data: rawData }) {
  const dateQuery = Object.keys(rawData[0].cases);
  const dateSplit = dateQuery[dateQuery.length - 1].split("/");
  const month = parseInt(dateSplit[0]);
  const dayEnd = parseInt(dateSplit[1]);
  const year = parseInt(dateSplit[2]);
  const colorLabels = useRef([]);
  const delay = 800;

  const [day, setDay] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDay(prevDay => (prevDay % dayEnd) + 1);
    }, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [dayEnd]);

  useEffect(() => {
    const updateData = rawData.map((e, index) => {
      return {
        id: e._id,
        title: e.name,
        value: e.cases[`${month}/${day}/${year}`],
        color: colorLabels.current[index]
      };
    });

    setData(updateData);
  }, [day]);

  useEffect(() => {
    rawData.forEach(() => {
      const { r, g, b } = generateRGB(255, 255, 255, 70);
      colorLabels.current.push(`rgb(${r},${g},${b})`);
    });

    setData(prevData => [...prevData]); 
  }, []);

  return (
    <div>
      <header className="text-center">
        <h1 className="text-3xl font-bold pt-10 pb-4">Covid Global Cases by SGN</h1>
        <span>Date: {month}/{day}/{year}</span>
      </header>
      <main className="flex justify-center items-center">
        <ChartRace
          backgroundColor={"#FFF"}
          data={data}
          gap={2}
          width={window.innerWidth}
        />
      </main>
    </div>
  );
}
