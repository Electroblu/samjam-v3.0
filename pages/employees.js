import React from "react";
import fetch from "isomorphic-unfetch";
import EmployeeList from "../components/Employees/EmployeeList";
import baseUrl from "../utils/baseUrl";
import { useFetchUser } from "../utils/user";
import Router from "next/router";

//TODO: Add Paginagtion in the future maybe?

function Employees({ employeeData }) {
  const { user, loading } = useFetchUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user && !loading) {
    Router.push("/");
  }

  return (
    <>
      <EmployeeList employees={employeeData} />
    </>
  );
}

export async function getServerSideProps() {
  const employees = await fetch(`${baseUrl}/api/employees`);
  const { employeeData } = await employees.json();

  return {
    props: { employeeData },
  };
}

export default Employees;
