import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';

export interface DetailSection {
    title: string;
    rows: {
        label: string;
        key: string;
        isLink?: boolean;
        isItalic?: boolean;
        linkPrefix?: string;
    }[];
}

export interface DetailConfig {
    title: string;
    sections: DetailSection[];
    avatarKey?: string;
    descriptionKey?: string;
    tagKey?: string;
}

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent {
    readonly context = inject<TuiDialogContext<void, { data: any; config: DetailConfig }>>(POLYMORPHEUS_CONTEXT);

    get data(): any {
        return this.context.data.data;
    }

    get config(): DetailConfig {
        return this.context.data.config;
    }

    // Helper to resolve nested keys like 'address.street'
    resolveKey(obj: any, key: string): any {
        return key.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj);
    }

    close(): void {
        this.context.completeWith();
    }
}
