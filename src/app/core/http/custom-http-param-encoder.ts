import { HttpParameterCodec } from '@angular/common/http';

/**
 * Encoder predefinito di Angular
 * "odata/employees?$expand=Role($select=Name)&$filter=startswith(Role/Name,'aperiteacher')"
 * Diventa: "/odata/employees?$expand=Role($select=Name)&$filter=startswith(Role/Name,%27aperiteacher%27)"
 * 
 * Il forward slash nel parametro di filtro '$filter=startswith(Role/Name...' non essendo codificato può essere interpretato come un separatore di path nell'URL.
 * Questo causa errori di routing o interpretazione errata della query
 * 
 * Con CustomHttpParamEncoder
 * "odata/employees?%24expand=Role(%24select%3DName)&%24filter=startswith(Role%2FName%2C%27aperiteacher%27)"
 * Diventa: odata/employees?%24expand=Role(%24select%3DName)&%24filter=startswith(Role%2FName%2C%27aperiteacher%27)
 * 
 * La query viene eseguita correttamente
 * 
 * @see {@link https://docs.oasis-open.org/odata/odata/v4.01/os/part2-url-conventions/odata-v4.01-os-part2-url-conventions.html#sec_URLComponents OData URL Components}
 * @see {@link https://github.com/angular/angular/issues/18261 Angular Issue: HttpParams does not encode forward slashes}
 */
export class CustomHttpParamEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }
    encodeValue(value: string): string {
        return encodeURIComponent(value);
    }
    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }
    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}