import * as React from 'react';
import Input from '../Input';

interface IEditablePlayerProps {
  name: string;
  points: number;
  totalScore: number;
  onNameChanged?: (name: string) => void;
  onPointsChanged?: (points: string) => void;
  onDelete?: () => void;
}

class EditablePlayer extends React.Component<IEditablePlayerProps, {}> {
  constructor(props: IEditablePlayerProps) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  public render() {
    return (
      <div className="player" style={{ '--player-score': this.props.points }}>
        <Input onChange={this.handleNameChange} value={this.props.name} />
        <Input onChange={this.handlePointsChange} value={this.props.points} type="tel" />
        {this.props.totalScore}
        <button onClick={this.handleDelete}>X</button>
      </div>
    );
  }

  private handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.onNameChanged) {
      this.props.onNameChanged(e.currentTarget.value);
    }
  }

  private handlePointsChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.onPointsChanged) {
      this.props.onPointsChanged(e.currentTarget.value);
    }
  }

  private handleDelete() {
    if (this.props.onDelete) {
      this.props.onDelete();
    }
  }
}

export default EditablePlayer;
