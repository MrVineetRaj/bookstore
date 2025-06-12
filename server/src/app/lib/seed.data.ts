import { Order, UserRole } from '../../generated/prisma';

const userFirstNames = [
  'John',
  'Jane',
  'Amit',
  'Maria',
  'David',
  'Sara',
  'Michael',
];

const userLastNames = [
  'Doe',
  'Smith',
  'Patel',
  'Garcia',
  'Johnson',
  'Lee',
  'Brown',
];

const password = '1234';

const emailDomains = [
  'example.com',
  'test.com',
  'demo.com',
  'sample.com',
  'mail.com',
];
type User = {
  name: string;
  email: string;
  password: string; // In a real application, this should be hashed
  role: UserRole;
  is_email_verified: boolean;
};

type Store = {
  owner_id: string;
  name: string;
  description: string;
};

type Book = {
  store_id: string;
  title: string;
  description: string;
  author: string;
  price: number;
};

type CartItem = {
  store_id: string;
  book_id: string;
  user_id: string;
};

const generateRandomCustomers = (count: number): User[] => {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    const firstName =
      userFirstNames[Math.floor(Math.random() * userFirstNames.length)];
    const lastName =
      userLastNames[Math.floor(Math.random() * userLastNames.length)];
    const emailDomain =
      emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomain}`;

    users.push({
      name: `${firstName} ${lastName}`,
      email,
      password, // In a real application, this should be hashed
      role: UserRole.CUSTOMER,
      is_email_verified: true,
    });
  }
  return users;
};

const generateRandomSellers = (count: number): User[] => {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    const firstName =
      userFirstNames[Math.floor(Math.random() * userFirstNames.length)];
    const lastName =
      userLastNames[Math.floor(Math.random() * userLastNames.length)];
    const emailDomain =
      emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomain}`;

    users.push({
      name: `${firstName} ${lastName}`,
      email,
      password, // In a real application, this should be hashed
      role: UserRole.SELLER,
      is_email_verified: true,
    });
  }
  return users;
};

const storeNames = [
  'Book Haven',
  'Readers Paradise',
  'Literary Corner',
  'The Book Nook',
  'Novel Ideas',
  'Page Turners',
  'Bookworm Emporium',
  'The Reading Room',
];

const storeDescriptions = [
  'A cozy bookstore with a wide selection of books.',
  'A haven for book lovers with a curated collection.',
  'A charming bookstore with a focus on rare finds.',
  'A quaint bookstore with a warm atmosphere.',
  'A modern bookstore with a diverse range of genres.',
  'A unique bookstore with a focus on local authors.',
];

const generateRandomStores = (count: number, owner_ids: string[]) => {
  const stores: Store[] = [];
  for (let i = 0; i < count; i++) {
    const name = storeNames[Math.floor(Math.random() * storeNames.length)];
    const description =
      storeDescriptions[Math.floor(Math.random() * storeDescriptions.length)];

    const owner_id = owner_ids[Math.floor(Math.random() * owner_ids.length)];

    stores.push({
      name,
      description,
      owner_id,
    });
  }
  return stores;
};

const bookTitles = [
  'The Great Gatsby',
  'To Kill a Mockingbird',
  '1984',
  'Pride and Prejudice',
  'The Catcher in the Rye',
  'The Lord of the Rings',
  'The Hobbit',
  'Fahrenheit 451',
  'Brave New World',
];

const bookAuthors = [
  'F. Scott Fitzgerald',
  'Harper Lee',
  'George Orwell',
  'Jane Austen',
  'J.D. Salinger',
  'J.R.R. Tolkien',
  'Ray Bradbury',
  'Aldous Huxley',
];

const bookDescriptions = [
  'A classic novel set in the Jazz Age.',
  'A novel about racial injustice in the Deep South.',
  'A dystopian novel about totalitarianism and surveillance.',
  'A romantic novel about the manners of the British gentry.',
  'A novel about teenage alienation and rebellion.',
  'An epic fantasy novel about the struggle for Middle-earth.',
  'A fantasy novel about the journey of a hobbit.',
  'A dystopian novel about a future where books are banned.',
  'A dystopian novel about a future society driven by consumerism.',
];

const generateRandomBooks = (count: number, store_ids: string[]) => {
  const books: Book[] = [];

  for (let i = 0; i < count; i++) {
    const title = bookTitles[Math.floor(Math.random() * bookTitles.length)];
    const author = bookAuthors[Math.floor(Math.random() * bookAuthors.length)];
    const description =
      bookDescriptions[Math.floor(Math.random() * bookDescriptions.length)];
    const store_id = store_ids[Math.floor(Math.random() * store_ids.length)];

    books.push({
      title,
      store_id,
      author,
      description,
      price: Math.floor(Math.random() * 1000) + 100, // Random price between 100 and 1090
    });
  }
  return books;
};

const ratings = [1, 2, 3, 4, 5];
const comments: string[] = [
  'Great book!',
  'Loved it!',
  'Not my favorite.',
  'Would recommend to others.',
  'An interesting read.',
  'Could be better.',
  'Absolutely fantastic!',
  'Did not enjoy it much.',
  'A masterpiece!',
  'Very engaging story.',
];

type Review = {
  book_id: string;
  user_id: string;
  store_id: string;
  rating: number;
  comment: string;
};

const generateRandomReviews = (
  count: number,
  store_with_books: {
    store_id: string;
    book_ids: string[];
  }[],
  user_ids: string[]
) => {
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    const randomUserId = user_ids[Math.floor(Math.random() * user_ids.length)];
    const randomStore =
      store_with_books[Math.floor(Math.random() * store_with_books.length)];
    const randomBookId =
      randomStore.book_ids[
        Math.floor(Math.random() * randomStore.book_ids.length)
      ];
    const randomRating = ratings[Math.floor(Math.random() * ratings.length)];
    const randomComment = comments[Math.floor(Math.random() * comments.length)];
    reviews.push({
      book_id: randomBookId,
      user_id: randomUserId,
      store_id: randomStore.store_id,
      rating: randomRating,
      comment: randomComment,
    });
  }
  return reviews;
};

const generateCartItems = (
  count: number,
  user_ids: string[],
  store_with_books: {
    store_id: string;
    book_ids: string[];
  }[]
) => {
  const cartItems: CartItem[] = [];
  for (let i = 0; i < count; i++) {
    const randomUserId = user_ids[Math.floor(Math.random() * user_ids.length)];
    const randomStore =
      store_with_books[Math.floor(Math.random() * store_with_books.length)];
    const randomBookId =
      randomStore.book_ids[
        Math.floor(Math.random() * randomStore.book_ids.length)
      ];
    cartItems.push({
      user_id: randomUserId,
      book_id: randomBookId,
      store_id: randomStore.store_id,
    });
  }
  return cartItems;
};


export {
  generateRandomCustomers,
  generateRandomSellers,
  generateRandomStores,
  generateRandomBooks,
  generateRandomReviews,
  generateCartItems,
}
