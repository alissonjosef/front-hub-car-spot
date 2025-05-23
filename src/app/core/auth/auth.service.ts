import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { Login } from 'app/modules/admin/apps/services/files/models/login.model';
import { IUsuarioInstituicao } from 'app/modules/admin/apps/services/files/models/usuario-instituicao.model';
import { env } from 'environments/env';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { StateStorageService } from './guards/state-storage.service';

type JwtToken = {
    id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
    private _fuseConfigService = inject(FuseConfigService);
    private _stateStorageService = inject(StateStorageService);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    set roles(roles: string) {
        localStorage.setItem('roles', JSON.stringify(roles));
    }

    get roles(): string {
        return JSON.parse(localStorage.getItem('roles')) ?? [];
    }

    set refreshToken(token: string) {
        localStorage.setItem('refreshToken', token);
    }

    get refreshToken(): string {
        return localStorage.getItem('refreshToken') ?? '';
    }

    get tokenObj(): any {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return null;
        }
    }

    set tokenObj(tokenObj: any) {
        localStorage.setItem('user', JSON.stringify(tokenObj));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */

   
    signIn(credentials: Login): Observable<any> {
        

        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post<JwtToken>(`${env.api.url}api/authenticate`, credentials)
            .pipe(
                switchMap((response: any) => {
                    console.log(response);
                    this.accessToken = response.id_token;
                    this.refreshToken = response.refresh_token;
                    this._authenticated = true;
                    return of(response);
                })
            );
    }

    signInUsingToken(): Observable<any> {
        return this._httpClient
            .post('api/auth/sign-in-with-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    of(false)
                ),
                switchMap((response: any) => {
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    this._authenticated = true;

                    this._userService.user = response.user;

                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        localStorage.removeItem('accessToken');

        localStorage.removeItem('refreshToken');

        localStorage.removeItem('roles');

        this._authenticated = false;
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        return of(true);
        // If the access token exists, and it didn't expire, sign in using it
        // return this.signInUsingToken();
    }

    /* fetchUser(): Observable<EcommpareUser> {
        return this._httpClient.get<EcommpareUser>(`${env.api.eCommpare}/webapi/User/GetByEmail`, {
            params: {
                email: this.tokenObj.username
            }
        })
    } */

    listarInstiuicoes(username: string): Observable<HttpResponse<IUsuarioInstituicao[]>> {
        return this._httpClient.get<IUsuarioInstituicao[]>(`${env.api.url}api/authenticate/instituicoes/${username}`, { observe: 'response' });
    }

   
/* 
    private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
        this._stateStorageService.storeAuthenticationToken(response.id_token, rememberMe);
    } */
}
