import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms, Select, HorizontalGroup, Field, Legend, Tooltip, Icon } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from '../DataSource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from '../types';
import kebabCase from 'lodash/kebabCase';
import { TagsEditor } from './TagsEditor';

const { FormField } = LegacyForms;

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

const samplingAlgorithmsOptions = [
  { label: 'default', value: 'NONE' },
  { label: 'average', value: 'AVERAGE' },
  { label: 'first', value: 'FIRST_ITEM' },
  { label: 'min', value: 'MIN' },
  { label: 'max', value: 'MAX' },
];

export interface TagKeyElement {
  tagKey: string;
  tagValue: string;
}

export class QueryEditor extends PureComponent<Props, { tagList: TagKeyElement[] }> {
  bucketSizeValue: SelectableValue<number> = { label: 'default', value: 0 };
  samplingAlgorithmValue: SelectableValue<string> = { label: 'default', value: 'NONE' };

  constructor(props: Props) {
    super(props);
    this.state = {
      tagList: this.buildTagList(this.props.query.tags || {}),
    };
  }

  private buildTagList(tags: { [key: string]: string }): TagKeyElement[] {
    return Object.keys(tags).map(tagKey => {
      return { tagKey: tagKey, tagValue: tags[tagKey] };
    });
  }

  private buildTagObjectFromState(tagList: TagKeyElement[]): { [key: string]: string } | undefined {
    if (tagList === undefined) {
      return undefined;
    }
    const toReturn: { [key: string]: string } = {};
    tagList.forEach(tag => {
      toReturn[tag.tagKey] = tag.tagValue;
    });
    return toReturn;
  }

  onMetricNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, name: event.target.value });
  };

  onSamplingAlgorithmChange = (selected: SelectableValue<string>) => {
    this.samplingAlgorithmValue = selected;
    const { onChange, query } = this.props;
    onChange({
      ...query,
      sampling: {
        algorithm: this.samplingAlgorithmValue.value,
        bucket_size: this.bucketSizeValue.value,
      },
    });
  };

  onBucketSizeChange = (selected: SelectableValue<number>) => {
    this.bucketSizeValue = selected;
    const { onChange, query } = this.props;
    onChange({
      ...query,
      sampling: {
        algorithm: this.samplingAlgorithmValue.value,
        bucket_size: this.bucketSizeValue.value,
      },
    });
  };

  onBucketSizeAddCustomOptions = (newBucketSize: string) => {
    bucketSizeCustomOptions.push({ label: kebabCase(newBucketSize), value: Number(newBucketSize) });
  };

  onClearTags = () => {
    this.setState({ tagList: [] });
  };

  private updateTagInQuery(tagList: TagKeyElement[]) {
    const { onChange, query } = this.props;
    onChange({
      ...query,
      tags: this.buildTagObjectFromState(tagList),
    });
  }

  onUpdateTagElem = (index: number, tagKeyElement: TagKeyElement) => {
    this.setState(state => {
      const list = state.tagList.map((tag, i) => {
        if (i === index) {
          return {
            ...tag,
            tagKey: tagKeyElement.tagKey,
            tagValue: tagKeyElement.tagValue,
          };
        } else {
          return tag;
        }
      });
      this.updateTagInQuery(list);
      return {
        tagList: list,
      };
    });
  };

  onAddNewTagElement = () => {
    this.setState(prevState => ({
      tagList: [...prevState.tagList, { tagKey: '', tagValue: '' }],
    }));
  };

  onRemoveTagElement = (index: number) => {
    this.setState(state => {
      const list = state.tagList.filter((item, i) => index !== i);
      this.updateTagInQuery(list);
      return {
        tagList: list,
      };
    });
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { name } = query;

    return (
      <div className="gf-form-group">
        <Legend>Metric</Legend>
        <div className="gf-form">
          <FormField
            labelWidth={8}
            value={name || ''}
            onChange={this.onMetricNameChange}
            label="Metric name"
            tooltip="Name of the metric to query on"
          />
        </div>
        <div className="gf-form">
          <TagsEditor
            tags={this.state.tagList}
            onUpdateTagElem={this.onUpdateTagElem}
            onRemoveTagElement={this.onRemoveTagElement}
            onAddNewTagElement={this.onAddNewTagElement}
            onClearTags={this.onClearTags}
          />
        </div>
        <div className="gf-form-group">
          <Legend description="Sampling option is common to all metrics at the moment, the sampling option of the first metric will be taken in account.">
            Sampling configuration
          </Legend>

          <HorizontalGroup align="center">
            <div className="gf-form">
              <Field label="Algorithm" description="Sampling algorithm">
                <Select
                  options={[...samplingAlgorithmsOptions]}
                  value={this.samplingAlgorithmValue}
                  onChange={this.onSamplingAlgorithmChange}
                />
              </Field>
              <Tooltip
                content="The sampling algorithm to use when there is too many points matching the query.Sampling option is common to all metrics at the moment, the sampling option of the first metric will be taken in account."
                theme="info"
              >
                <Icon name="info-circle" type="default" />
              </Tooltip>
            </div>
            <div className="gf-form">
              <Field label="Bucket size" description="Bucket size">
                <Select
                  options={[...bucketSizesOptions, ...bucketSizeCustomOptions]}
                  value={this.bucketSizeValue}
                  onChange={this.onBucketSizeChange}
                  allowCustomValue
                  onCreateOption={this.onBucketSizeAddCustomOptions}
                />
              </Field>
              <Tooltip
                content="The bucket size to use when sampling datapoints (aggregate every bucket size points into 1).
                 If bucket size is conflicting with max number of datapoints requested, it will be automatically
                    recomputed so that there is at most <max datapoints> returned.Sampling option is common to all metrics at the moment, the sampling option of the first metric will be taken in account."
                theme="info"
              >
                <Icon name="info-circle" />
              </Tooltip>
            </div>
          </HorizontalGroup>
        </div>
      </div>
    );
  }
}