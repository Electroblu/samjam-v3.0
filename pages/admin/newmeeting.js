import React from "react";
import { Form, Input, Button, Header, Icon, Loader } from "semantic-ui-react";
import baseUrl from "../../utils/baseUrl";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFetchUser } from "../../utils/user";
import Router from "next/router";

function NewMeeting() {
  const { user, loading } = useFetchUser();

  if (!user && !loading) {
    Router.push("/");
  }

  const [form, setForm] = React.useState({
    name: "",
  });
  const [isSubmitting, setIsSubmiting] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const router = useRouter();

  React.useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createMeeting();
      } else {
        setIsSubmiting(false);
      }
    }
  });

  const createMeeting = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/meeting`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/admin");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmiting(true);
  };

  const validate = () => {
    let err = {};

    if (!form.name) {
      err.name = "Name is required";
    }
    return err;
  };

  return (
    <>
      <Header as="h2" block>
        <Icon name="comment alternate" color="violet" />
        Add New Meeting Type
      </Header>
      {isSubmitting ? (
        <Loader active inline="centered" />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Field
            control={Input}
            fluid
            error={
              errors.name
                ? { content: "Please enter a Meeting Type", pointing: "below" }
                : null
            }
            name="name"
            label="Meeting Type"
            placeholder="Meeting Type"
            onChange={handleChange}
          />
          <Form.Field
            floated="right"
            control={Button}
            color="green"
            icon="pencil alternate"
            content="Submit"
            type="submit"
          />
          <Link href={"/admin"}>
            <Button color="red" icon labelPosition="left" floated="right">
              <Icon name="cancel" />
              Cancel
            </Button>
          </Link>
        </Form>
      )}
    </>
  );
}

export default NewMeeting;
