/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
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
    judul, penulisBuku, penerbitBuku, tahunTerbit,
  } = req.payload;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const id = nanoid(5);
  const addBK = {
    id, judul, penulisBuku, penerbitBuku, tahunTerbit, createdAt, updatedAt,
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
    judul, penulisBuku, penerbitBuku, tahunTerbit,
  } = req.payload;
  const updatedAt = new Date().toISOString();
  const index = databook.findIndex((d) => d.id === id);
  if (index !== -1) {
    databook[index] = {
      ...databook[index], judul, penulisBuku, penerbitBuku, tahunTerbit, updatedAt,
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
