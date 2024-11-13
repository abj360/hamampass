import { TProduct, TProperty } from "@hamampass/db/types";

const filterByAmenity =
  (amenity: string | null) =>
  (properties: TProperty[]): TProperty[] =>
    amenity
      ? properties.filter((property) =>
          JSON.parse(amenity).every((a: number) =>
            property.amenity.facilities.includes(a)
          )
        )
      : properties;

const filterByRange =
  (range: string | null) =>
  (properties: TProperty[]): TProperty[] =>
    range
      ? properties.filter((property) => {
          const [min, max]: number[] = JSON.parse(range);

          const lowestTypeProduct = property.products.reduce(
            (prev, current) => (prev.type < current.type ? prev : current),
            property.products[0]
          );

          return (
            lowestTypeProduct.adult_price >= min &&
            lowestTypeProduct.adult_price <= max
          );
        })
      : properties;

const filterBySex =
  ({ sex, day }: { sex: string | null; day: string | null }) =>
  (properties: TProperty[]): TProperty[] => {
    if (sex && day) {
      return properties.filter((property) => {
        const choosenDay = property.days.find((d) => d.dayIndex === +day);
        return choosenDay ? choosenDay.sex === +sex : false;
      });
    }

    return properties;
  };

const filterByKeys =
  (filters: Record<string, string | string[]>) =>
  (properties: TProperty[]): TProperty[] =>
    properties.filter((property) =>
      Object.keys(filters).every((filter) => {
        if (filter.includes("_")) {
          const [key, subKey] = filter.split("_");
          return (
            property[key][subKey] === filters[filter as keyof typeof filters]
          );
        }
        return property[filter] == filters[filter as keyof typeof filters];
      })
    );
const sortProperties =
  (sort: string | null) =>
  (properties: TProperty[]): TProperty[] => {
    const findThePrice = (products: TProduct[]) => {
      const lovestType = Math.min(...Object.keys(products).map(Number));
      return products[lovestType].adult_price || 0;
    };

    if (sort === "cheap") {
      return properties.sort(
        (a, b) => findThePrice(a.products) - findThePrice(b.products)
      );
    }
    if (sort === "expensive") {
      return properties.sort(
        (a, b) => findThePrice(b.products) - findThePrice(a.products)
      );
    }
    return properties;
  };

const sortReviews =
  (sort: string | null) =>
  (properties: TProperty[]): TProperty[] => {
    if (sort === "low") {
      return properties.sort(
        (a, b) => a.rating.rate_overall - b.rating.rate_overall
      );
    }
    if (sort === "high") {
      return properties.sort(
        (a, b) => b.rating.rate_overall - a.rating.rate_overall
      );
    }
    return properties;
  };

const paginate =
  ({ page, limit }: { page: number; limit: number }) =>
  (properties: TProperty[]): TProperty[] => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return properties.slice(startIndex, endIndex);
  };

const filterSpace =
  (space: string | null) =>
  (properties: TProperty[]): TProperty[] => {
    if (!space) {
      return properties; // Return all properties if space is null
    }

    const isPublic = space === "1"; // Convert space to boolean
    return properties.filter((property) => property.isPublic === isPublic);
  };

export {
  filterByKeys,
  filterByAmenity,
  filterBySex,
  sortProperties,
  sortReviews,
  filterByRange,
  filterSpace,
  paginate,
};
