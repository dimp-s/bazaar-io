//for pw encryption
import bcrypt from 'bcryptjs';
//create an object to return products
//underscore id to make mongo db compatible
const data = {
  users: [
    {
      name: 'Dipesh Khadgi',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('asdfgh'),
      isAdmin: true,
    },
    {
      name: 'yub Mohanjan',
      email: 'yub@gmail.com',
      password: bcrypt.hashSync('asdfgh'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'tuddrom Mo3',
      slug: 'tuddrom-Mo3',
      category: 'Electronics',
      image: '/images/mo3.png',
      price: 800,
      brand: 'Tuddrom',
      rating: 4.4,
      numReviews: 10,
      description: 'Budget Gaming Earphones',
      countInStock: 4,
    },
    {
      // _id: '2',
      name: 'tuddrom Mo2',
      slug: 'tuddrom-Mo2',
      category: 'Electronics',
      image: '/images/mo2.png',
      price: 600,
      brand: 'Tuddrom',
      rating: 4.0,
      numReviews: 10,
      description: 'Entry Level Earphones',
      countInStock: 0,
    },
    {
      // _id: '3',
      name: 'tuddrom R3',
      slug: 'tuddrom-R3',
      category: 'Electronics',
      image: '/images/r3.png',
      price: 2000,
      brand: 'Tuddrom',
      rating: 4.8,
      numReviews: 10,
      description: 'Dual Driver Gaming Earphones',
      countInStock: 10,
    },
  ],
};

export default data;
