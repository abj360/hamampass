import { TProperty } from "@hamampass/db/types";

export const findProperty = ({
  properties,
  title,
  sex,
}: {
  properties: TProperty[];
  title: string;
  sex: number;
}) => {
  let res;

  if (!sex) {
    res = properties.find((property) => property.title === title);
  }
  res = properties.find(
    (property) => property.title === title && property.sex == sex
  );

  return res;
};
