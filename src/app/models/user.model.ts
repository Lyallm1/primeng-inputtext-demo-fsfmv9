import { DeviceInfo } from 'ngx-device-detector';

export class UserModel {
  public username ?: string;
  public password ?: string;
  public userBrowser : any;
  public userOs : any;

  private browserName : any;
  private browserVersion : any;
  private os : any;
  private osVersion : any;
  
  constructor( deviceInfo : DeviceInfo ) {
    this.browserName = deviceInfo.browser;
    this.browserVersion = deviceInfo.browser_version;
    this.os = deviceInfo.os;
    this.osVersion = deviceInfo.os_version;
    this.userBrowser = `${this.browserName} ${this.browserVersion}`;
    this.userOs = `${this.os} ${this.osVersion}`;
  }
  
  public setLoginInfo( username : string, password : string ) : void {
    this.username = username;
    this.password = password;
  }
}

