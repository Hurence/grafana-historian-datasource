import React, { PureComponent } from 'react';
import { Select, HorizontalGroup, Field, Legend, Tooltip, Icon, AsyncSelect } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from '../DataSource';
import { MyDataSourceOptions, MyQuery } from '../types';
import kebabCase from 'lodash/kebabCase';
import { TagsEditor } from './TagsEditor';
import { InputActionMeta } from '@grafana/ui/components/Select/types';

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

  // onMetricNameChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { onChange, query } = this.props;
  //   onChange({ ...query, name: event.target.value });
  // };

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
        bucket_size: query.sampling?.bucket_size
      },
    });
  };

  onBucketSizeChange = (selected: SelectableValue<number>) => {
    const { onChange, query } = this.props;
    onChange({
      ...query, 
      sampling: {
        algorithm: query.sampling?.algorithm,
        bucket_size: selected.value
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

  /**
   * return all metric name matching metricNameInput
   * @param metricNameInput
   */
  async getMetricNames(metricNameInput: string): Promise<Array<SelectableValue<string>>> {
    console.error("metricNameInput", metricNameInput)
    return this.props.datasource.getMetricNames(metricNameInput).then(metricNames => {
      return metricNames.map(name => {
        return { label: name, value: name };
      });
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
    return this.props.datasource.getTagNameValues(tagName, tagValueInput).then(tagValues => {
      return tagValues.map(name => {
        return { label: name, value: name };
      });
    });
  }

  private getBucketSizeValue(): SelectableValue<number> {
    if (this.props.query.sampling?.bucket_size !== undefined) {
      return { label: this.props.query.sampling?.bucket_size.toString(), value: this.props.query.sampling?.bucket_size }
    }
    return { label: 'default', value: 0 };
  }

  private getSamplingAlgoValue(): SelectableValue<string> {
    if (this.props.query.sampling?.bucket_size !== undefined) {
      return { label: this.props.query.sampling?.algorithm, value: this.props.query.sampling?.algorithm }
    }
    return { label: 'default', value: 'NONE' };
  }


  private getNameValue(): SelectableValue<string> {
    if (this.props.query.sampling?.bucket_size !== undefined) {
      return { label: this.props.query.name, value: this.props.query.name }
    }
    return { label: '', value: '' };
  }

  render() {
    const bucketSizeValue: SelectableValue<number> = this.getBucketSizeValue();
    const samplingAlgorithmValue: SelectableValue<string> = this.getSamplingAlgoValue();
    const metricNameValue: SelectableValue<string> = this.getNameValue();
    //AsyncSelect onKeyDown
    return (
      <div className="gf-form-group">
        <Legend>Metric</Legend>
        <div className="gf-form">
          <AsyncSelect
            loadOptions={this.getMetricNames.bind(this)}        
            value={metricNameValue}         
            onChange={this.onMetricNameChange}
            loadingMessage="Searching metrics..."
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

  // const getKnobs = () => {
  //   const disabled = boolean('Disabled', false, BEHAVIOUR_GROUP);
  //   const invalid = boolean('Invalid', false, BEHAVIOUR_GROUP);
  //   const loading = boolean('Loading', false, BEHAVIOUR_GROUP);
  //   const prefixSuffixOpts = {
  //     None: null,
  //     Text: '$',
  //     ...getAvailableIcons().reduce<Record<string, string>>((prev, c) => {
  //       return {
  //         ...prev,
  //         [`Icon: ${c}`]: `icon-${c}`,
  //       };
  //     }, {}),
  //   };
  //   const VISUAL_GROUP = 'Visual options';
  //   // ---
  //   const prefix = select('Prefix', prefixSuffixOpts, null, VISUAL_GROUP);
  //   const width = number('Width', 0, undefined, VISUAL_GROUP);

  //   let prefixEl: any = prefix;
  //   if (prefix && prefix.match(/icon-/g)) {
  //     prefixEl = <Icon name={prefix.replace(/icon-/g, '') as IconName} />;
  //   }

  //   return {
  //     width,
  //     disabled,
  //     invalid,
  //     loading,
  //     prefixEl,
  //   };
  // };

  // const getDynamicProps = () => {
  //   const knobs = getKnobs();
  //   return {
  //     width: knobs.width,
  //     disabled: knobs.disabled,
  //     isLoading: knobs.loading,
  //     invalid: knobs.invalid,
  //     prefix: knobs.prefixEl,
  //   };
  // };
}
