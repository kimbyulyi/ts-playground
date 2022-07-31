"use strict";

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

(async function getCustomersOrders() {
  try {
    const customer = await getCustomers();
    console.log(`Got Customer ${customer}`);

    const orders = await getOrders(customer);
    console.log("유저의 주문", orders);
  } catch (error) {
    console.log("에러", error);
  } finally {
    console.log("수고하셨습니다~!");
  }
})();

console.log("This is the last line in the app.");
