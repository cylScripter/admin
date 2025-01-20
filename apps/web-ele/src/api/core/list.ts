export interface Option{
  name:number |undefined;
  value:string;
}

export interface ListOption {
  options: Option[];
  limit: number;
  offset: number;
  offset_token: string;
}


export interface BaseParam{
  list_option : ListOption;
}


export interface Paginate {
  total: number;
  limit: number;
  offset: number;
  next_offset_token: string;
  has_more: boolean;
}
