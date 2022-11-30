export interface Option {
  id: string;
  label: string;
}

export interface Collection {
  contract_address: string;
  image_url: string;
  name: string;
  floor_prices: FloorPrice[];
}

export interface FloorPrice {
  price_symbol: string;
  price: string;
}
