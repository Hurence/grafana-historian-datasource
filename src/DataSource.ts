import { BackendSrv, BackendSrvRequest } from '@grafana/runtime';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
  DataQueryResponseData,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions, HistorianQueryRequest, TimeSerieHistorian } from './types';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  max_number_of_metric_to_return: number;
  url?: string;
  withCredentials: boolean | undefined;
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  backendSrv: BackendSrv;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>, backendSrv: BackendSrv) {
    super(instanceSettings);
    // this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    // this.url = instanceSettings.url;
    // this.name = instanceSettings.name;
    // this.url = instanceSettings.jsonData.url;
    this.backendSrv = backendSrv;
    this.max_number_of_metric_to_return = instanceSettings.jsonData.max_number_of_metric_to_return || 50;
    this.withCredentials = instanceSettings.withCredentials;
    this.headers = { 'Content-Type': 'application/json' };
    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      this.headers['Authorization'] = instanceSettings.basicAuth;
    }
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    var request: HistorianQueryRequest = this.buildHistorianQueryRequest(options);
    const httpRequest: BackendSrvRequest = this.buildHttpRequest(this.url + '/query', 'POST', request);
    return this.backendSrv
      .datasourceRequest(httpRequest)
      .then(rsp => {
        return rsp.data;
      })
      .then(this.convertQueryRespToGrafanaFormat.bind(this, options))
      .then(result => {
        return {
          data: result,
        };
      });
  }

  private buildHttpRequest(url: string, method: string, data?: any): BackendSrvRequest {
    const toReturn = {
      url: url,
      headers: this.headers,
      method: method,
      data: data,
      withCredentials: this.withCredentials,
    };
    if (data !== undefined) {
      toReturn.data = data;
    }
    return toReturn;
  }

  private convertQueryRespToGrafanaFormat(
    options: DataQueryRequest<MyQuery>,
    historianQueryRsp: TimeSerieHistorian[]
  ): DataQueryResponseData[] {
    const namesToRefId = new Map<string, string>(options.targets.map(x => [x.name, x.refId] as [string, string]));
    console.error('historianQueryRsp is', historianQueryRsp);

    const dataframes = historianQueryRsp.map(timeserie => {
      const frame = new MutableDataFrame({
        refId: namesToRefId.get(timeserie.name),
        fields: [
          { name: 'time', type: FieldType.time },
          { name: timeserie.name, type: FieldType.number },
        ],
      });

      timeserie.datapoints.forEach(timestampValues => {
        const value: any = {};
        value.time = timestampValues[1];
        value[timeserie.name] = timestampValues[1];
        frame.add(value);
      });
      return frame;
    });

    return dataframes;
  }

  buildHistorianQueryRequest(options: DataQueryRequest<MyQuery>): HistorianQueryRequest {
    const { range } = options;
    const from: string = range!.from.toISOString();
    const to: string = range!.to.toISOString();
    const names = options.targets.map(target => target.name);
    const max_data_points: number | undefined = options.maxDataPoints;
    const tags = {};
    const sampling = {};

    return {
      from: from,
      to: to,
      names: names,
      format: 'json',
      max_data_points: max_data_points,
      tags: tags,
      sampling: sampling,
    };
  }

  testDatasource() {
    return this.backendSrv.datasourceRequest(this.buildHttpRequest(this.url + '/', 'GET')).then(response => {
      if (response.status === 200) {
        return { status: 'success', message: 'Success' };
      } else {
        return { status: 'error', message: 'Error could not join datasource' };
      }
    });
  }
}
