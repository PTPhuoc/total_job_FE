"use client";

import { setWeb } from "@/app/store/slices/webSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ActionPage({ infoChart }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);

  const labels = infoChart.result.map((item) => item.title);
  const dataValues = infoChart.result.map((item) => item.jobCount);

  const data = {
    labels,
    datasets: [
      {
        label: "Số lượng việc làm",
        data: dataValues,
        backgroundColor: "#009DFF",
        borderRadius: 8,
        barThickness: 40,
        borderWidth: 2,
        borderColor: "#01215C"
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false},
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {family: "'Smooch Sans', sans-serif", size: 24 },
        },
      },
      y: {
        ticks: {
          font: {family: "'Smooch Sans', sans-serif", size: 24 },
        },
      },
    },
  };

  return (
    <div className="pt-[100px] h-[920]">
      <div className="w-full h-full p-5">
        <div className="flex flex-col w-full h-full p-5 gap-5 bg-white rounded-2xl shadow-basic">
          <div className="flex items-center gap-5 py-1 border-b-2 text-[40px]">
            <p className="font-bold">Hiện tại đang có</p>
            <p className="font-bold flex justify-center items-center w-16 h-16 rounded-full bg-[#009DFF] text-white">
              {infoChart.jobAvailable}
            </p>
            <p>tuyển dụng đang chờ bạn</p>
          </div>

          <p className="text-[40px] font-bold">
            Chi tiết về các ngành tuyển dụng yêu cầu
          </p>

          <div className="flex-1 overflow-auto no-scroll border-2 border-[#01215C] rounded-2xl px-5">
            <div className="w-full" style={{ height: infoChart.result.length * 60 }}>
              <Bar data={data} options={options}/>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
