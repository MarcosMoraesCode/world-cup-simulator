export class Rank {
  constructor(rankElement) {
    this.rankElement = rankElement;
    this.id = rankElement.id;
    this.img =
      rankElement.dataset.side === "left"
        ? rankElement.childNodes[3]
        : rankElement.childNodes[1];
    this.initials =
      rankElement.dataset.side === "left"
        ? rankElement.childNodes[1]
        : rankElement.childNodes[3];
  }
}
