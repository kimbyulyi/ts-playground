import * as crypto from "crypto";

class Block {
  readonly nonce: number; // nonce property
  readonly hash: string;

  constructor(
    readonly index: number,
    readonly previousHash: string,
    readonly timestamp: string,
    readonly data: string
  ) {
    const { nonce, hash } = this.mine(); // 논스와 해시를 계산.
    this.nonce = nonce;
    this.hash = hash;
  }

  private calcHash(nonce: number): string {
    const data = this.index + this.previousHash + this.timestamp + this.data;
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  private mine(): { nonce: number; hash: string } {
    let hash: string;
    let nonce = 0;

    do {
      hash = this.calcHash(++nonce); // 브루트 포스를 시작함.
    } while (hash.startsWith("00000") === false); // 해시 시작값이 00000 이 될떄까지 반복문을 실행.

    return { nonce, hash };
  }
}

class BlockChain {
  private readonly chain: Block[] = []; // blockchain 값을 저장한다.
  private get latestBlock(): Block {
    return this.chain[this.chain.length - 1]; // 가장 최근에 저장된 블록의 값을 가져온다.
  }

  constructor() {
    // 제네시스 블록을 만들고 제안에 추가한다.
    this.chain.push(new Block(0, "0", String(Date.now()), "Genesis Block"));
  }

  addBlock(data: string): void {
    const block = new Block(
      this.latestBlock.index + 1,
      this.latestBlock.hash,
      String(Date.now()),
      data
    );
    this.chain.push(block);
  }
}

console.log("제네시스 블록과 함께 블록체인을 생성");
const blockchain = new BlockChain(); // 새 블록체인 생성..

console.log("Mining Block  #1 ...");
blockchain.addBlock("First Block"); // 첫 번째 블록 추가

console.log("Mining Block  #2 ...");
blockchain.addBlock("Second Block"); // 두 번째 블록 추가

console.log(JSON.stringify(blockchain, null, 2)); // 블록체인 내용 출력
