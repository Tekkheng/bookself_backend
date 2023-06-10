/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable import/newline-after-import */
const { nanoid } = require('nanoid');
const databooks = require('./databooks');

const getAllBook = ((req, h) => {
  const { name } = req.query;
  const books = databooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  const bookByName = books.filter((book) => book.name === name);
  if (bookByName === name) {
    return h.response({
      status: 'success',
      data: {
        bookByName,
      },
    });
  }
  return h.response({
    status: 'success',
    data: {
      books,
    },
  });
});

const addBook = ((req, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage,
  } = req.payload;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const id = nanoid(5);

  let finished = false;
  const reading = false;

  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }
  if (typeof (pageCount) === 'number' && typeof (readPage) === 'number' && typeof (year) === 'number') {
    if (pageCount === readPage) {
      finished = true;
    } else if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    }
  } else {
    return h.response({
      status: 'fail',
      message: 'pageCount,readPage, dan year harus angka!',
    }).code(400);
  }
  const addBK = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };
  databooks.push(addBK);
  const isSuccess = databooks.filter((d) => d.id === id).length > 0;
  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }
  return h.response({
    status: 'failed',
    message: 'Buku gagal ditambahkan',
  }).code(500);
});

const getBookById = ((req, h) => {
  const { id } = req.params;
  const book = databooks.filter((d) => d.id === id)[0];
  if (book !== undefined) {
    return h.response({
      status: 'success',
      data: {
        book,
      },
    }).code(200);
  }
  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
});

const editBookById = ((req, h) => {
  const { id } = req.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage,
  } = req.payload;
  const updatedAt = new Date().toISOString();
  let finished = false;
  const reading = false;

  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }
  if (typeof (pageCount) === 'number' && typeof (readPage) === 'number' && typeof (year) === 'number') {
    if (pageCount === readPage) {
      finished = true;
    } else if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    }
  } else {
    return h.response({
      status: 'fail',
      message: 'pageCount,readPage, dan year harus angka!',
    }).code(400);
  }
  const index = databooks.findIndex((d) => d.id === id);
  if (index !== -1) {
    databooks[index] = {
      ...databooks[index], name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt,
    };
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }
  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
});

const deleteBookById = ((req, h) => {
  const { id } = req.params;
  const index = databooks.findIndex((d) => d.id === id);
  if (index !== -1) {
    databooks.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }
  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
});

module.exports = {
  getAllBook, addBook, getBookById, editBookById, deleteBookById,
};
