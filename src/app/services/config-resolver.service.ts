import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable( {
  providedIn: 'root'
} )
export class ConfigResolverService implements Resolve<boolean> {

  constructor( private conf : ConfigService ) { }

  resolve( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) : Observable<boolean> {
    return this.conf.loadConfig().pipe(
      take( 1 ),
      mergeMap( ( results ) => {
        let i = 0;
        let error = false;
        while ( i < results.length && !error ) {
          if ( results[i] !== '' ) {
            error = true;
          }
          i++;
        }

        if ( !error ) {
          console.log( `Success in resolver service` );
          return of( true );
        } else {
          console.log( `Error in resolver service` );
          return EMPTY;
        }
      } )
    );
  }
}
