import { BackendSrv, BackendSrvRequest, getBackendSrv } from '@grafana/runtime';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
  DataQueryResponseData,
} from '@grafana/data';

import {
  MyQuery,
  MyDataSourceOptions,
  HistorianQueryRequest,
  TimeSerieHistorian,
  SearchValuesRequest,
  SearchTagNamesRequest,
} from './types';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  static API_QUERY_SUFFIX = '/query';
  static API_SEARCH_VALUES_SUFFIX = '/search/values';
  static API_SEARCH_TAG_NAMES_SUFFIX = '/search/tags';

  max_number_of_metric_to_return: number;
  url?: string;
  withCredentials: boolean | undefined;
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  backendSrv: BackendSrv;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    // this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    // this.url = instanceSettings.url;
    // this.name = instanceSettings.name;
    // this.url = instanceSettings.jsonData.url;
    this.backendSrv = getBackendSrv();
    this.max_number_of_metric_to_return = instanceSettings.jsonData.max_number_of_metric_to_return || 50;
    this.withCredentials = instanceSettings.withCredentials;
    this.headers = { 'Content-Type': 'application/json' };
    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      this.headers['Authorization'] = instanceSettings.basicAuth;
    }
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    var request: HistorianQueryRequest = this.buildHistorianQueryRequest(options);
    const httpRequest: BackendSrvRequest = this.buildHttpRequest(
      this.url + DataSource.API_QUERY_SUFFIX,
      'POST',
      request,
      options.requestId
    );
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

  private buildHttpRequest(url: string, method: string, data?: any, requestId?: string): BackendSrvRequest {
    const toReturn: any = {
      url: url,
      headers: this.headers,
      method: method,
      withCredentials: this.withCredentials,
    };
    if (data !== undefined) {
      toReturn.data = data;
    }
    if (requestId !== undefined) {
      toReturn.requestId = requestId;
    }
    return toReturn;
  }

  private convertQueryRespToGrafanaFormat(
    options: DataQueryRequest<MyQuery>,
    historianQueryRsp: TimeSerieHistorian[]
  ): DataQueryResponseData[] {
    const dataframes = historianQueryRsp.map(timeserie => {
      const frame = new MutableDataFrame({
        name: timeserie.name,
        refId: timeserie.refId,
        fields: [
          { name: 'time', type: FieldType.time },
          { name: timeserie.name, labels: timeserie.tags, type: FieldType.number },
        ],
      });

      timeserie.datapoints.forEach(timestampValues => {
        const value: any = {};
        value.time = timestampValues[1];
        // value.value = timestampValues[0];
        value[timeserie.name] = timestampValues[0];
        frame.add(value);
      });
      return frame;
    });

    return dataframes;
  }

  private buildHistorianQueryRequest(options: DataQueryRequest<MyQuery>): HistorianQueryRequest {
    const { range } = options;
    const from: string = range!.from.toISOString();
    const to: string = range!.to.toISOString();
    const metricDescriptions = options.targets.map(target => {
      const metricDesc: any = {};
      metricDesc.name = target.name;
      return {
        ...metricDesc,
        tags: target.tags,
        sampling: target.sampling,
      };
    });
    const max_data_points: number | undefined = options.maxDataPoints;
    const tags = {};
    const firstQueryWithSampling = options.targets.find(target => {
      return target.sampling !== undefined;
    });
    const sampling = firstQueryWithSampling?.sampling;

    return {
      from: from,
      to: to,
      names: metricDescriptions,
      format: 'json',
      max_data_points: max_data_points,
      tags: tags,
      sampling: sampling,
    };
  }

  async testDatasource() {
    return this.backendSrv.datasourceRequest(this.buildHttpRequest(this.url + '/', 'GET')).then(response => {
      if (response.status === 200) {
        return { status: 'success', message: 'Success' };
      } else {
        return { status: 'error', message: 'Error could not join datasource' };
      }
    });
  }

  /**
   * return all metric name matching metricNameInput
   * @param metricNameInput
   */
  async getMetricNames(metricNameInput: string): Promise<string[]> {
    return this.searchValues({
      ...{
        field: 'name',
        limit: 20,
      },
      query: metricNameInput,
    }).catch(error => {
      console.error(error);
      return [];
    });
  }

  /**
   * return all tag names mathcing current input
   * @param tagNameInput
   */
  async getTagNames(tagNameInput: string): Promise<string[]> {
    return this.searchTagNames({
      ...{
        limit: 20,
      },
      query: tagNameInput,
    }).catch(error => {
      console.error(error);
      return [];
    });
  }

  /**
   * return all existing value for specified tagName(should be an existing tagName) matching the
   * tagValueInput.
   * @param tagName
   * @param tagValueInput
   */
  async getValuesForTagName(tagName: string, tagValueInput: string): Promise<string[]> {
    return this.searchValues({
      ...{
        field: tagName,
        limit: 20,
      },
      query: tagValueInput,
    }).catch(error => {
      console.error(error);
      return [];
    });
  }

  /**
   * return all metric name matching metricNameInput
   * @param metricNameInput
   */
  private async searchValues(request: SearchValuesRequest): Promise<string[]> {
    const httpRequest: BackendSrvRequest = this.buildHttpRequest(
      this.url + DataSource.API_SEARCH_VALUES_SUFFIX,
      'POST',
      request
    );
    return this.backendSrv.datasourceRequest(httpRequest).then(rsp => {
      return rsp.data;
    });
  }

  /**
   * return all metric name matching metricNameInput
   * @param metricNameInput
   */
  private async searchTagNames(request: SearchTagNamesRequest): Promise<string[]> {
    const httpRequest: BackendSrvRequest = this.buildHttpRequest(
      this.url + DataSource.API_SEARCH_TAG_NAMES_SUFFIX,
      'POST',
      request
    );
    return this.backendSrv.datasourceRequest(httpRequest).then(rsp => {
      return rsp.data;
    });
  }
}
