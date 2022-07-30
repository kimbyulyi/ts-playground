import { Console } from "console";
import * as crypto from "crypto";

class Block {
  readonly hash: string;

  constructor(
    readonly index: number, // 블록 인덱스
    readonly previousHash: string, // 이전 블록 해쉬값
    readonly timestamp: string, // 블록 생성 시간
    readonly data: string // 앱 관련 데이터
  ) {
    this.hash = this.calcHash();
  }

  private calcHash(): string {
    const data = this.index + this.previousHash + this.timestamp + this.data;

    return crypto.createHash("sha256").update(data).digest("hex");
    // createHash("sha256") SHA-256 해시를 생성하기 위해 Hash 인스턴스 생성
    // update(data) 해시 객체 내 해시값을 계산하고 업데이트
    // digest('hext') 해시값을 16진수로 변환
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
