import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
const Collegelist = (props) => {
  const [scl, setScl] = useState({});

  const getCollegeData = async (id) => {
    const response = await axios.get(`http://localhost:1337/api/colleges/${id}`);
    const clgData = { data: response.data.data };
    const similarClg = await axios.get(`http://localhost:1337/api/getsimilar/${id}`);
    clgData.similarClg = similarClg.data;
    const stdClg = await axios.get(`http://localhost:1337/api/studentsbycollege/${id}`);
    clgData.stdClg = stdClg.data;
    if (response.data) {
      setScl(clgData);
      console.log("clgData::", clgData);
      // redirect("/collegelist");
    }
  };

  useEffect(() => {
    const id = window.location.href.split("/")[window.location.href.split("/").length - 1];
    getCollegeData(id);
  });
  return (
    <div className='container'>
      <div className='mt-3 text-center'>
        <h1>College info</h1>
        <h2>Name : {scl.data?.attributes.Name} </h2>
        <h2>State : {scl.data?.attributes.Location.state} </h2>
        <h2>Ratting : {scl.data?.attributes.Rating} </h2>
        <h1>Students</h1>
        <div className='mt-5'>
          <Table responsive>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>year_of_batch</th>
                <th>skills</th>
              </tr>
            </thead>
            <tbody>
              {scl.stdClg?.map((data, index) => (
                <tr>
                  <td key={index}>{data.id}</td>
                  <td key={index}>{data.name}</td>
                  <td key={index}>{data.year_of_batch}</td>
                  <td key={index}>{data.skills}</td>
                </tr>
              ))}
              {/* <tr>
                <td>1</td>
                {allClg.map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>2</td>
                {Array.from({ length: 5 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>3</td>
                {Array.from({ length: 5 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr> */}
            </tbody>
          </Table>
        </div>
        <h1>Similar colleges</h1>
        <div className='mt-5'>
          <Table responsive>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>state</th>
                <th>Rating</th>
                <th>Courses</th>
              </tr>
            </thead>
            <tbody>
              {scl.similarClg?.map((data, index) => (
                <tr>
                  <td key={index}>{data.id}</td>
                  <td key={index}>{data.name}</td>
                  <td key={index}>{JSON.parse(data.location).state}</td>
                  <td key={index}>{data.rating}</td>
                  <td key={index}>{data.courses}</td>
                </tr>
              ))}
              {/* <tr>
                <td>1</td>
                {allClg.map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>2</td>
                {Array.from({ length: 5 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr>
              <tr>
                <td>3</td>
                {Array.from({ length: 5 }).map((_, index) => (
                  <td key={index}>Table cell {index}</td>
                ))}
              </tr> */}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Collegelist;
