import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent, useState } from 'react';
import { LegacyForms, Select } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from './DataSource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';
import kebabCase from 'lodash/kebabCase';

const { FormField } = LegacyForms

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

const bucketSizesOptions = [
  { label: 'default', value: 0 },
  { label: '100', value: 100 },
  { label: '250', value: 250 },
  { label: '500', value: 500 },
  { label: '1000', value: 1000 },
  { label: '10000', value: 10000 },
];
const bucketSizeCustomOptions: Array<SelectableValue<number>> = [];
var bucketSizeValue: SelectableValue<number> = { label: 'default', value: 0 };

const samplingAlgorithmsOptions = [
  { label: 'default', value: 'NONE' },
  { label: 'average', value: 'AVERAGE' },
  { label: 'first', value: 'FIRST_ITEM' },
  { label: 'min', value: 'MIN' },
  { label: 'max', value: 'MAX' }
];
var samplingAlgorithmValue: SelectableValue<string> = { label: 'default', value: 'NONE' };

export class QueryEditor extends PureComponent<Props> {


  onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, name: event.target.value });
  };

  onSamplingAlgorithmChange = (s: SelectableValue<string>) => {
    console.error("hi", s);
    //TODO
  };

  onBucketSizeChange = (s: SelectableValue<number>) => {
    console.error("hi", s);
    //TODO
  };

  onBucketSizeAddCustomOptions = (s: string) => {
    console.error("hi 2", s);
    //TODO
  };

  //   <div className="gf-form">
  //   <FormField
  //     labelWidth={8}
  //     value={sampling?.bucket_size || ''}
  //     onChange={this.onSamplingBucketChange}
  //     label="Bucket size"
  //     tooltip="The bucket size to use when sampling datapoints (aggregate every bucket size points into 1). 
  //     If bucket size is conflicting with max number of datapoints requested, it will be automatically 
  //     recomputed so that there is at most <max datapoints> returned."
  //   />
  // </div>

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { name } = query;
    // const { sampling } = query;
    // const { tags } = query;

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
          <Select
            options={[...samplingAlgorithmsOptions]}
            value={samplingAlgorithmValue}
            onChange={this.onSamplingAlgorithmChange}          
          />
        </div>
        <div className="gf-form">
          <Select
            options={[...bucketSizesOptions, ...bucketSizeCustomOptions]}
            value={bucketSizeValue}
            onChange={this.onBucketSizeChange}
            allowCustomValue
            onCreateOption={this.onBucketSizeAddCustomOptions}
          />
        </div>
      </div>
    );
  }
}
