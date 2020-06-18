import React from 'react';
import { KeyValueTagEditor } from './KeyValueTag';
import { TagKeyElement } from './QueryEditor';
import { IconButton, HorizontalGroup } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';

type Props = {
  tags: TagKeyElement[];
  onUpdateTagElem: (index: number, newTagKey: TagKeyElement) => void;
  onRemoveTagElement: (index: number) => void;
  onAddNewTagElement: () => void;
  onClearTags: () => void;
  getTagValues: (tagName: string, tagValueInput: string) => Promise<Array<SelectableValue<string>>>;
  getTagNames: (tagNameInput: string) => Promise<Array<SelectableValue<string>>>;
};

export class TagsEditor extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  AddTagButton = () => {
    return (
      <IconButton
        onClick={this.props.onAddNewTagElement}
        tooltip="Add new tag filter"
        name="plus"
        size="xxl"
        surface="panel"
      ></IconButton>
    );
  };

  RemoveAllTagButton = () => {
    return (
      <IconButton
        onClick={this.props.onClearTags}
        tooltip="Remove all tags"
        name="trash-alt"
        size="xxl"
        surface="panel"
      ></IconButton>
    );
  };

  render() {
    const tags = this.props.tags;
    if (tags === undefined || tags.length === 0) {
      return <this.AddTagButton />;
    }
    const tagsElems: JSX.Element[] = tags.map((tag, index) => {
      return (
        <KeyValueTagEditor
          key={index}
          index={index}
          tag={tag}
          onUpdateTagElem={this.props.onUpdateTagElem}
          onRemoveTagElement={this.props.onRemoveTagElement}
          getTagValues={this.props.getTagValues}
          getTagNames={this.props.getTagNames}
        />
      );
    });
    return (
      <div>
        <HorizontalGroup align="center" wrap={true}>
          {tagsElems}
          <this.AddTagButton />
          <this.RemoveAllTagButton />
        </HorizontalGroup>
      </div>
    );
  }
}
