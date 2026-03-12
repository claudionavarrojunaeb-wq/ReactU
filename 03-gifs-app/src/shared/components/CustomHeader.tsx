interface Props {
  title: string;
  description?: string;
}
//export const CustomHeader = ({ title, description }: Props) => {
export const CustomHeader : React.FC<Props>=({ title, description }) => {
  return (
    <div className="content-center">
      <h1>{title}</h1>
      {description && <h2 className="subtitle">{description}</h2>}
    </div>
  );
};
