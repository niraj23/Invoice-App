import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import "../styles/invoicePDF.css";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useRef } from "react";
import { Button } from "../styles";
import styled from "styled-components";
// import logo from "../Images/logo.png";

const InvoicePage = ({ onDeleteInvoice }) => {
  const [invoice, setInvoice] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`/invoices/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((invoice) => setInvoice(invoice));
      } else {
        r.json().then((err) => setInvoice(err));
      }
    });
  }, [id]);

  function handleDeleteInvoice() {
    fetch(`/invoices/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        onDeleteInvoice(invoice);
        history.push("/invoices");
      }
    });
  }

  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  return (
    <>
      <Wrapper>
        {/* <Link to={`/invoices/${invoice.id}/edit`}>Edit</Link> */}
        <Button onClick={handleDeleteInvoice}>Delete Invoice</Button>
        <Button onClick={handleExportWithComponent}> Export as PDF</Button>
        <Button onClick={() => window.print()}>Print</Button>
      </Wrapper>
      <PDFExport ref={pdfExportComponent} paperSize="A4">
        <div className="invoice-box">
          <table className="invoice" cellpadding="0" cellspacing="0">
            <tr className="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td className="title">
                      <img
                        className="img-title"
                        alt="Company Logo"
                        src={invoice.logo}
                      />
                    </td>
                    <td>
                      {invoice.id}
                      <br />
                      {invoice.date}
                      <br />
                      {invoice.date}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Patel, Inc.
                      <br />
                      12345 Sunny Road
                      <br />
                      Sunnyville, CA 12345
                    </td>

                    <td>
                      Acme Corp.
                      <br />
                      {invoice.client_name}
                      <br />
                      {invoice.client_email}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="heading">
              <td>Payment Method</td>

              <td>Check #</td>
            </tr>

            <tr className="details">
              <td>Check</td>

              <td>1000</td>
            </tr>

            <tr className="heading">
              <td>Item</td>

              <td>Price</td>
            </tr>

            <tr className="item">
              <td>{invoice.description}</td>

              <td>$300.00</td>
            </tr>

            <tr className="item">
              <td>Hosting (3 months)</td>

              <td>$75.00</td>
            </tr>

            <tr className="item last">
              <td>Domain name (1 year)</td>

              <td>$10.00</td>
            </tr>

            <tr className="total">
              <td></td>

              <td>Total: $385.00</td>
            </tr>
          </table>
        </div>
      </PDFExport>
    </>
  );
};
const Wrapper = styled.div`
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
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  display: flex;
  justify-content: space-evenly;
  border-radius: 0.375rem;
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgba(156, 163, 175, var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  --tw-text-opacity: 1;
  color: rgba(0, 0, 0, var(--tw-text-opacity));
  @media print {
    display: none;
  }
`;

export default InvoicePage;
