import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { redirect } from "next/navigation";
import { Router } from "next/router";
const CollegePage = () => {
  const [allClg, setAllClg] = useState([]);

  useEffect(() => {
    getColleges();
  }, []);
  console.log("allclg", allClg);
  async function getColleges() {
    const response = await axios.get("http://localhost:1337/api/colleges");
    // console.log("response:::::::", response.data.data);
    if (response.data) {
      setAllClg(response.data.data);
    }
  }

  async function viewcl(id) {
    window.location.href = `/collegelist/${id}`;
  }
  return (
    <div className='container'>
      <div className='mt-3 text-center'>
        <h1>Colleges</h1>

        <div className='mt-5'>
          <Table responsive>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>state</th>
                <th>Rating</th>
                <th>Courses</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {allClg.map((data, index) => (
                <tr>
                  <td key={index}>{data.id}</td>
                  <td key={index}>{data.attributes.Name}</td>
                  <td key={index}>{data.attributes.Location.state}</td>
                  <td key={index}>{data.attributes.Rating}</td>
                  <td key={index}>{JSON.stringify(data.attributes.courses)}</td>
                  <td key={index}>
                    <button onClick={() => viewcl(data.id)}>View</button>
                  </td>
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

export default CollegePage;
