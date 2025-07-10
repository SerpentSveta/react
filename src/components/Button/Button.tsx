import { Component } from 'react';
import './Button.css';

type ButtonProps = {
  onClick: () => void;
  children: string;
};

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button className="button" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}
