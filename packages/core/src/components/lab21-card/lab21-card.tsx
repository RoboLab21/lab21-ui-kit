import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'lab21-card',
  styleUrl: 'lab21-card.css',
  shadow: true,
})
export class Lab21Card {
  @Prop() elevation: 'flat' | 'raised' = 'flat';

  render() {
    return (
      <Host>
        <section class={`card elevation-${this.elevation}`}>
          <slot />
        </section>
      </Host>
    );
  }
}