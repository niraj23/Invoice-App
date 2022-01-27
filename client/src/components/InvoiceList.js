import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

function InvoiceList({ invoice, onUpdateInvoice }) {
  const { id, client_name, client_email, description, status, due_date } =
    invoice;
  const [showInvoiceInfo, setShowInvoiceInfo] = useState(false);

  // function handleUpdateRating(pct) {
  //   const newRating = pct * 5;
  //   fetch(`/spices/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ rating: newRating }),
  //   })
  //     .then((r) => r.json())
  //     .then(onUpdateSpice);
  // }

  const toggleInfo = () => {
    setShowInvoiceInfo(!showInvoiceInfo);
  };

  return (
    <Wrapper key={id}>
      <Invoice className="flex justify-between">
        <Client className="font-bold">{client_name}</Client>
        <button onClick={toggleInfo}>{`${showInvoiceInfo ? "-" : "+"}`}</button>
      </Invoice>

      {showInvoiceInfo && (
        <>
          <UL>
            <List>
              <Spans>Invoice#:</Spans> {id}
            </List>
            <List>
              <Spans>Description:</Spans> {description}
            </List>
            <List>
              <Spans>Client Email:</Spans> {client_email}
            </List>
            <Link to={`/invoice/${id}`} className="link-invoice">
              <List className="link-invoices">
                <Spans>Invoice Status:</Spans> {status}
              </List>
            </Link>
            <List>
              <Spans>Due Date:</Spans> {due_date}
            </List>
          </UL>
          <Button as={Link} to={`/transactions`}>
            Add Transactions
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  tab-size: 4;
  -webkit-text-size-adjust: 100%;
  font-family: inherit;
  line-height: inherit;
  --tw-bg-opacity: 1;
  box-sizing: border-box;
  border: 0 solid;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  margin-bottom: 0.75rem;
  border-radius: 0.375rem;
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-border-opacity));
  padding: 0.75rem;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 transparent),
    var(--tw-ring-shadow, 0 0 transparent), var(--tw-shadow);
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Invoice = styled.div`
  tab-size: 4;
  -webkit-text-size-adjust: 100%;
  font-family: inherit;
  line-height: inherit;
  --tw-bg-opacity: 1;
  box-sizing: border-box;
  border: 0 solid;
  --tw-border-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
  --tw-shadow: 0 0 transparent;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  display: flex;
  justify-content: space-between;
`;
const Client = styled.h5`
  tab-size: 4;
  -webkit-text-size-adjust: 100%;
  font-family: inherit;
  line-height: inherit;
  --tw-bg-opacity: 1;
  box-sizing: border-box;
  border: 0 solid;
  --tw-border-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
  --tw-shadow: 0 0 transparent;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  margin: 0;
  font-size: inherit;
  font-weight: 700;
`;
const Item2 = styled.button`
  tab-size: 4;
  -webkit-text-size-adjust: 100%;
  --tw-bg-opacity: 1;
  box-sizing: border-box;
  border: 0 solid;
  --tw-border-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
  --tw-shadow: 0 0 transparent;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  font-family: inherit;
  font-size: 100%;
  margin: 0;
  text-transform: none;
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
  cursor: pointer;
  padding: 0;
  line-height: inherit;
  color: inherit;
`;

const UL = styled.ul`
  tab-size: 4;
  -webkit-text-size-adjust: 100%;
  font-family: inherit;
  --tw-bg-opacity: 1;
  box-sizing: border-box;
  border: 0 solid;
  --tw-border-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
  --tw-shadow: 0 0 transparent;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
`;

const List = styled.li`
  tab-size: 4;
  -webkit-text-size-adjust: 100%;
  font-family: inherit;
  list-style: none;
  font-size: 0.875rem;
  line-height: 1.25rem;
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
  box-sizing: border-box;
  border: 0 solid;
  --tw-shadow: 0 0 transparent;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  margin-bottom: 0.25rem;
  border-radius: 0.25rem;
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

const Spans = styled.span`
  tab-size: 4;
  -webkit-text-size-adjust: 100%;
  font-family: inherit;
  list-style: none;
  font-size: 0.875rem;
  line-height: 1.25rem;
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
  --tw-bg-opacity: 1;
  box-sizing: border-box;
  border: 0 solid;
  --tw-border-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
  --tw-shadow: 0 0 transparent;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  margin-right: 1.25rem;
  font-weight: 700;
`;

export default InvoiceList;
