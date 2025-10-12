import type { FC } from "react";

interface Props {
  searches: string[];
  onLabelClicked: (term: string) => void;
}
export const PreviouSearches: FC<Props> = ({ searches, onLabelClicked }) => {
  //llama al proceso del padre onLabelClicked
  return (
    <div className="previous-searches">
      <h2>Busquedas Anteriores</h2>
      <ul className="previous-searches-list">
        {searches?.map((term) => (
          <li
            key={term}
            className="previous-searches-item"
            onClick={() => onLabelClicked(term)}
          >
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};
