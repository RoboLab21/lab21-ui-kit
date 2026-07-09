import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'lab21-radio-group',
  styleUrl: 'lab21-radio-group.css',
  shadow: true,
})
export class Lab21RadioGroup {
  @Prop() value = '';
  @Prop() name = 'lab21-radio';
  @Prop() options: string | string[] = [];
  @Prop() fieldLabel = '';

  @Event() lab21Change: EventEmitter<string>;

  private get parsedOptions(): string[] {
    if (Array.isArray(this.options)) return this.options;
    try {
      return JSON.parse(this.options);
    } catch {
      return String(this.options)
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);
    }
  }

  private select(option: string) {
    this.value = option;
    this.lab21Change.emit(option);
  }

  render() {
    return (
      <Host>
        {this.fieldLabel && <span class="label">{this.fieldLabel}</span>}
        <div class="group" role="radiogroup">
          {this.parsedOptions.map((option) => (
            <label class="row" key={option}>
              <button
                type="button"
                role="radio"
                aria-checked={this.value === option ? 'true' : 'false'}
                class={{ dot: true, checked: this.value === option }}
                onClick={() => this.select(option)}
              >
                {this.value === option && <span class="inner"></span>}
              </button>
              <span class="label">{option}</span>
            </label>
          ))}
        </div>
      </Host>
    );
  }
}
