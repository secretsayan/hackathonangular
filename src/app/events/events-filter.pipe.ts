import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'eventFilter'})
export class EventFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any[] {
        let filter: string = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter((event) =>
            event.description.toLocaleLowerCase().startsWith(filter) != false) : value;
    }
}
