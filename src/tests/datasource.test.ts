import { DataSource as HistorianDatasource } from '../DataSource';
import { MyQuery } from '../types';
import { dateTime, DataQueryRequest, MutableDataFrame, FieldType } from '@grafana/data';

// import { fakeHistorianBackend } from './FakeHistorian';
import { testDatasourceConf } from './HistorianDatasourceTestConf';
import { fakeHistorianBackend, FAKE_TAG_NAME_VALUES_RSP, FAKE_SEARCH_VALUES_RSP } from './FakeHistorian';

const ds = new HistorianDatasource(testDatasourceConf);

jest.mock('@grafana/runtime', () => ({  
  getBackendSrv: () => fakeHistorianBackend,
}));

describe('datasource query tests', () => {
  test('1', () => {
    const options = {
      range: {
        from: dateTime(),
        to: dateTime(),
      },
      targets: [
        {
          name: 'metric_1',
          refId: 'A',
        },
        {
          name: 'metric_2',
          refId: 'B',
        },
      ],
      maxDataPoints: 1000,
    };
    const expectedFrames = [
      buildDF('metric_1', 'A', [
        [1.0, 1],
        [1.0, 2],
      ]),
      buildDF('metric_2', 'B', [
        [2.0, 1],
        [2.0, 2],
      ]),
    ];
    return ds.query((options as unknown) as DataQueryRequest<MyQuery>).then(rsp => {
      expect(rsp.data).toEqual(expectedFrames);
      console.log("rsp",rsp);
      expect(rsp.data[0].refId).toEqual("A");
      expect(rsp.data[1].refId).toEqual("B");
    });
  });
});

describe('datasource search tests', () => {
  test('getTagNames', () => {
    return ds.getTagNames("").then(names => {
      expect(names).toEqual(FAKE_TAG_NAME_VALUES_RSP);
    });
  });
  test('getValuesForTagName', () => {    
    return ds.getValuesForTagName("", "").then(names => {
      expect(names).toEqual(FAKE_SEARCH_VALUES_RSP);
    });
  });
  test('getMetricNames', () => {
    return ds.getMetricNames("").then(names => {
      expect(names).toEqual(FAKE_SEARCH_VALUES_RSP);
    });
  });
});

function buildDF(name: string, refId: string, points: Array<[number, number]>): MutableDataFrame {
  const frame = new MutableDataFrame({
    refId: refId,
    fields: [
      { name: 'time', type: FieldType.time },
      { name: name, type: FieldType.number },
    ],
  });

  points.forEach(timestampValues => {
    const value: any = {};
    value.time = timestampValues[1];
    value[name] = timestampValues[1];
    frame.add(value);
  });
  return frame;
}
