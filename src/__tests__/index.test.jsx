import React from 'react';

import { beforeEach, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { server } from '../mocks/server';
import 'mutationobserver-shim';

import App from '../App';

import { BrowserRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';

const isAddMovieFormFileExists = fs.existsSync(
  path.resolve(__dirname, '../components/AddMovieForm.jsx'),
  'utf8'
);

const addMovieFormFile = isAddMovieFormFileExists
  ? fs
      .readFileSync(
        path.resolve(__dirname, '../components/AddMovieForm.jsx'),
        'utf8'
      )
      .replaceAll(/(?:\r\n|\r|\n| )/g, '')
  : '';

const isPrivateRouteFileExists = fs.existsSync(
  path.resolve(__dirname, '../components/PrivateRoute.jsx'),
  'utf8'
);

const privateRouteFile = isPrivateRouteFileExists
  ? fs
      .readFileSync(
        path.resolve(__dirname, '../components/PrivateRoute.jsx'),
        'utf8'
      )
      .replaceAll(/(?:\r\n|\r|\n| )/g, '')
  : '';

const appFile = fs
  .readFileSync(path.resolve(__dirname, '../App.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

const editMovieFormFile = fs
  .readFileSync(
    path.resolve(__dirname, '../components/EditMovieForm.jsx'),
    'utf8'
  )
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  document.body.innerHTML = '';
});
beforeEach(() => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

test('App.jsxde /movies/edit/:id routeu tanımlanmış', () => {
  expect(appFile).toContain('/movies/edit/:id');
});

test('EditMovieForm.jsxde useParmas hooku kullanılmış', () => {
  expect(editMovieFormFile).toContain('useParams()');
});

test('Edit Movie Routeunda ilgili film datası geliyor.', async () => {
  const user = userEvent.setup();
  expect(appFile).toContain('/movies/edit/:id');
  const buttons = await screen.findAllByText('Detay');
  await user.click(buttons[0]);
  await screen.findByText('The Godfather Detayları');
  await user.click(await screen.findByText('Edit'));
  expect(await screen.findByLabelText('Title')).toHaveValue('The Godfather');
});

test('Edit Movie editlenmiş filmi başarılı bir şekilde submit ediyor ve film detay sayfasına yönleniyor', async () => {
  const user = userEvent.setup();
  expect(appFile).toContain('/movies/edit/:id');
  await user.type(await screen.findByLabelText('Title'), ' Edited');
  await user.click(await screen.findByText('Değişiklikleri Kaydet'));
  await screen.findByText('The Godfather Edited');
});

test('Movie componentine sil butonu eklenmiş', async () => {
  const user = userEvent.setup();
  await user.click(await screen.findByText('Tüm filmler'));
  const buttons = await screen.findAllByText('Detay');
  await user.click(buttons[0]);
  await screen.findByText('Sil');
});

test('Film başarılı bir şekilde siliyor ve tüm filmler sayfasını açıyor.', async () => {
  const user = userEvent.setup();
  await user.click(await screen.findByText('Tüm filmler'));
  const buttons = await screen.findAllByText('Detay');
  await user.click(buttons[0]);
  await user.click(await screen.findByText('Sil'));
  expect(screen.queryByText('The Godfather Edited')).toBe(null);
});

test('AddMovieForm componenti için AddMovieForm.jsc dosyası eklenmiş.', () => {
  expect(isAddMovieFormFileExists).toBe(true);
});

test('App.jsxde /movies/add routeu tanımlanmış', () => {
  expect(appFile).toContain('/movies/add');
});

test('Yeni film ekle butonu film ekle sayfasını açıyor.', async () => {
  const user = userEvent.setup();
  await user.click(await screen.findByText('Yeni film ekle'));
  await screen.findByText('Yeni Film Ekle');
});

test('Yeni film ekle sayfasında label kullanılmış ve ilgili input alanına bağlanmış.', async () => {
  const user = userEvent.setup();
  await user.click(await screen.findByText('Yeni film ekle'));
  await screen.findByLabelText('Title');
  await screen.findByLabelText('Director');
  await screen.findByLabelText('Genre');
  await screen.findByLabelText('Metascore');
  await screen.findByLabelText('Description');
});

test('Yeni film ekleniyor ve movie sayfasına yönlendiriyor.', async () => {
  const user = userEvent.setup();
  await user.click(await screen.findByText('Yeni film ekle'));
  await user.type(await screen.findByLabelText('Title'), 'Yeni title');
  await user.type(await screen.findByLabelText('Director'), 'Yeni director');
  await user.type(await screen.findByLabelText('Genre'), 'Yeni genre');
  await user.type(await screen.findByLabelText('Metascore'), '55');
  await user.type(await screen.findByLabelText('Description'), 'yeni desc');
  await user.click(await screen.findByText('Yeni Filmi Kaydet'));
  await screen.findByText('Yeni title');
  await screen.findAllByText('Detay');
});

test('Filmler favorilere ekleniyor.', async () => {
  const user = userEvent.setup();
  await user.click(await screen.findByText('Tüm filmler'));
  expect(screen.queryAllByTestId('fav-movie')).toHaveLength(0);
  const buttons = await screen.findAllByText('Detay');
  await user.click(buttons[0]);
  await user.click(await screen.findByText('Favorilere ekle'));
  expect(await screen.findAllByTestId('fav-movie')).toHaveLength(1);
});

test('Filmler favorilere 2. kez eklenemiyor.', async () => {
  const user = userEvent.setup();
  await user.click(await screen.findByText('Tüm filmler'));
  const buttons = await screen.findAllByText('Detay');
  await user.click(buttons[0]);
  await user.click(await screen.findByText('Favorilere ekle'));
  await user.click(await screen.findByText('Favorilere ekle'));
  expect(await screen.findAllByTestId('fav-movie')).toHaveLength(1);
});

test('Film silinince favorilerden de siliniyor', async () => {
  const user = userEvent.setup();
  await user.click(await screen.findByText('Tüm filmler'));
  expect(screen.queryAllByTestId('fav-movie')).toHaveLength(0);
  const buttons = await screen.findAllByText('Detay');
  await user.click(buttons[0]);
  await user.click(await screen.findByText('Favorilere ekle'));
  expect(await screen.findAllByTestId('fav-movie')).toHaveLength(1);
  await user.click(await screen.findByText('Sil'));
  expect(screen.queryByTestId('fav-movie')).toBe(null);
});

test('DarkMode "dark bg-slate-900 h-screen" classlarını idsi main-container olan dive ekliyor', () => {
  const mainContainerDiv = document.querySelector('#main-container');
  expect(mainContainerDiv).toBeInTheDocument();
  expect(mainContainerDiv).toHaveClass('dark');
  expect(mainContainerDiv).toHaveClass('bg-slate-900');
  expect(mainContainerDiv).toHaveClass('h-screen');
});

test('DarkMode başlangıçta on, tıklanınca off oluyor', async () => {
  const user = userEvent.setup();
  await user.click(await screen.findByTestId('darkMode-toggle'));
  const mainContainerDiv = document.querySelector('#main-container');
  expect(mainContainerDiv).toBeInTheDocument();
  expect(mainContainerDiv).not.toHaveClass('dark');
  expect(mainContainerDiv).not.toHaveClass('bg-slate-900');
  expect(mainContainerDiv).not.toHaveClass('h-screen');
  expect(
    document.querySelector("[data-testid='darkMode-toggle']")
  ).not.toBeChecked();
  localStorage.clear();
});

test('Ana Sayfa Dark Mode On yazarak başlıyor, tıklanınca Dark Mode Off yazıyor', async () => {
  localStorage.clear();
  const user = userEvent.setup();
  screen.getByText('Dark Mode On');
  await user.click(await screen.findByTestId('darkMode-toggle'));
  await screen.findByText('Dark Mode Off');
});

test('Dark Mode değeri localstorageda s11d3 anahtarı ile tutuluyor', async () => {
  localStorage.clear();
  const user = userEvent.setup();
  await user.click(await screen.findByTestId('darkMode-toggle'));
  expect(localStorage.getItem('s11d3')).not.toBe(null);
});
