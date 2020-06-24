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

type State = {
  isTagNameLoading: boolean;
  isTagValueLoading: boolean;
};

export class KeyValueTagEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isTagNameLoading: false,
      isTagValueLoading: false,
    };
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
    this.setState(state => {
      return {
        ...state,
        isTagValueLoading: true,
      };
    });
    return this.props.getTagValues(this.props.tag.tagKey, query).then(rsp => {
      this.setState(state => {
        return {
          ...state,
          isTagValueLoading: false,
        };
      });
      return rsp;
    });
  };

  loadTagNames = (query: string) => {
    this.setState(state => {
      return {
        ...state,
        isTagNameLoading: true,
      };
    });
    return this.props.getTagNames(query).then(rsp => {
      this.setState(state => {
        return {
          ...state,
          isTagNameLoading: false,
        };
      });
      return rsp;
    });
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
              loadingMessage="Searching tag names..."
              defaultOptions={true}
              isSearchable={true}
              isLoading={this.state.isTagNameLoading}
              cacheOptions={true}
            />
          </Field>
          <Field label="Value" description="Tag value">
            <AsyncSelect
              loadOptions={this.loadTagValues}
              value={{ label: this.props.tag.tagValue, value: this.props.tag.tagValue }}
              onChange={this.onTagValueChange}
              loadingMessage="Searching tag values..."
              defaultOptions={true}
              isSearchable={true}
              isLoading={this.state.isTagValueLoading}
              cacheOptions={true}
            />
          </Field>
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
