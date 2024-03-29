import { useFormStatus } from "react-dom";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: #00a6ed;
  font-size: 1rem;
  color: #fff;

  &:hover {
    background-color: #0088cc;
  }
`;

const SubmitButton = ({
  title = "Envoyer",
  pendingText = "Envoi en cours...",
}) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? pendingText : title}
    </Button>
  );
};

export default SubmitButton;
