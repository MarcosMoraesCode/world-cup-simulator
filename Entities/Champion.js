export class Champion {
  constructor(championElement) {
    this.championElement = championElement;
    this.cupImg = championElement.childNodes[1].childNodes[1];
    this.championName = championElement.childNodes[1].childNodes[3];
    this.championTeamName = championElement.childNodes[1].childNodes[5];
    this.description = championElement.childNodes[1].childNodes[7];
    this.championImg = championElement.childNodes[3];
  }
}
