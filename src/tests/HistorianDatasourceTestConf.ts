import { DataSourceInstanceSettings } from '@grafana/data';
import { MyDataSourceOptions } from 'types';

const fakeConf = {
  jsonData: {
    max_number_of_metric_to_return: 10,
  },
};
export const testDatasourceConf = (fakeConf as unknown) as DataSourceInstanceSettings<MyDataSourceOptions>;
