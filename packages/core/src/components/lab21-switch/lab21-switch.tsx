import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'lab21-switch',
  styleUrl: 'lab21-switch.css',
  shadow: true,
})
export class Lab21Switch {
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
        <button
          type="button"
          role="switch"
          aria-checked={this.checked ? 'true' : 'false'}
          class={{ track: true, on: this.checked, disabled: this.disabled }}
          onClick={this.onClick}
        >
          <span class="thumb"></span>
        </button>
        {this.label && <span class="label">{this.label}</span>}
      </Host>
    );
  }
}
