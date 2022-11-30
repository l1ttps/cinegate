import React, { FunctionComponent } from "react";
import { Option } from "../../shared/types";

interface SelectOptionsProps {
  options: Option[];
  selected: string;
  onChange: (value: any) => void;
}

const SelectOptions: FunctionComponent<SelectOptionsProps> = (props) => {
  const { options, selected, onChange } = props;

  return (
    <div>
      <select onChange={({ target: { value } }) => onChange(value)}>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default React.memo(SelectOptions);
