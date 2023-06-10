/* eslint-disable linebreak-style */
const {
  getAllBook, addBook, getBookById, editBookById, deleteBookById,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBook,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById,
  },
];
module.exports = routes;
