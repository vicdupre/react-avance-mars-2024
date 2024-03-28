import { useEffect, useMemo, useState } from "react";

const FormExemple = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [job, setJob] = useState("");
  const fullName = useMemo(
    () => `${firstName} ${lastName}`,
    [firstName, lastName]
  );
  console.log("render");

  useEffect(() => {
    if (job === "crash") {
      throw new Error("crashed");
    }
  }, [job]);

  /*   const [fullName, setFullName] = useState("");
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]); */

  return (
    <form>
      <div>
        <label htmlFor="firstName">Prénom</label>
        <input
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Nom</label>
        <input
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="job">Job</label>
        <input
          name="job"
          id="job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
      </div>
      <p>Fullname : {fullName}</p>
    </form>
  );
};

export default FormExemple;
