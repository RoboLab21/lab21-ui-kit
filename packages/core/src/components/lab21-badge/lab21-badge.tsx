import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'lab21-badge',
  styleUrl: 'lab21-badge.css',
  shadow: true,
})
export class Lab21Badge {
  @Prop() variant: 'default' | 'secondary' | 'outline' = 'default';

  render() {
    return (
      <Host>
        <span class={`badge variant-${this.variant}`}>
          <slot></slot>
        </span>
      </Host>
    );
  }
}
