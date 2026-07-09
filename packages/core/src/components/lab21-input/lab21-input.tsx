import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'lab21-input',
  styleUrl: 'lab21-input.css',
  shadow: true,
})
export class Lab21Input {
  @Prop() type = 'text';
  @Prop() placeholder = '';
  @Prop() value = '';
  @Prop() disabled = false;
  @Prop() label = '';

  render() {
    return (
      <Host>
        <label class="field">
          {this.label && <span class="label">{this.label}</span>}
          <input
            class="input"
            type={this.type}
            placeholder={this.placeholder}
            value={this.value}
            disabled={this.disabled}
          />
        </label>
      </Host>
    );
  }
}
