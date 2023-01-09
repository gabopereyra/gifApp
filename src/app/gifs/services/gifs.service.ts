import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gif, gifResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _apiKey: string = 'NFlgo0idudppkPjE86KuSVh71QJDLcWx';
  private _url: string = 'https://api.giphy.com/v1/gifs/search';

  private _historial: string[] = [];

  public resultado: gif[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('q', query)
      .set('limit', 10);

    this.http.get<gifResponse>(this._url, { params }).subscribe((response) => {
      console.log(response.data);
      this.resultado = response.data;
      localStorage.setItem('lastResult', JSON.stringify(this.resultado));
    });
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('lastResult')!) || [];
  }
}
