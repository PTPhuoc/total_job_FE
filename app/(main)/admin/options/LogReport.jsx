"use client";
import { setWeb } from "@/app/store/slices/webSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function LogReport({ taskId }) {
  const [log, setLog] = useState([]);
  const [stateLog, setStateLog] = useState("on");
  const [autoScroll, setAutoScroll] = useState(true);
  const dispatch = useDispatch();
  const logContainer = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(
      `ws://${process.env.NEXT_PUBLIC_SERVER_IP}/ws/task/${taskId}/`
    );

    socket.onopen = () => {
      socket.send(JSON.stringify({ state: "ready" }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLog((prev) => [...prev, data.message]);
      setStateLog(data.state);
      if (data.state === "off") {
        socket.close();
      }
    };

    socket.onerror = () => {
      dispatch(setWeb({ stateCrawl: false }));
      socket.close();
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".put-up");
    const observer = new IntersectionObserver((entries) => {
      let counter = 0;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.setProperty("--delay", `${counter * 0.3}s`);
          counter++;
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    });

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [log]);

  function smoothScrollToBottom(el, speed = 5) {
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    let currentScroll = el.scrollTop;

    const scrollStep = () => {
      if (currentScroll < maxScroll) {
        currentScroll += speed;
        el.scrollTop = currentScroll;
        requestAnimationFrame(scrollStep);
      }
    };

    scrollStep();
  }

  useEffect(() => {
    const el = logContainer.current;
    if (!el) return;

    const handleUserScroll = () => {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
      setAutoScroll(atBottom);
    };

    el.addEventListener("scroll", handleUserScroll);
    return () => el.removeEventListener("scroll", handleUserScroll);
  }, []);

  useEffect(() => {
    const el = logContainer.current;
    if (autoScroll && el) smoothScrollToBottom(el, 5);
  }, [log]);

  return (
    <div className="absolute top-0 left-0 bg-white flex flex-col p-3 w-full h-full">
      <div
        className={
          "overflow-hidden flex-0 transition-all duration-200 ease-in-out " +
          (stateLog === "off" && "flex-1")
        }
      >
        <button
          className="p-3 w-full rounded-md bg-[#01215C] border-2 border-[#01215C] text-white fill-white scale-100 duration-300 ease-in hover:text-[#01215C] hover:bg-white active:scale-95"
          onClick={() => {
            dispatch(setWeb({ stateCrawl: false }));
          }}
        >
          Đóng
        </button>
      </div>
      <div
        ref={logContainer}
        className="flex-9 flex flex-col gap-1 overflow-auto no-scroll"
      >
        {log.map((item, index) => (
          <p
            key={index}
            className="p-3 bg-[#009DFF] text-white rounded-md put-up"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
