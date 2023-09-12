import Choices from "choices.js";
import { useEffect } from "react";

interface ISelect {
  setSelectedOption: any;
}

export const Select = ({ setSelectedOption }: ISelect) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);
  };

  useEffect(() => {
    const element = document.querySelector(
      "#selectCustom"
    ) as HTMLSelectElement;
    const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: "",
      shouldSort: false,
      shouldSortItems: false,
    });

    return () => {
      choices.destroy();
    };
  }, []);

  return (
    <select name="name" id="selectCustom" onChange={handleSelectChange}>
      <option value="1">Эта неделя</option>
      <option value="2">Прошедшая неделя</option>
      <option value="3">2 недели назад</option>
    </select>
  );
};
