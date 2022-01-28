import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label } from "../styles";

function NewInvoice({ onAddInvoice }) {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [logo, setLogo] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        client_name: clientName,
        client_email: clientEmail,
        due_date: dueDate,
        status,
        logo,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((invoice) => {
          onAddInvoice(invoice);
          history.push("/invoices");
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Create Invoice</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              type="text"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              rows="10"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="status">Status</Label>
            <Input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="status">Company Logo</Label>
            <Input
              type="url"
              id="logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Invoice"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewInvoice;
