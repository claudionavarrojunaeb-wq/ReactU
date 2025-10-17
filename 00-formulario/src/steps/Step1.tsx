import React from "react";
import type { FormData } from "../MultiStepForm";
import { userTypes } from "../mocks/userTypes";

type Props = {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
};

const Step1: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
      <label>
        Tipo de usuario/a
        <select
          value={data.userType ?? ""}
          onChange={(e) => onChange({ userType: e.target.value })}
        >
          {userTypes.map((ut) => (
            <option key={ut.value} value={ut.value}>
              {ut.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Nombre
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </label>
    </div>
  );
};

export default Step1;
