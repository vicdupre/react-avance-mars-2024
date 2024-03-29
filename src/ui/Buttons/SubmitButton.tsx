import { useFormStatus } from "react-dom";

const SubmitButton = ({
  title = "Envoyer",
  pendingText = "Envoi en cours...",
}) => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      {pending ? pendingText : title}
    </button>
  );
};

export default SubmitButton;
