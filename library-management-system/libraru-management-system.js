class LibraryItem {

    constructor(id) {
      if (new.target === LibraryItem) {
        throw new Error("Cannot instantiate abstract class LibraryItem.");
      }
      this.id = id;
    }

    getDetails() {
      throw new Error("get details must be implemented.");
    }

  }

class Book extends LibraryItem {
    constructor(id, title, author, publishedDate) {
      super(id);
      this.title = title;
      this.author = author;
      this.publishedDate = publishedDate;
    }
  
    getDetails() {
      return `Book ID: ${this.id}, title: ${this.title}, author: ${this.author}, published Date: ${this.publishedDate}`;
    }
  }
  
  class FictionBook extends Book {
    constructor(id, title, author, publishedDate, genre) {
      super(id, title, author, publishedDate);
      this.genre = genre;
    }
    getDetails() {
      return `${super.getDetails()}, Genre: ${this.genre}`;
    }
  }
  
  class NonFictionBook extends Book {
    constructor(id, title, author, publishedDate, category) {
      super(id, title, author, publishedDate);
      this.category = category;
    }
  
    getDetails() {
      return `${super.getDetails()}, Category: ${this.category}`;
    }
  }
  
  class ReferenceBook extends Book {
    constructor(id, title, author, publishedDate) {
      super(id, title, author, publishedDate);
    }
  
    getDetails() {
      return `${super.getDetails()} - reference book and cannot be loaned.`;
    }
  }
  
class LibraryMember {
    constructor(id, name) {
      this.id = id;
      this.name = name;
      this.borrowedItems = [];
    }
  
    borrowItem(item) {
      this.borrowedItems.push(item);
      console.log(`${this.name} borrowed: ${item.getDetails()}`);
    }
  
    returnItem(itemId) {
      this.borrowedItems = this.borrowedItems.filter(item => item.id !== itemId);
      console.log(`${this.name} item with ID: ${itemId}`);
    }
  
    getBorrowedItems() {
      return this.borrowedItems;
    }
  }
  
  class AdultMember extends LibraryMember {
    constructor(id, name) {
      super(id, name);
      this.maxBorrowLimit = 10;
    }
  
    borrowItem(item) {
      if (this.borrowedItems.length < this.maxBorrowLimit) {
        super.borrowItem(item);
      } else {
        console.log(`${this.name} reached limit of ${this.maxBorrowLimit} items.`);
      }
    }
  }
  
  class ChildMember extends LibraryMember {
    constructor(id, name) {
      super(id, name);
      this.maxBorrowLimit = 5; 
    }
  
    borrowItem(item) {
      if (this.borrowedItems.length < this.maxBorrowLimit) {
        super.borrowItem(item);
      } else {
        console.log(`${this.name} reached limit of ${this.maxBorrowLimit} items.`);
      }
    }
  }
  
  const adultMember = new AdultMember(101, "test1");
  adultMember.borrowItem(fictionBook);
  console.log(adultMember.getBorrowedItems());
  
  const childMember = new ChildMember(102, "test2");
  childMember.borrowItem(fictionBook);
  childMember.borrowItem(fictionBook); 
  

  class Loan {
    constructor(member, item, loanDate, returnDate = null) {
      this.member = member;        
      this.item = item;           
      this.loanDate = loanDate;   
      this.returnDate = returnDate; 
    }
  
    returnItem() {
      this.returnDate = new Date();
      console.log(`${this.member.name} returned ${this.item.getDetails()} on ${this.returnDate}`);
    }
  
    getLoanDetails() {
      return {
        memberName: this.member.name,
        itemTitle: this.item.title,
        loanDate: this.loanDate,
        returnDate: this.returnDate ? this.returnDate : "Not returned yet",
      };
    }
  }
  
  const loan1 = new Loan(adultMember, fictionBook, new Date("2024-01-06"));
  console.log(loan1.getLoanDetails());
  
  loan1.returnItem();
  console.log(loan1.getLoanDetails());


  class Library {
    constructor() {
      this.items = []; 
    }
  
    addItem(item) {
      this.items.push(item);
      console.log(`${item.getDetails()}  added to the library.`);
    }
  
    getItemById(id) {
      return this.items.find(item => item.id === id);
    }
  
    getAllItems() {
      return this.items;
    }
    findItemsByTitle(title) {
      return this.items.filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
    }
  }
  
  const library = new Library();
  
  const fictionBook = new FictionBook(1, "Test1", "test1", "year", "genre");
  const nonFictionBook = new NonFictionBook(2, "Test2", "test2", "year", "genre");
  
  library.addItem(fictionBook);
  library.addItem(nonFictionBook);
  
  const foundItem = library.getItemById(1);
  console.log(foundItem.getDetails());
  
  const allItems = library.getAllItems();
  console.log(allItems);
  
  const searchResults = library.findItemsByTitle("title");
  console.log(searchResults);

  
function processLibraryItems(items) {
    items.forEach(item => {
      console.log(item.getDetails());
    });
  }
  
  const items = [
    new FictionBook(1, "title 1", "by 1", "2001", "Fantasy"),
    new NonFictionBook(2, "title 2", "by 2 ", "2002", "History"),
    new ReferenceBook(3, "title 3", "by 3", "2003", "Fantasy")
  ];
  
  processLibraryItems(items);
  
  