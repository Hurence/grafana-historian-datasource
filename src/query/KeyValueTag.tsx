import React from 'react';
import { Field, IconButton, HorizontalGroup, AsyncSelect } from '@grafana/ui';
import { TagKeyElement } from './QueryEditor';
import { SelectableValue } from '@grafana/data';

type Props = {
  index: number;
  tag: TagKeyElement;
  onUpdateTagElem: (index: number, newTagKey: TagKeyElement) => void;
  onRemoveTagElement: (index: number) => void;
  getTagValues: (tagName: string, tagValueInput: string) => Promise<Array<SelectableValue<string>>>;
  getTagNames: (tagNameInput: string) => Promise<Array<SelectableValue<string>>>;
};

export class KeyValueTagEditor extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  onTagKeyChange = (selected: SelectableValue<string>) => {
    this.props.onUpdateTagElem(this.props.index, {
      tagKey: selected.value || '',
      tagValue: this.props.tag.tagValue,
    });
  };

  onTagValueChange = (selected: SelectableValue<string>) => {
    this.props.onUpdateTagElem(this.props.index, {
      tagKey: this.props.tag.tagKey,
      tagValue: selected.value || '',
    });
  };

  onDeleteTag = () => {
    this.props.onRemoveTagElement(this.props.index);
  };

  loadTagValues = (query: string) => {
    return this.props.getTagValues(this.props.tag.tagKey, query);
  };

  loadTagNames = (query: string) => {
    return this.props.getTagNames(query);
  };

  //label="Tag name" description="The tag you want to filter on"
  //label="Tag value" description="The tag value for the tag name to filter on"
  render() {
    return (
      <div className="gf-form">
        <HorizontalGroup align="center" wrap={false}>
          <Field label="Name" description="Tag name">
            <AsyncSelect
              loadOptions={this.loadTagNames}
              value={{ label: this.props.tag.tagKey, value: this.props.tag.tagKey }}
              onChange={this.onTagKeyChange}
              loadingMessage="Searching metrics..."
            />
          </Field>
          <Field label="Value" description="Tag value">
            <AsyncSelect
              loadOptions={this.loadTagValues}
              value={{ label: this.props.tag.tagValue, value: this.props.tag.tagValue }}
              onChange={this.onTagValueChange}
              loadingMessage="Searching metrics..."
            />
          </Field>
          {/* <Input 
            name="tag-name" 
            label="tag key" 
            onChange={this.onTagKeyChange} 
            value={this.props.tag.tagKey} />
            <Input
              name="tag-value"
              label="tag value"
              onChange={this.onTagValueChange}
              value={this.props.tag.tagValue}
            /> */}

          <IconButton
            onClick={this.onDeleteTag}
            name="trash-alt"
            size="md"
            tooltip="Remove tag"
            iconType="default"
          ></IconButton>
        </HorizontalGroup>
      </div>
    );
  }
}
