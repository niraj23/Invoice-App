import { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Button, FormField, Input, Label } from "../styles";

function Transactions() {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item,
        price,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/invoices");
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Add Transactions</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="item">Item</Label>
            <Input
              type="text"
              id="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="price">Price $</Label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Transaction"}
            </Button>
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

export default Transactions;
