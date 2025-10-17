export type UserType = {
  value: string;
  label: string;
};

export const userTypes: UserType[] = [
  { value: "", label: "-Seleccione el tipo de usuario/a-" },
  { value: "estudiante", label: "Estudiante (Beneficiario o no beneficiario)" },
  { value: "padre", label: "Padre, madre, tutor(a) o apoderado(a)" },
  { value: "red", label: "Red colaboradora" },
  { value: "otro", label: "Otro" },
  { value: "otro", label: "Otro más" },
];
