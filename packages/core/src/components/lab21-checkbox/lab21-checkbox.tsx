import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'lab21-checkbox',
  styleUrl: 'lab21-checkbox.css',
  shadow: true,
})
export class Lab21Checkbox {
  @Prop() checked = false;
  @Prop() disabled = false;
  @Prop() label = '';

  @Event() lab21Change: EventEmitter<boolean>;

  private onClick = () => {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.lab21Change.emit(this.checked);
  };

  render() {
    return (
      <Host>
        <label class={{ row: true, disabled: this.disabled }}>
          <button
            type="button"
            role="checkbox"
            aria-checked={this.checked ? 'true' : 'false'}
            class={{ box: true, checked: this.checked }}
            onClick={this.onClick}
          >
            {this.checked && <span class="mark">✓</span>}
          </button>
          {this.label && <span class="label">{this.label}</span>}
        </label>
      </Host>
    );
  }
}
