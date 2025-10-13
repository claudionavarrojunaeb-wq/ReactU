import React from "react";
import type { FormData } from "../MultiStepForm";

type Props = {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
};

const Step1: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
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
