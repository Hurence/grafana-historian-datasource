import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface HistorianQueryRequest {
  from: string;
  to: string;
  names: string[];
  format?: string;
  max_data_points?: number;
  tags?: { [key: string]: string };
  sampling?: {
    algorithm?: string;
    bucket_size?: string;
  };
}

export interface TimeSerieHistorian {
  name: string;
  datapoints: [number, number][];
  aggregations?: {
    min?: number;
    max?: number;
    count?: number;
    avg?: number;
    sum?: number;
  };
}

export interface MyQuery extends DataQuery {
  name: string;
  tags?: { [key: string]: string };
  sampling?: {
    algorithm?: string;
    bucket_size?: string;
  };
}

export const defaultQuery: Partial<MyQuery> = {};

/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  path?: string;
  max_number_of_metric_to_return?: number;
  url: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {
  apiKey?: string;
}
