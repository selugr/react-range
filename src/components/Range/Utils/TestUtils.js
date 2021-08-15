const pointerEventProps = ['movementX', 'pointerType']

export class PointerEventFake extends Event {
    constructor ( type, props ) {
        super( type, props )
        pointerEventProps.forEach( ( prop ) => {
            if ( props[prop] != null ) {
                this[prop] = props[prop]
            }
        } )
    }
}
