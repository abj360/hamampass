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
  if (!sex) {
    return properties.find((property) => property.title === title);
  }
  return properties.find(
    (property) => property.title === title && property.sex == sex
  );
};
