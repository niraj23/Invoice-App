import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import InvoiceContainer from "../pages/InvoiceContainer";
import NewInvoice from "../pages/NewInvoice";
import InvoicePage from "../pages/InvoicePage";
import Transactions from "../pages/Transactions";
import "../styles/index.css";

function App() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/invoices")
      .then((r) => r.json())
      .then(setInvoices);
  }, []);

  function handleAddInvoice(addedInvoice) {
    setInvoices((invoices) => [...invoices, addedInvoice]);
  }

  function handleUpdateInvoice(updatedInvoice) {
    setInvoices((invoices) =>
      invoices.map((invoice) => {
        return invoice.id === updatedInvoice.id ? updatedInvoice : invoice;
      })
    );
  }

  function handleDeleteInvoice(deletedInvoice) {
    setInvoices((invoices) =>
      invoices.filter((invoice) => invoice.id !== deletedInvoice.id)
    );
  }

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewInvoice onAddInvoice={handleAddInvoice} />
          </Route>
          <Route path="/invoices">
            <InvoiceContainer
              invoices={invoices}
              onUpdateInvoice={handleUpdateInvoice}
              onDeleteInvoice={handleDeleteInvoice}
            />
          </Route>
          <Route exact path="/invoice/:id">
            <InvoicePage onDeleteInvoice={handleDeleteInvoice} />
          </Route>
          <Route exact path="/transactions">
            <Transactions />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
