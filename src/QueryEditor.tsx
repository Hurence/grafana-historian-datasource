import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';

const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {

  samplingAlgorithms: { text: string; value: string; }[] = [
    { text: 'default', value: 'NONE' },
    { text: 'average', value: 'AVERAGE' },
    { text: 'first', value: 'FIRST_ITEM' },
    { text: 'min', value: 'MIN' },
    { text: 'max', value: 'MAX' }
  ]
  bucketSizes: { text: string; value: number; }[] = [
    { text: 'default', value: 0 },
    { text: '100', value: 100 },
    { text: '250', value: 250 },
    { text: '500', value: 500 },
    { text: '1000', value: 1000 },
    { text: '10000', value: 10000 }
  ]

  onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, name: event.target.value });
  };


  onSamplingAlgoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, name: event.target.value });
  };


  onSamplingBucketChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, name: event.target.value });
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { name } = query;
    const { sampling } = query;
    const { tags } = query;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <FormField
            labelWidth={8}
            value={name || ''}
            onChange={this.onQueryTextChange}
            label="Query Text"
            tooltip="Not used yet"
          />
        </div>
        <div className="gf-form">
          <FormField
            labelWidth={8}
            value={sampling?.algorithm || ''}
            onChange={this.onSamplingAlgoChange}
            label="Algotihm"
            tooltip="The algorithm to use for sampling datapoints. Accepted values are [TODO]"
          />
        </div>
        <div className="gf-form">
          <FormField
            labelWidth={8}
            value={sampling?.bucket_size || ''}
            onChange={this.onSamplingBucketChange}
            label="Bucket size"
            tooltip="The bucket size to use when sampling datapoints (aggregate every bucket size points into 1). 
            If bucket size is conflicting with max number of datapoints requested, it will be automatically 
            recomputed so that there is at most <max datapoints> returned."
          />
        </div>
      </div>
    );
  }
}
