import { Component, h, Host, Prop } from '@stencil/core';

type Lab21ButtonVariant = 'default' | 'outline' | 'ghost';
type Lab21ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'lab21-button',
  styleUrl: 'lab21-button.css',
  shadow: true,
})
export class Lab21Button {
  @Prop() variant: Lab21ButtonVariant = 'default';
  @Prop() size: Lab21ButtonSize = 'md';
  @Prop() disabled = false;

  private get classes() {
    return [
      'button',
      `variant-${this.variant}`,
      `size-${this.size}`,
      this.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private onClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  render() {
    return (
      <Host>
        <button class={this.classes} disabled={this.disabled} onClick={this.onClick}>
          <slot />
        </button>
      </Host>
    );
  }
}