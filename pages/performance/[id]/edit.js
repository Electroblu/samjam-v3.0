import React from "react";
import {
  Form,
  Input,
  Button,
  TextArea,
  Header,
  Icon,
  Select,
  Loader,
} from "semantic-ui-react";
import baseUrl from "../../../utils/baseUrl";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFetchUser } from "../../../utils/user";
import Router from "next/router";

const typeOptions = [
  { key: "Positive", text: "Positive", value: "Positive" },
  { key: "Negative", text: "Negative", value: "Negative" },
  { key: "Sick", text: "Sick", value: "Sick" },
  { key: "Cashhandling", text: "Cash Handling", value: "Cash Handling" },
  { key: "Meeting", text: "Meeting", value: "Meeting" },
];

function EditPerformance({
  performanceData,
  employeeData,
  positiveData,
  negativeData,
  sickData,
  cashhandlingData,
  meetingData,
}) {
  const { user, loading } = useFetchUser();

  const performance = performanceData;

  if (!user && !loading) {
    Router.push("/");
  }

  const [form, setForm] = React.useState({
    manager: performance.manager,
    employee: performance.employee._id,
    date: performance.date,
    type: performance.type,
    category: performance.incident,
    description: performance.description,
    followupManager: performance.followupManager,
    followupDescription: performance.followupDescription,
  });
  const [isSubmitting, setIsSubmiting] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const router = useRouter();

  const isPositive = form.type === "Positive";
  const isNegative = form.type === "Negative";
  const isSick = form.type === "Sick";
  const isCashhandling = form.type === "Cash Handling";
  const isMeeting = form.type === "Meeting";

  React.useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createPerformance();
      } else {
        setIsSubmiting(false);
      }
    }
  });

  const createPerformance = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/performance/${router.query.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/performance");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e, data) => {
    setForm({
      ...form,
      [data.name]: data.value,
    });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmiting(true);
  };

  const validate = () => {
    let err = {};

    if (!form.manager) {
      err.manager = "Manager is required";
    }
    if (!form.employee) {
      err.employee = "Employee is required";
    }
    if (!form.date) {
      err.date = "Date is required";
    }
    if (!form.type) {
      err.type = "Type is required";
    }
    if (!form.incident) {
      err.incident = "Incident Type is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }
    return err;
  };

  const employeeOptions = employeeData.map((employee) => {
    return {
      key: employee.name,
      value: employee._id,
      text: employee.name,
    };
  });

  const positiveOptions = positiveData.map((positive) => {
    return {
      key: positive.name,
      value: positive.name,
      text: positive.name,
    };
  });

  const negativeOptions = negativeData.map((negative) => {
    return {
      key: negative.name,
      value: negative.name,
      text: negative.name,
    };
  });

  const sickOptions = sickData.map((sick) => {
    return {
      key: sick.name,
      value: sick.name,
      text: sick.name,
    };
  });

  const cashhandlingOptions = cashhandlingData.map((cashhandling) => {
    return {
      key: cashhandling.name,
      value: cashhandling.name,
      text: cashhandling.name,
    };
  });

  const meetingOptions = meetingData.map((meeting) => {
    return {
      key: meeting.name,
      value: meeting.name,
      text: meeting.name,
    };
  });

  return (
    <>
      <Header as="h2" block>
        <Icon name="edit" color="blue" />
        Edit Performance Note for {performance.employee.name}
      </Header>
      {isSubmitting ? (
        <Loader active inline="centered" />
      ) : (
        <Form onSubmit={handleSubmit}>
          <h3 className="form-required">All fields are required</h3>
          <Form.Field
            control={Input}
            error={
              errors.manager
                ? { content: "Please enter a Manager", pointing: "below" }
                : null
            }
            name="manager"
            label="Manager"
            placeholder="Manager"
            value={form.manager}
            onChange={handleChange}
          />
          <Form.Field
            control={Select}
            error={
              errors.employee
                ? { content: "Please enter a Employee", pointing: "below" }
                : null
            }
            name="employee"
            label="Employee"
            placeholder="Employee"
            options={employeeOptions}
            value={form.employee}
            onChange={handleSelectChange}
          />
          <Form.Field
            control={Input}
            error={
              errors.date
                ? { content: "Please enter a date", pointing: "below" }
                : null
            }
            name="date"
            label="Date"
            placeholder="Date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
          <Form.Field
            control={Select}
            label="Type"
            name="type"
            options={typeOptions}
            placeholder="Type"
            value={form.type}
            onChange={handleSelectChange}
          />
          {isPositive && (
            <Form.Field
              control={Select}
              label="Category"
              name="incident"
              options={positiveOptions}
              placeholder="Category"
              value={form.incident}
              onChange={handleSelectChange}
            />
          )}
          {isNegative && (
            <Form.Field
              control={Select}
              label="Category"
              name="incident"
              options={negativeOptions}
              placeholder="Category"
              value={form.incident}
              onChange={handleSelectChange}
            />
          )}
          {isSick && (
            <Form.Field
              control={Select}
              label="Category"
              name="incident"
              options={sickOptions}
              placeholder="Category"
              value={form.incident}
              onChange={handleSelectChange}
            />
          )}
          {isCashhandling && (
            <Form.Field
              control={Select}
              label="Category"
              name="incident"
              options={cashhandlingOptions}
              placeholder="Category"
              value={form.incident}
              onChange={handleSelectChange}
            />
          )}
          {isMeeting && (
            <Form.Field
              control={Select}
              label="Category"
              name="incident"
              options={meetingOptions}
              placeholder="Category"
              value={form.incident}
              onChange={handleSelectChange}
            />
          )}
          <Form.Field
            control={TextArea}
            error={
              errors.description
                ? { content: "Please enter a Description", pointing: "below" }
                : null
            }
            name="description"
            label="Description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="followupManager"
            label="Followup Manager"
            placeholder="Followup Manager"
            value={form.followupManager}
            onChange={handleChange}
          />
          <Form.Field
            control={TextArea}
            name="followupDescription"
            label="Followup Description"
            placeholder="Followup Description"
            value={form.followupDescription}
            onChange={handleChange}
          />
          <Link href="/performance">
            <Button
              color="red"
              icon
              labelPosition="left"
              floated="right"
              aria-label="Cancel"
            >
              <Icon name="cancel" />
              Cancel
            </Button>
          </Link>
          <br />
          <br />
          <Form.Field
            floated="right"
            control={Button}
            color="green"
            icon="pencil alternate"
            content="Submit"
            type="submit"
            aria-label="Submit"
          />
        </Form>
      )}
    </>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const performance = await fetch(`${baseUrl}/api/performance/${id}`);
  const employees = await fetch(`${baseUrl}/api/employees`);
  const positives = await fetch(`${baseUrl}/api/positive`);
  const negatives = await fetch(`${baseUrl}/api/negative`);
  const sicks = await fetch(`${baseUrl}/api/sick`);
  const cashhandlings = await fetch(`${baseUrl}/api/cashhandling`);
  const meetings = await fetch(`${baseUrl}/api/meeting`);
  const { performanceData } = await performance.json();
  const { employeeData } = await employees.json();
  const { positiveData } = await positives.json();
  const { negativeData } = await negatives.json();
  const { sickData } = await sicks.json();
  const { cashhandlingData } = await cashhandlings.json();
  const { meetingData } = await meetings.json();

  return {
    props: {
      performanceData,
      employeeData,
      positiveData,
      negativeData,
      sickData,
      cashhandlingData,
      meetingData,
    },
  };
}

export default EditPerformance;
