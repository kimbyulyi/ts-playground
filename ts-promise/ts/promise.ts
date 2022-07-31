function getMonkey(): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("원숭이를 데려오고있어요...");
    const success: boolean = true;

    setTimeout(() => {
      if (success) {
        resolve("🙉");
      } else {
        reject("💩");
      }
    }, 1000);
  });
}

function getMonkeyOrder(animal: string): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("원숭이의 주문을 받고있어요");
    setTimeout(() => {
      const success = true;

      setTimeout(() => {
        if (success) {
          resolve(`${animal}은 🍌을 주문했습니다.`);
        } else {
          reject("😡");
        }
      }, 1000);
    });
  });
}

async function init(): Promise<void> {
  try {
    const animal = await getMonkey();
    const order = await getMonkeyOrder(animal);

    console.log(order);
  } catch (error) {
    console.log("원숭이에게 에러가 났습니다...");
  }
}

init();
