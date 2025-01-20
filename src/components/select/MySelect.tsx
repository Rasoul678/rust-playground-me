import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectOptionType = {
  name: string;
  value: string;
};

type IProps = {
  value: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
  label?: string;
  options: SelectOptionType[];
};

const MySelect: React.FC<IProps> = (props) => {
  const { value, onValueChange, defaultValue, label, options } = props;

  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-[8rem]">
        <SelectValue placeholder={`Select ${label}}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label || "Options"}</SelectLabel>
          {options.map((option) => (
            <SelectItem value={option.value}>{option.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MySelect;
