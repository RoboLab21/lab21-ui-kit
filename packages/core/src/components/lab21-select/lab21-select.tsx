import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'lab21-select',
  styleUrl: 'lab21-select.css',
  shadow: true,
})
export class Lab21Select {
  @Prop() value = '';
  @Prop() options: string | string[] = [];
  @Prop() placeholder = 'Select...';
  @Prop() disabled = false;
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

  private onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.lab21Change.emit(this.value);
  };

  render() {
    return (
      <Host>
        {this.fieldLabel && <span class="label">{this.fieldLabel}</span>}
        <select class="select" disabled={this.disabled} onChange={this.onChange}>
          <option value="" disabled>
            {this.placeholder}
          </option>
          {this.parsedOptions.map((option) => (
            <option value={option} selected={this.value === option}>
              {option}
            </option>
          ))}
        </select>
      </Host>
    );
  }
}
