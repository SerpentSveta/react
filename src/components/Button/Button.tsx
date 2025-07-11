import './Button.css';
import { Component } from 'react';
import type { ButtonProps } from '../../services/types';

export class Button extends Component<ButtonProps> {
  render() {
    return (
      <button className="button" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}
