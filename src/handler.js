/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable import/newline-after-import */
const { nanoid } = require('nanoid');
let databook = require('./databook');
// const getAllBook = ((req, h) => h.response({
//   status: 'success',
//   data: {
//     databook,
//   },
// }).code(200));

// const getAllBook = ((req, h) => h.response({
//   status: 'success',
//   data: {
//     books,
//   },
// }));
const getAllBook = ((req, h) => {
  databook.forEach((d) => {
    databook = {
      id: d.id,
      name: d.name,
      publisher: d.publisher,
    };
  });
  h.response({
    status: 'success',
    data: {
      databook,
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
  let reading = false;

  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }
  if (typeof (pageCount) === 'number' && typeof (readPage) === 'number') {
    if (pageCount === readPage) {
      finished = true;
    } else if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    } else if (readPage > 0) {
      reading = true;
    }
  } else {
    return h.response({
      status: 'fail',
      message: 'pageCount atau readPage harus angka!',
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
  let reading = false;

  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }
  if (typeof (pageCount) === 'number' && typeof (readPage) === 'number') {
    if (pageCount === readPage) {
      finished = true;
    } else if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    } else if (readPage > 0) {
      reading = true;
    }
  } else {
    return h.response({
      status: 'fail',
      message: 'pageCount atau readPage harus angka!',
    }).code(400);
  }
  const index = databook.findIndex((d) => d.id === id);
  if (index !== -1) {
    databook[index] = {
      ...databook[index], name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt,
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
  const index = databook.findIndex((d) => d.id === id);
  if (index !== -1) {
    databook.splice(index, 1);
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
