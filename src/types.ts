import { DataQuery, DataSourceJsonData } from '@grafana/data';

// "from": "2016-10-31T06:33:44.866Z",
// "to": "2020-10-31T12:33:44.866Z",
// "names": ["metric_1"],
// "format": "json",
// "max_data_points": 8,
// "tags": {
//     "sensor" : "sensor_1"
// },
// "sampling":{
//     "algorithm": "MIN",
//     "bucket_size" : 100
// }

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
  datapoints: [[number, number]];
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
