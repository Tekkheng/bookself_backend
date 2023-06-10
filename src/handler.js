/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */

/*
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
*/
const { nanoid } = require('nanoid');
const databook = require('./databook');
const getAllBook = ((req, h) => h.response({
  status: 'success',
  data: {
    databook,
  },
}));

const addBook = ((req, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage,
  } = req.payload;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const id = nanoid(5);

  let finished = false;
  let reading = false;

  if (pageCount === readPage) {
    finished = true;
  } else if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  } else if (readPage > '0') {
    reading = true;
  }

  if (name === '') {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }
  const addBK = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };
  databook.push(addBK);
  const isSuccess = databook.filter((d) => d.id === id).length > 0;
  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'data buku berhasil ditambahkan!',
      data: {
        bookId: id,
      },
    }).code(200);
  }
  return h.response({
    status: 'failed',
    message: 'data buku gagal ditambahkan!',
  }).code(500);
});

const getBookById = ((req, h) => {
  const { id } = req.params;
  const book = databook.filter((d) => d.id === id)[0];
  if (book !== undefined) {
    return h.response({
      status: 'success',
      data: {
        book,
      },
    }).code(200);
  }
  return h.response({
    status: 'failed',
    message: 'gagal, id tidak ditemukan!',
  }).code(404);
});

const editBookById = ((req, h) => {
  const { id } = req.params;
  const {
    name, year, author, summary,
  } = req.payload;
  const updatedAt = new Date().toISOString();
  const index = databook.findIndex((d) => d.id === id);
  if (index !== -1) {
    databook[index] = {
      ...databook[index], name, year, author, summary, updatedAt,
    };
    return h.response({
      status: 'success',
      message: `data book pada id=${id}, berhasil di edit!`,
    }).code(200);
  }
  return h.response({
    status: 'failed',
    message: 'gagal edit, id tidak ditemukan!',
  }).code(404);
});

const deleteBookById = ((req, h) => {
  const { id } = req.params;
  const index = databook.findIndex((d) => d.id === id);
  if (index !== -1) {
    databook.splice(index, 1);
    return h.response({
      status: 'success',
      message: `data book pada id=${id}, berhasil di hapus!`,
    }).code(200);
  }
  return h.response({
    status: 'failed',
    message: 'gagal hapus, id tidak ditemukan!',
  }).code(404);
});

module.exports = {
  getAllBook, addBook, getBookById, editBookById, deleteBookById,
};
