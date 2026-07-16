import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  OnInit,
  output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { AngularVoid } from '@rolster/angular-forms';
import {
  ListElement,
  locationListCanTop,
  navigationListFromElement,
  navigationListFromInput
} from '@rolster/components';
import { RlsIconComponent } from '../../atoms';
import {
  RlsBallotComponent,
  RlsMessageFormErrorComponent
} from '../../molecules';

@Component({
  selector: 'rls-field-select',
  standalone: true,
  templateUrl: 'field-select.component.html',
  styleUrls: ['field-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsIconComponent,
    RlsBallotComponent,
    RlsMessageFormErrorComponent
  ]
})
export class RlsFieldSelectComponent<
  T = any,
  E extends ListElement<T> = ListElement<T>
> implements OnInit {
  public suggestions = input<E[]>([]);

  public formControl = input<AngularVoid<T>>();

  public label = input(true);

  public placeholder = input('');

  public disabled = input(false);

  public value = output<T | undefined>();

  private content: HTMLDivElement | null = null;

  private list: HTMLUListElement | null = null;

  private input: HTMLInputElement | null = null;

  private position = 0;

  protected inputValue = signal('');

  protected visible = signal(false);

  protected higher = signal(false);

  protected disabledInput = computed(
    () => this.formControl()?.disabled() ?? this.disabled()
  );

  constructor(private ref: ElementRef<HTMLElement>) {
    effect(() => {
      this.checkSuggestion(this.suggestions(), this.formControl()?.value());
    });
  }

  public ngOnInit(): void {
    this.content =
      this.ref.nativeElement.querySelector<HTMLDivElement>('.rls-field-select');

    this.list = this.ref.nativeElement.querySelector<HTMLUListElement>(
      '.rls-field-list__ul'
    );

    this.input = this.ref.nativeElement.querySelector<HTMLInputElement>(
      '.rls-field-list__control'
    );
  }

  @HostListener('document:click', ['$event.target'])
  public onDocumentClick(element: HTMLElement) {
    if (!this.ref.nativeElement.contains(element)) {
      this.closeSuggestions();
    }
  }

  public onInputFocus(): void {
    this.formControl()?.focus();
  }

  public onInputBlur(): void {
    this.formControl()?.blur();
  }

  public onInputClick(): void {
    this.toggleSuggestions();
  }

  public onInputKeydown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Space':
      case 'Enter':
        this.openSuggestions();
        break;

      case 'Escape':
      case 'Tab':
        this.closeSuggestions();
        break;

      default:
        if (this.visible()) {
          const { content, list } = this;

          this.position =
            navigationListFromInput({ content, event, list }) ?? 0;
        }
        break;
    }
  }

  public onActionClick(): void {
    this.toggleSuggestions();
  }

  public onBackdropClick(): void {
    this.visible.set(false);
  }

  public onKeydownElement(suggestion: E, event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.onSelect(suggestion);
    } else {
      const { content, input, list, position } = this;

      this.position = navigationListFromElement({
        content,
        event,
        input,
        list,
        position
      });
    }
  }

  public onSelect({ value }: E): void {
    this.visible.set(false);
    this.emitValue(value);
    this.formControl()?.touch();
  }

  private openSuggestions(): void {
    const { content, list } = this;

    this.higher.set(locationListCanTop(content, list));
    this.visible.set(true);
  }

  private closeSuggestions(): void {
    this.visible.set(false);
  }

  private toggleSuggestions(): void {
    if (this.visible()) {
      this.closeSuggestions();
    } else {
      this.openSuggestions();
      this.formControl()?.focus();
    }
  }

  private emitValue(value?: T): void {
    this.formControl()?.setValue(value);
    this.value.emit(value);
  }

  private checkSuggestion(suggestions: E[], value?: T): void {
    const suggestion = value
      ? suggestions.find((element) => element.compareTo(value))
      : undefined;

    if (value && !suggestion) {
      this.emitValue(undefined);
    }

    this.inputValue.set(suggestion?.description ?? '');
  }
}
