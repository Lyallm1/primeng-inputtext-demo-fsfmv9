import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Asset, ConfigService, HelmMap } from '../../services/config.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserModel } from 'src/app/models/user.model';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
  ],
} )

export class HomeComponent implements OnInit {

  /* Show/Hide components */
  public openLT ?: boolean;
  public siteCode ?: string;
  public openComponentDictionary ?: boolean;
  public openSideBar ?: boolean;
  public displayBasic ?: boolean;

  /* Selected */
  public helmMaps ?: HelmMap[];
  public selectedMap ?: HelmMap;
  public selectedAsset ?: Asset | null;

  /* User authentication */
  public isLoggedIn ?: boolean;
  public failedLogin ?: boolean;
  public username ?: string;
  public roles ?: string[];
  public model : {username : string; password : string} = { username: '', password: '' };
  public isLoading ?: boolean;

  constructor(
    private configService : ConfigService,
    private apiService : ApiService,
    private deviceService : DeviceDetectorService
  ) { }

  ngOnInit() : void {

    // For Local development for things based on AD role comment out below Auth stuff and uncomment below comments
    this.isLoggedIn = false;
    this.username = 'Bear Jones';
    this.roles = [
      'HELM Architect', 'HELM Developer', 'HELM Administrator', 'HELM Project Planner'
    ];
    this.getHelmMaps();

    //Auth stuff
    // this.isLoggedIn = true;
    // this.isLoading = true;
    // this.failedLogin = false;
    // this.apiService.getLoggedIn().subscribe( ( data : {success : boolean} )=>{
    //   this.isLoggedIn = data.success;
    //   if ( this.isLoggedIn ){
    //     this.apiService.getRoles().subscribe( ( data : {success : boolean; roles : string[]; username : string} )=>{
    //       if ( data.success ){
    //         this.username = data.username;
    //         this.roles = data.roles;
    //         this.isLoading = true;
    //         this.getHelmMaps();
    //       } else {
    //         this.isLoggedIn = false;
    //         this.isLoading = false;
    //       }
    //     } );
    //   } else {
    //     this.isLoading = false;
    //   }
    //   this.model = { username: '', password: '' };
    // } );
  }

  /*******************************************
  * gets the mine assets from service
  ********************************************/

  
  /*** SHOW OTHER COMPONENTS ***/

  showComponentDictionary( openCD : boolean ) : void {
    this.toggleSideBar( null, false );
    this.openComponentDictionary = openCD;
  }

  showLogicalTopology( siteCode : string ) : void {
    this.toggleSideBar( null, false );
    this.siteCode = siteCode;
    this.openLT = true;
  }

  showSelectedMap( $event : HelmMap ) : void {
    this.selectedMap = $event;
    this.openSideBar = false;
  }

  toggleSideBar( $event : Asset | null, isOn : boolean ) : void {
    this.openSideBar = isOn;
    if ( isOn ) {
      this.selectedAsset = $event;
    }
  }

  showDialog() : void {
    this.displayBasic = true;
  }

  private getHelmMaps() : void {
    this.configService.getMaps().subscribe( ( maps ) => {
      this.helmMaps = maps;
      // Look for Minerals Australia
      // TODO: Move this to config
      const potentiallyUndefinedSelectedMap : HelmMap | undefined = this.helmMaps.find( hm => hm.code === 'AUSTRALIA' );
      if ( potentiallyUndefinedSelectedMap !== undefined ) {
        this.selectedMap = potentiallyUndefinedSelectedMap;
      } else {
        console.error( '"this.selectedMap" is unexpectedly undefined' );
      }
      this.isLoading = false;
    } );
  }

  private login() : void {
    this.isLoading = true;
    const user = new UserModel( this.deviceService.getDeviceInfo() );
    user.setLoginInfo( this.model.username, this.model.password );
    this.apiService.basicLogIn( user ).subscribe( ( response : {success : boolean} ) =>{
      this.isLoggedIn = response.success;
      this.failedLogin = !response.success;
      if ( this.isLoggedIn ){
        this.apiService.getRoles().subscribe( ( data : {success : boolean; roles : string[]; username : string} )=>{
          if ( data.success ){
            this.username = data.username;
            this.roles = data.roles;
            this.getHelmMaps();
          } else {
            this.isLoggedIn = false;
          }
        } );
      } else {
        this.isLoading = false;
      }
    } );
  }
}
