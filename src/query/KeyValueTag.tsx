import React, { ChangeEvent } from 'react';
import { Field, Input, IconButton, HorizontalGroup } from '@grafana/ui';
import { TagKeyElement } from './QueryEditor';

type Props = {
  index: number;
  tag: TagKeyElement;
  onUpdateTagElem: (index: number, newTagKey: TagKeyElement) => void;
  onRemoveTagElement: (index: number) => void;
};

export class KeyValueTagEditor extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  onTagKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onUpdateTagElem(this.props.index, {
      tagKey: event.target.value,
      tagValue: this.props.tag.tagValue,
    });
  };

  onTagValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onUpdateTagElem(this.props.index, {
      tagKey: this.props.tag.tagKey,
      tagValue: event.target.value,
    });
  };

  onDeleteTag = () => {
    this.props.onRemoveTagElement(this.props.index);
  };

  //label="Tag name" description="The tag you want to filter on"
  //label="Tag value" description="The tag value for the tag name to filter on"
  render() {
    return (
      <div className="gf-form">
        <HorizontalGroup align="center" wrap={false}>
          <Field label="Tag" description="Name">
            <Input name="tag-name" label="tag key" onChange={this.onTagKeyChange} value={this.props.tag.tagKey} />
          </Field>
          <Field label="Tag" description="Value">
            <Input
              name="tag-value"
              label="tag value"
              onChange={this.onTagValueChange}
              value={this.props.tag.tagValue}
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
