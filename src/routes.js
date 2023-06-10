/* eslint-disable linebreak-style */
const { getAllBook, addBook, getBookById, editBookById, deleteBookById } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/book',
    handler: getAllBook,
  },
  {
    method: 'POST',
    path: '/book',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/book/{id}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/book/{id}',
    handler: editBookById,
  },
  {
    method: 'DELETE',
    path: '/book/{id}',
    handler: deleteBookById,
  },
];
module.exports = routes;
