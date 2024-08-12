import exp from "constants";

export interface TContact {
  id: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  location: number[];
  createdAt: string;
  updatedAt: string;
}

export interface TPrice {
  id: string;
  adult: number;
  child: number;
  scrub: number;
  createdAt: string;
  updatedAt: string;
}

export interface TProduct {
  id: string;
  name_tr: string;
  name_en: string;
  price: number;
  detais_tr: string[];
  details_en: string[];
  tags: string[];
  [key: string]: any;
}

export interface TDay {
  id: string;
  day: string;
  openTime: string;
  closeTime: string;
  sex: number;
  createdAt: string;
  updatedAt: string;
  belongsToId: string;
}

export interface TProperty {
  id: string;
  title: string;
  contactId: string;
  priceId: string;
  amenities: number[];
  photos: string[];
  sex: number;
  pay: number;
  createdAt: string;
  updatedAt: string;
  contact: TContact;
  products: TProduct[];
  price: TPrice;
  days: TDay[];
  rating: TRating;
  reviews: TReview[];
}

export interface TApiResponse {
  all_items: number;
  page: number;
  max_page: number;
  limit: number;
  data: TProperty[];
}

export interface TRating {
  id: string;
  sum: number;
  count: number;
}

export interface TReview {
  id: string;
  userId: string;
  propertyId: string;
  type: number;
  rate_overall: number;
  comment: string;

  user: TUser;

  rata_location: number;
  rate_staff: number;
  rate_atmosphere: number;
  rate_cleanliness: number;
  rate_facilities: number;
  rate_value_for_money: number;

  createdAt: string;
  updatedAt: string;
}

interface TUser {
  id: string;
  name: string;
  email: string;
  image: string;
  nationality: string;
  age_range: number;
  gender: number;
  reviews: TReview[];
  createdAt: string;
  updatedAt: string;
}

export interface TCountry {
  tld: string;
  name_en: string;
  name_tr: string;
  image: string;
}
