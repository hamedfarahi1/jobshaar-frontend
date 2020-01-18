import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';
import { Principal } from '@app/core/auth/principal.service';

@Directive({
	selector: '[bmmtUserAccess]'
})
export class BmmtUserAccessDirective implements OnInit {
	@Input() bmmtUserAccess: string = '';
	constructor(private element: ElementRef, private principal: Principal, private renderer: Renderer) {
	}
	ngOnInit(): void {
		this.bmmtUserAccess = this.bmmtUserAccess.toUpperCase();
		// this.bmmtUserAccess = this.replaceAll(this.bmmtUserAccess, '-', '_');
		const userAccesses = [this.bmmtUserAccess];
		this.principal.hasAnyAuthority(userAccesses).then(response => {
			if (!response) {
				this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
			}
		});
	}

	replaceAll(statement: string, search: string, replacement: string): string {
		return statement.replace(new RegExp(search, 'g'), replacement);
	}

}
