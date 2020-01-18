import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthority } from '@app/core/model/authority/authority.model';
import { Optional, toOptional } from '@app/core/typings/optional';
import { createRequestOption } from '@app/core/util/request-util';
import { QueryParam } from '@app/shared/configs/interfaces.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class AuthorityService {
  constructor(private http: HttpClient) {
  }

  query(req?: QueryParam): Observable<Optional<IAuthority[]>> {
    const options = createRequestOption(req);
    return this.http.get<IAuthority[]>('api/authority', { params: options, observe: 'response' }).pipe(map(this.mapResponseToBody));
  }

  getAll(req?: QueryParam): Observable<Optional<IAuthority[]>> {
    return this.http.get<IAuthority[]>('api/authority/all', { observe: 'response' }).pipe(map(this.mapResponseToBody));
  }

  protected mapResponseToBody<R>(resp: HttpResponse<R>): Optional<R> {
    return toOptional(resp.body);
  }
}
