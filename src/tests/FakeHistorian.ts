import { BackendSrv, BackendSrvRequest } from '@grafana/runtime';
import { TimeSerieHistorian } from 'types';
import { DataSource } from 'DataSource';


export const FAKE_SEARCH_VALUES_RSP = ["value1", "value2"];
export const FAKE_TAG_NAME_VALUES_RSP = ["tag1", "tag2"];

class MyFakeHistorian implements BackendSrv {
  get(url: string, params?: any, requestId?: string | undefined): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(url: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  post(url: string, data?: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  patch(url: string, data?: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  put(url: string, data?: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  request(options: BackendSrvRequest): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async datasourceRequest(options: BackendSrvRequest): Promise<any> {
    console.log("call at url :", options.url);    
    switch(options.url) { 
      case DataSource.API_QUERY_SUFFIX: { 
        const timeseries: TimeSerieHistorian[] = [
          {
            refId: "A",
            name: 'metric_1',
            datapoints: [
              [1.0, 1],
              [1.0, 2],
            ],
          },
          {
            refId: "B",
            name: 'metric_2',
            datapoints: [
              [2.0, 1],
              [2.0, 2],
            ],
          },
        ];
        return {
          data: timeseries,
        };
      } 
      case DataSource.API_SEARCH_VALUES_SUFFIX: {         
        return {
          data: FAKE_SEARCH_VALUES_RSP,
        };
      } 
      case DataSource.API_SEARCH_TAG_NAMES_SUFFIX: {      
        return {
          data: FAKE_TAG_NAME_VALUES_RSP,
        };        
     } 
      default: { 
         console.error("url not known", options.url);
         break; 
      } 
   }         
  }
}

export const fakeHistorianBackend = new MyFakeHistorian();
