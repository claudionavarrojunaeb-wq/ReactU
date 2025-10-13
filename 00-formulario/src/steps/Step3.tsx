import React from "react";
import type { FormData } from "../MultiStepForm";

type Props = {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
};

const Step3: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
      <label>
        Acepto términos
        <input
          type="checkbox"
          checked={data.agree}
          onChange={(e) => onChange({ agree: e.target.checked })}
        />
      </label>
      <div style={{ marginTop: 12 }}>
        <strong>Resumen:</strong>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Step3;
