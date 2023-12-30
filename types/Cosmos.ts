export type DatabaseResult = {
  result: boolean;
  data: any;
};

export type SearchConfigType = {
  id: string;
  partitionkey: string;
};

export interface InsertItemType {
  id: string;
  [key: string]: any;
}

type CosmosQueryParamType = {
  name: string;
  value: string;
};

export type CosmosQuerySpecType = {
  query: string;
  parameters: Array<CosmosQueryParamType>;
};

export type CosmosExtrasType = {
  _rid?: string;
  _self?: string;
  _etag?: string;
  _attachments?: string;
  _ts?: number;
};
