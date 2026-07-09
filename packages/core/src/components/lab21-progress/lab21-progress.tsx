import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'lab21-progress',
  styleUrl: 'lab21-progress.css',
  shadow: true,
})
export class Lab21Progress {
  @Prop() value = 0;
  @Prop() max = 100;

  private get percent() {
    const clamped = Math.max(0, Math.min(this.max, this.value));
    return Math.round((clamped / this.max) * 100);
  }

  render() {
    return (
      <Host>
        <div class="track" role="progressbar" aria-valuenow={this.percent} aria-valuemin={0} aria-valuemax={100}>
          <div class="fill" style={{ width: `${this.percent}%` }}></div>
        </div>
      </Host>
    );
  }
}
