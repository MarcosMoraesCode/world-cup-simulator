export class Team {
  constructor(teamElement, name, initials /*group,*/) {
    this.teamElement = teamElement;
    this.id = teamElement.id;
    this.name = name;
    this.initials = initials;
    this.img = teamElement.childNodes[1].childNodes[1].currentSrc;
    this.group = teamElement.parentNode.dataset.group;
    this.input1 = teamElement.childNodes[3].childNodes[1].childNodes[1];
    this.input2 = teamElement.childNodes[3].childNodes[3].childNodes[1];
    this.inputs = [this.input1, this.input2];
  }
}
