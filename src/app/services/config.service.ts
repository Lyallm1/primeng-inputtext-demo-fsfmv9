import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface MineSite {
  name : string;
  code : string;
  asset : string;
  isActive : boolean;
}

export interface Asset {
  name : string;
  code : string;
  description : string;
  isActive : boolean;
  mapCode ?: string;
  subAssets ?: Asset[];
  location ?: Location;
}

export interface HelmMap {
  code : string;
  name : string;
  bounds : Location[]; // [southWest, northEast]
  zoomLevel : number;
  color : string;
}

export interface Location {
  latitude : number;
  longitude : number;
}

interface MapsAssetsConfResp {
  code : string;
  details : {
    map : HelmMap;
    assets : Asset[];
  };
}

@Injectable( {
  providedIn: 'root',
} )
export class ConfigService {
  private configLoaded = false;
  private helmMaps : HelmMap[] = [];
  private sites : MineSite[] = [];
  private assets : {[mapName : string] : Asset[]} = {};

  constructor( private http : HttpClient ) {}

  initMapsAssetsConfig( mapsAssetsConfResp : MapsAssetsConfResp[] ) : void {
    mapsAssetsConfResp.forEach( mapAsset => {
      this.helmMaps.push( mapAsset.details.map );
      this.assets[mapAsset.code] = mapAsset.details.assets;

      // Attach map code to each asset
      this.assets[mapAsset.code].forEach( asset => {
        asset.mapCode = mapAsset.code;
      } );
    } );

    // Sort Businesses alphabetically
    this.helmMaps.sort( ( a : HelmMap, b : HelmMap ) => {
      let returnVal = 0;
      if ( a.name < b.name ) {
        returnVal = -1;
      } else if ( a.name > b.name ) {
        returnVal = 1;
      }

      return returnVal;
    } );
  }

  initSitesConfig( sitesConfResp : any[] ) : void {
    sitesConfResp.forEach( site => {
      this.sites.push( site );
    } );
  
    // Sort alphabetically
    this.sites.sort( ( a : MineSite, b : MineSite ) => {
      let returnVal = 0;
      if ( a.name < b.name ) {
        returnVal = -1;
      } else if ( a.name > b.name ) {
        returnVal = 1;
      }

      return returnVal;
    } );
  }

  /**
   * Waits for both mapAssets and sites GET request
   */
  loadConfig() : Observable<[string, string]> {
    if ( !this.configLoaded ) {
      const apiBaseUrl = 'https://uvd8okeyh2.execute-api.ap-southeast-2.amazonaws.com/test/';
      const mapAssetsURL = `${apiBaseUrl}maps-assets`;
      const sitesURL = `${apiBaseUrl}helm-sites`;

      const mapAssetsResponse = this.http.get( mapAssetsURL ).pipe(
        map( ( res : any ) => {
          this.initMapsAssetsConfig( res );
          return '';
        } ),
        catchError( ( err ) => {
          console.log( err );
          return 'mapsAssets - bear :(';
        } )
      );

      const sitesResponse = this.http.get( sitesURL ).pipe(
        map( ( res : any ) => {
          this.initSitesConfig( res );
          return '';
        } ),
        catchError( ( err ) => {
          console.log( err );
          return 'sites - bear :(';
        } )
      );
      
      return forkJoin( [
        mapAssetsResponse, sitesResponse
      ] );
    } else {
      console.error( '"loadConfig" was called after config was already loaded' );
      // All branches of the function must return an Observable for type completeness
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      return new Observable( ( observer ) => ( { unsubscribe() {} } ) );
    }
  }

  /**
   * Return all assets if mapCode is "ALL"
   *
   * @param mapCode One of ["AUSTRALIA", "AMERICAS", "PETROLEUM", "ALL"]
   */
  getAssets( mapCode : string ) : Observable<Asset[]> {
    let assetsToReturn : Asset[] = [];
    if ( mapCode === 'ALL' ) {
      // eslint-disable-next-line guard-for-in
      for ( const code in this.assets ) {
        assetsToReturn = assetsToReturn.concat( this.assets[code] );
      }
    } else {
      assetsToReturn = this.assets[mapCode];
    }
    return of( assetsToReturn );
  }

  getMineSites() : Observable<MineSite[]> {
    return of( this.sites );
  }

  getMaps() : Observable<HelmMap[]> {
    return of( this.helmMaps );
  }
}

