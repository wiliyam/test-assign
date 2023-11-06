import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
const HomePage = () => {
  const [stateLabel, setStateLabel] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [courseLabel, setCourseLabel] = useState([]);
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    getCollegeByState();
    getCollegeByCources();
  }, []);

  useEffect(() => {
    var ctx2 = document.getElementById("myPaiChartCourses").getContext("2d");
    var existingChart = Chart.getChart("myPaiChartCourses");
    if (existingChart) {
      existingChart.destroy();
    }

    const myPaiChartCourses = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: courseLabel,
        datasets: [
          {
            data: courseData,
            backgroundColor: ["#0D393A", "#D14343", "#EBCC4F", "#F2F3F7"],
            borderColor: ["#0D393A", "#D14343", "#EBCC4F", "#F2F3F7"],
            borderRadius: 10,
            spacing: 5,
          },
        ],
      },
      options: {
        cutout: 125,
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true,
          },
          title: {
            display: true,
            text: "Courses",
            position: "top",
            align: "center",
          },
          legend: {
            position: false,
          },
        },
      },
    });

    //////
    let chartStatus = Chart.getChart("myPaiChartcollege"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    var ctx1 = document.getElementById("myPaiChartcollege").getContext("2d");
    const myPaiChartcollege = new Chart(ctx1, {
      type: "doughnut",
      data: {
        labels: stateLabel,
        datasets: [
          {
            data: stateData,
            backgroundColor: ["#0D393A", "#D14343", "#EBCC4F", "#F2F3F7"],
            borderColor: ["#0D393A", "#D14343", "#EBCC4F", "#F2F3F7"],
            borderRadius: 10,
            spacing: 5,
          },
        ],
      },
      options: {
        cutout: 125,
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true,
          },
          title: {
            display: true,
            text: "states",
            position: "top",
            align: "center",
          },
          legend: {
            position: false,
          },
        },
      },
    });
  }, [stateLabel, courseLabel]);

  async function getCollegeByState() {
    const response = await axios.get("http://localhost:1337/api/getbyperstate");
    // console.log("response:::::::", response.data.data);
    let stateLabelArray = [];
    if (response.data) {
      console.log(response.data);
      let cl = [];
      let cd = [];
      for (let i of response.data) {
        cl.push(i.state);
        cd.push(i.percentage);
      }
      //   setCourseLabel();
      setStateLabel(cl);
      setStateData(cd);
    }
  }

  async function getCollegeByCources() {
    const response = await axios.get("http://localhost:1337/api/getbypercourse");
    // console.log("response:::::::", response.data.data);
    let stateLabelArray = [];
    if (response.data) {
      console.log(response.data);
      let cl = [];
      let cd = [];
      for (let i of response.data) {
        cl.push(i.course);
        cd.push(i.percentage);
      }
      //   setCourseLabel();
      setCourseLabel(cl);
      setCourseData(cd);
    }
  }
  return (
    <>
      <div className='container'>
        <div className='mt-5 text-center'>
          <h1>Dashboard</h1>
          <div className='mt-5 d-flex justify-content-center'>
            <canvas id='myPaiChartcollege' className='padding-pai-chart'></canvas>
          </div>
          <div className='mt-5 d-flex justify-content-center'>
            <canvas id='myPaiChartCourses' className='padding-pai-chart'></canvas>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
