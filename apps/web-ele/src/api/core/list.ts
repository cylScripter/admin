export interface Option{
  name:number |undefined;
  value:string;
}

export interface ListOption {
  list: Option[];
  limit: number;
  offset: number;
  offset_token: string;
}


export interface BaseParam{
  list_option : ListOption;
}
