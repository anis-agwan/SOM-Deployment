import MaterialTable from "@material-table/core";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SECTION } from "../../enums/section_enums";

const StudentTable = (props) => {
  const [studentAll, setAllStudents] = useState([]);

  useEffect(() => {
    console.log("STSA ", props.students);

    let dd = [];

    dd = props.students.map((student) => {
      let st = {
        name: `${student.firstName} ${student.lastName}`,
        email: student.emailId,
        bnumber: student.bingNumber,
        completed: "Yes",
      };

      return st;
    });

    setAllStudents(dd);
  }, []);

  const data = [
    {
      name: "John",
      email: "john@gmail.com",
      bnumber: "B12345678",
      completed: "Yes",
    },
    {
      name: "Bren",
      email: "bren@gmail.com",
      bnumber: "B12345678",
      completed: "Yes",
    },
    {
      name: "Marry",
      email: "marry@gmail.com",
      bnumber: "B12345678",
      completed: "Yes",
    },
    {
      name: "Shohail",
      email: "shohail@gmail.com",
      bnumber: "B12345678",
      completed: "Yes",
    },
    {
      name: "Aseka",
      email: "aseka@gmail.com",
      bnumber: "B12345678",
      completed: "Yes",
    },
    {
      name: "Meuko",
      email: "meuko@gmail.com",
      bnumber: "B12345678",
      completed: "Yes",
    },
  ];

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "B#",
      field: "bnumber",
    },
    {
      title: "Assessment Complete",
      field: "completed",
    },
  ];

  return (
    <MaterialTable
      style={{ width: "100%", padding: "10px" }}
      title="Student Details"
      data={studentAll}
      columns={columns}
      options={{
        paging: true,
      }}
    />
  );
};

export default StudentTable;
