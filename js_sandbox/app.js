localStorage.setItem("name", "John");
sessionStorage.setItem("name", "beth");

// proper class declaration
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  greeting() {
    return `Hello, I am ${this.firstName} ${this.lastName}`;
  }
}

class Customer extends Person {
  constructor(firstName, lastName, age, phone, membership) {
    super(firstName, lastName, age);
    this.phone = phone;
    this.membership = membership;
  }
  givePhone = () => {
    return this.phone;
  };
}

const customer1 = new Customer("Tom", "Smith", 45, "425-213-5260", "VIP");
console.log(customer1.greeting());
console.log(customer1.givePhone());
