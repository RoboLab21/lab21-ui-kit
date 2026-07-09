import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'lab21-slider',
  styleUrl: 'lab21-slider.css',
  shadow: true,
})
export class Lab21Slider {
  @Prop() value = 0;
  @Prop() min = 0;
  @Prop() max = 100;
  @Prop() step = 1;
  @Prop() disabled = false;

  @Event() lab21Change: EventEmitter<number>;

  private onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.lab21Change.emit(this.value);
  };

  render() {
    return (
      <Host>
        <input
          class="slider"
          type="range"
          min={this.min}
          max={this.max}
          step={this.step}
          value={this.value}
          disabled={this.disabled}
          onInput={this.onChange}
        />
      </Host>
    );
  }
}
