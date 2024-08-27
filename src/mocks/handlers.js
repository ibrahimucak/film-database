import { http, HttpResponse } from 'msw';
import { create, getById, getAll, edit, remove } from './data.js';

export const handlers = [
  http.get(
    'https://nextgen-project.onrender.com/api/s11d3/movies',
    ({ request }) => {
      return HttpResponse.json(getAll());
    }
  ),
  http.get(
    'https://nextgen-project.onrender.com/api/s11d3/movies/:id',
    ({ request, params }) => {
      return HttpResponse.json(getById(params.id));
    }
  ),
  http.put(
    'https://nextgen-project.onrender.com/api/s11d3/movies/:id',
    async ({ request, params }) => {
      const info = await request.json();
      return HttpResponse.json(edit(params.id, info));
    }
  ),
  http.delete(
    'https://nextgen-project.onrender.com/api/s11d3/movies/:id',
    async ({ request, params }) => {
      return HttpResponse.json(remove(params.id));
    }
  ),

  http.post(
    'https://nextgen-project.onrender.com/api/s11d3/movies',
    async ({ request }) => {
      const info = await request.json();

      return HttpResponse.json(create(info));
    }
  ),
];
