import { ComponentFactoryResolver, Directive, ElementRef, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { isPresent, Optional } from '@app/core/typings/optional';
import { SpinnerComponent } from '../spinner-component/spinner.component';

@Directive({
	selector: '[bmmtLoading]'
})
export class BmmtLoadingDirective<T> {
	constructor(private viewContainerRef: ViewContainerRef,
		private renderer: Renderer2,
		private element: ElementRef,
		private cfr: ComponentFactoryResolver) {
	}

	showLoading(): void {
		this.renderer.addClass(this.element.nativeElement, 'hidden');
		const cmpFactory = this.cfr.resolveComponentFactory(SpinnerComponent);
		this.viewContainerRef.createComponent(cmpFactory);

	}

	showContent(): void {
		this.renderer.removeClass(this.element.nativeElement, 'hidden');
		this.viewContainerRef.remove(0);
	}

	@Input()
	public set bmmtLoading(deferredData: Optional<T>) {
		if (isPresent(deferredData)) {
			this.showContent();
		} else {
			this.showLoading();
		}
	}

}
