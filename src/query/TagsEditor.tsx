import React from 'react';
import { KeyValueTagEditor } from './KeyValueTag';
import { TagKeyElement } from './QueryEditor';
import { Button, IconButton, HorizontalGroup } from '@grafana/ui';

type Props = {
  tags: TagKeyElement[];
  onUpdateTagElem: (index: number, newTagKey: TagKeyElement) => void;
  onRemoveTagElement: (index: number) => void;
  onAddNewTagElement: () => void;
  onClearTags: () => void
};



export class TagsEditor extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  AddTagButton = () => {
    return (
      <Button variant="secondary" onClick={this.props.onAddNewTagElement}>
        <IconButton tooltip="Add new tag filter" name="plus" size="md" surface="panel" />
      tag
      </Button>
    );
  }

  render() {
    const tags = this.props.tags;
    if (tags === undefined || tags.length === 0) {
      return <this.AddTagButton/>;
    }
    const tagsElems: JSX.Element[] = tags.map((tag, index) => {
      return (
            <KeyValueTagEditor
            key={index}
            index={index}
            tag={tag}
            onUpdateTagElem={this.props.onUpdateTagElem}
            onRemoveTagElement={this.props.onRemoveTagElement}
            />            
      );
    });  
    return (
      <div>        
        <div>        
          <Button variant="secondary" onClick={this.props.onClearTags}>
            <IconButton tooltip="Clear all tags" name="trash-alt" size="md" surface="panel" />
          </Button>
        </div>
        <div>
          <HorizontalGroup align="flex-start" wrap={true}>
            {tagsElems}     
            <this.AddTagButton />  
          </HorizontalGroup>                     
        </div>
      </div>
    );
  }
}
