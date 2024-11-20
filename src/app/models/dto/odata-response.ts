export interface ODataCollectionResponse<T> {
  value: T[];
  '@odata.context'?: string;
  '@odata.count'?: number;
  '@odata.nextLink'?: string;
}

export interface ODataSingleResponse<T> {
  '@odata.context'?: string;
  value: T;
}
