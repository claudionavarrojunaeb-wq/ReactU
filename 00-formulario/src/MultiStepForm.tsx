import React, { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import "./index.css";

export type FormData = {
  name: string;
  email: string;
  age?: number;
  agree: boolean;
};

const initialData: FormData = {
  name: "",
  email: "",
  age: undefined,
  agree: false,
};

export const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const update = (patch: Partial<FormData>) =>
    setData((d) => ({ ...d, ...patch }));

  const handleSubmit = () => {
    // Aquí normalmente enviarías 'data' al servidor
    // Para demo mostramos en consola
    console.log("Submitted:", data);
    alert("Formulario enviado. Revisa la consola.");
  };

  return (
    <div className="msf-container">
      <div className="msf-card">
        <h2>Formulario multipaso (Paso {step} de 3)</h2>

        <div className="msf-stepper">
          <div className={`msf-step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`msf-step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`msf-step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        {step === 1 && <Step1 data={data} onChange={update} />}
        {step === 2 && <Step2 data={data} onChange={update} />}
        {step === 3 && <Step3 data={data} onChange={update} />}

        <div className="msf-actions">
          <button onClick={prev} disabled={step === 1} className="btn">
            Atrás
          </button>
          {step < 3 ? (
            <button onClick={next} className="btn primary">
              Siguiente
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn primary">
              Enviar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
