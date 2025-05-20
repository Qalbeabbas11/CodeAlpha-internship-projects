const initialBooks = [
    { id: 1, title: '1984', author: 'George Orwell', category: 'Fiction', borrowed: false },
    { id: 2, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'Non-fiction', borrowed: false },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', borrowed: false },
    { id: 4, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', borrowed: false },
  ];
  
  let books = JSON.parse(localStorage.getItem('books')) || initialBooks;
  let history = JSON.parse(localStorage.getItem('history')) || [];
  
  const booksContainer = document.getElementById('booksContainer');
  const historyList = document.getElementById('historyList');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  
  function saveData() {
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.setItem('history', JSON.stringify(history));
  }
  
  function renderBooks() {
    const search = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    booksContainer.innerHTML = '';
  
    const filteredBooks = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search);
      const matchesCategory = category === 'All' || book.category === category;
      return matchesSearch && matchesCategory;
    });
  
    filteredBooks.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book';
  
      bookDiv.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Category: ${book.category}</p>
        <p class="status" style="color:${book.borrowed ? 'red' : 'green'}">${book.borrowed ? 'Borrowed' : 'Available'}</p>
        <button class="${book.borrowed ? 'return' : 'borrow'}">${book.borrowed ? 'Return' : 'Borrow'}</button>
      `;
  
      const button = bookDiv.querySelector('button');
      button.addEventListener('click', () => toggleBorrow(book.id));
  
      booksContainer.appendChild(bookDiv);
    });
  }
  
  function renderHistory() {
    historyList.innerHTML = '';
    if (history.length === 0) {
      const noHistory = document.createElement('li');
      noHistory.textContent = 'No borrowing history yet.';
      historyList.appendChild(noHistory);
      return;
    }
  
    history.forEach(record => {
      const li = document.createElement('li');
      li.textContent = `${record.action} "${record.title}" on ${record.date}`;
      historyList.appendChild(li);
    });
  }
  
  function toggleBorrow(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
  
    book.borrowed = !book.borrowed;
    const action = book.borrowed ? 'Borrowed' : 'Returned';
    const record = { id: Date.now(), title: book.title, action, date: new Date().toLocaleString() };
  
    history.unshift(record);
    saveData();
    renderBooks();
    renderHistory();
  }
  
  clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the borrowing history?')) {
      history = [];
      saveData();
      renderHistory();
    }
  });
  
  searchInput.addEventListener('input', renderBooks);
  categorySelect.addEventListener('change', renderBooks);
  
  // Initial render
  renderBooks();
  renderHistory();
  