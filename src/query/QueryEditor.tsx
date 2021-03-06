import React, { PureComponent } from 'react';
import { Select, HorizontalGroup, Field, Legend, Tooltip, Icon, AsyncSelect } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from '../DataSource';
import { MyDataSourceOptions, MyQuery } from '../types';
import kebabCase from 'lodash/kebabCase';
import { TagsEditor } from './TagsEditor';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

const bucketSizesOptions = [
  { label: 'default', value: 1 },
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
  { label: 'first', value: 'FIRST' },
  { label: 'min', value: 'MIN' },
  { label: 'max', value: 'MAX' },
];

export interface TagKeyElement {
  tagKey: string;
  tagValue: string;
}

type State = {
  tagList: TagKeyElement[];
  isBuketSizeInvalid: boolean;
  isNameLoading: boolean;
};

export class QueryEditor extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const bucketSize: number | undefined = this.props.query.sampling?.bucket_size;
    const tagList = this.buildTagList(this.props.query.tags || {});
    let isBuketSizeInvalid = false;
    if (bucketSize !== undefined && bucketSize < 0) {
      isBuketSizeInvalid = true;
    }
    this.state = {
      tagList: tagList,
      isBuketSizeInvalid: isBuketSizeInvalid,
      isNameLoading: false,
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

  onMetricNameChange = (selected: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({
      ...query,
      name: selected.value || '',
    });
  };

  onSamplingAlgorithmChange = (selected: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({
      ...query,
      sampling: {
        algorithm: selected.value,
        bucket_size: query.sampling?.bucket_size,
      },
    });
  };

  onBucketSizeChange = (selected: SelectableValue<number>) => {
    const { onChange, query } = this.props;
    onChange({
      ...query,
      sampling: {
        algorithm: query.sampling?.algorithm,
        bucket_size: selected.value,
      },
    });
    this.setState(state => {
      let isbucketSizeValid = selected.value !== undefined && selected.value > 0;
      return {
        ...state,
        isBuketSizeInvalid: !isbucketSizeValid,
      };
    });
  };

  onBucketSizeAddCustomOptions = (newBucketSize: string) => {
    bucketSizeCustomOptions.push({ label: kebabCase(newBucketSize), value: Number(newBucketSize) });
    // TODO avoid forceUpdate by setting bucketSizeCustomOptions into state
    this.forceUpdate();
  };

  onClearTags = () => {
    this.setState(state => {
      this.updateTagInQuery([]);
      return {
        ...state,
        tagList: [],
      };
    });
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
        ...state,
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
        ...state,
        tagList: list,
      };
    });
  };

  /**
   * return all metric name matching metricNameInput
   * @param metricNameInput
   */
  async getMetricNames(metricNameInput: string): Promise<Array<SelectableValue<string>>> {
    this.setState(state => {
      return {
        ...state,
        isNameLoading: true,
      };
    });
    return this.props.datasource
      .getMetricNames(metricNameInput)
      .then(metricNames => {
        return metricNames.map(name => {
          return { label: name, value: name };
        });
      })
      .then(rsp => {
        this.setState(state => {
          return {
            ...state,
            isNameLoading: false,
          };
        });
        return rsp;
      });
  }

  /**
   * return all tag names mathcing current input
   * @param tagNameInput
   */
  async getTagNames(tagNameInput: string): Promise<Array<SelectableValue<string>>> {
    return this.props.datasource.getTagNames(tagNameInput).then(tagNames => {
      return tagNames.map(name => {
        return { label: name, value: name };
      });
    });
  }

  /**
   * return all existing value for specified tagName(should be an existing tagName) matching the
   * tagValueInput.
   * @param tagName
   * @param tagValueInput
   */
  async getTagValues(tagName: string, tagValueInput: string): Promise<Array<SelectableValue<string>>> {
    return this.props.datasource.getValuesForTagName(tagName, tagValueInput).then(tagValues => {
      return tagValues.map(name => {
        return { label: name, value: name };
      });
    });
  }

  private getBucketSizeValue(): SelectableValue<number> {
    if (this.props.query.sampling?.bucket_size !== undefined) {
      return {
        label: this.props.query.sampling?.bucket_size.toString(),
        value: this.props.query.sampling?.bucket_size,
      };
    }
    return { label: 'default', value: 0 };
  }

  private getSamplingAlgoValue(): SelectableValue<string> {
    if (this.props.query.sampling?.algorithm !== undefined) {
      return { label: this.props.query.sampling?.algorithm, value: this.props.query.sampling?.algorithm };
    }
    return { label: 'default', value: 'NONE' };
  }

  private getNameValue(): SelectableValue<string> {
    return {
      label: this.props.query.name,
      value: this.props.query.name,
    };
  }

  render() {
    const bucketSizeValue: SelectableValue<number> = this.getBucketSizeValue();
    const samplingAlgorithmValue: SelectableValue<string> = this.getSamplingAlgoValue();
    const metricNameValue: SelectableValue<string> = this.getNameValue();
    //AsyncSelect onKeyDown
    return (
      <div className="gf-form-group">
        <Legend>Metric to target</Legend>
        <div className="gf-form">
          <Field label="Metric name" description="The name of the metric">
            <AsyncSelect
              loadOptions={this.getMetricNames.bind(this)}
              value={metricNameValue}
              onChange={this.onMetricNameChange}
              loadingMessage="Searching metrics..."
              defaultOptions={true}
              isSearchable={true}
              isLoading={this.state.isNameLoading}
              cacheOptions={true}
            />
          </Field>
        </div>
        <div className="gf-form">
          <TagsEditor
            tags={this.state.tagList}
            onUpdateTagElem={this.onUpdateTagElem}
            onRemoveTagElement={this.onRemoveTagElement}
            onAddNewTagElement={this.onAddNewTagElement}
            onClearTags={this.onClearTags}
            getTagValues={this.getTagValues.bind(this)}
            getTagNames={this.getTagNames.bind(this)}
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
                  value={samplingAlgorithmValue}
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
                  value={bucketSizeValue}
                  onChange={this.onBucketSizeChange}
                  invalid={this.state.isBuketSizeInvalid}
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
