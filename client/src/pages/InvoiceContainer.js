import Invoicelist from "../components/InvoiceList";
import styled from "styled-components";

function InvoiceContainer({ invoices, onDeleteInvoice, onUpdateInvoice }) {
  return (
    <Outside>
      {invoices.map((invoice) => {
        return (
          <Invoicelist
            key={invoice.id}
            invoice={invoice}
            onDeleteInvoice={onDeleteInvoice}
            onUpdateInvoice={onUpdateInvoice}
          />
        );
      })}
    </Outside>
  );
}

const Outside = styled.div`
  tab-size: 4;
  -webkit-text-size-adjust: 100%;
  font-family: inherit;
  line-height: inherit;
  box-sizing: border-box;
  border: 0 solid;
  --tw-shadow: 0 0 transparent;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  border-radius: 0.375rem;
  --tw-border-opacity: 1;
  border-color: rgb(31, 33, 57, var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
  padding: 1rem;
  width: 50%;
  min-height: 70vh;
  margin-top: 15px;
  margin-left: 375px;
`;
export default InvoiceContainer;
