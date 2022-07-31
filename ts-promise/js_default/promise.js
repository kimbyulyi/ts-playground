"use strict";

// Promise

function getCustomers() {
  return new Promise((resolve, reject) => {
    console.log("Getting Customers");
    const success = true;

    setTimeout(() => {
      if (success) {
        resolve("Lauren");
      } else {
        reject("Can't get customers");
      }
    }, 1000);
  });
}

function getOrders(customer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;

      if (success) {
        resolve(`Found the order 123 for ${customer}`);
      } else {
        reject(`getOrders() has thrown an error for ${customer}`);
      }
    }, 1000);
  });
}

function init() {
  // Getting Customers
  // 결과를 기다리는 중.......
  // Lauren
  // Found the order 123 for Lauren

  getCustomers()
    .then((cust) => {
      console.log(cust);
      return cust;
    })
    .then((cust) => getOrders(cust))
    .then((order) => console.log(order))
    .catch((err) => console.log(err));

  console.log("결과를 기다리는 중.......");
}

// Promise.all 응용

function getAllResult() {
  Promise.all([getCustomers(), getOrders("Lauren")])
    .then((res) => {
      console.log("전체 결과 값", res);
    })
    .catch((error) => {
      console.log("에러", error);
    });
}

init();
getAllResult();
