import React from "react";
import type { FormData } from "../MultiStepForm";

type Props = {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
};

const Step2: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
      <label>
        Email
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
      </label>
      <label>
        Edad
        <input
          type="number"
          value={data.age ?? ""}
          onChange={(e) =>
            onChange({ age: Number(e.target.value) || undefined })
          }
        />
      </label>
    </div>
  );
};

export default Step2;
