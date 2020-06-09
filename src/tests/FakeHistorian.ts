import { BackendSrv, BackendSrvRequest } from '@grafana/runtime';
import { TimeSerieHistorian } from 'types';

class MyFakeHistorian implements BackendSrv {
    get(url: string, params?: any, requestId?: string | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(url: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    post(url: string, data?: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    patch(url: string, data?: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    put(url: string, data?: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    request(options: BackendSrvRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async datasourceRequest(options: BackendSrvRequest): Promise<any> {
        const timeseries: TimeSerieHistorian[] = [
            {
                name: "metric_1",
                datapoints: [
                    [1.0, 1],
                    [1.0, 2]
                ]
            },
            {
                name: "metric_2",
                datapoints: [
                    [2.0, 1],
                    [2.0, 2]
                ]
            }
        ];
        return {
            data: timeseries
        }
    }
};

export const fakeHistorianBackend = new MyFakeHistorian()