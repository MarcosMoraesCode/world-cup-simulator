import { Champion } from "../Entities/Champion.js";
import { Rank } from "../Entities/Rank.js";
import { Team } from "../Entities/Team.js";

export function setPlaces(
  teamContainerEntities,
  rankContainerEntities,
  team,
  input
) {
  let isDouble = "";
  if (input.dataset.place === "first") {
    let eventId = team.id;
    let teamNumber = eventId.slice(5);
    let dataGroup = team.group;
    let firstPositionGroup = document.getElementById(eventId);
    firstPositionGroup.style.backgroundColor = "#f4b23e";
    input.dataset.status = "first-selected";
    team.input2.checked = "";
    team.input2.dataset.status = "";
    setQualifieds(
      teamContainerEntities,
      rankContainerEntities,
      teamNumber,
      dataGroup,
      "first-selected"
    );
    let i = 0;
    for (i = 0; i < teamContainerEntities.length; i++) {
      if (
        teamContainerEntities[i].input1.dataset.status === "first-selected" &&
        teamContainerEntities[i].id !== eventId &&
        teamContainerEntities[i].group === dataGroup
      ) {
        teamContainerEntities[i].teamElement.style.backgroundColor = "#f3f3f3";
        teamContainerEntities[i].input1.dataset.status = "";
        isDouble = `group-${dataGroup}-second-selected`;
      }
    }
  }
  if (input.dataset.place === "second") {
    let eventId = team.id;
    let teamNumber = eventId.slice(5);
    let dataGroup = team.group;
    let secondPositionGroup = document.getElementById(eventId);
    secondPositionGroup.style.backgroundColor = "#fbe154";
    input.dataset.status = "second-selected";
    team.input1.checked = "";
    team.input1.dataset.status = "";
    setQualifieds(
      teamContainerEntities,
      rankContainerEntities,
      teamNumber,
      dataGroup,
      "second-selected"
    );
    let i = 0;
    for (i = 0; i < teamContainerEntities.length; i++) {
      if (
        teamContainerEntities[i].input2.dataset.status === "second-selected" &&
        teamContainerEntities[i].id !== eventId &&
        teamContainerEntities[i].group === dataGroup
      ) {
        teamContainerEntities[i].teamElement.style.backgroundColor = "#f3f3f3";
        teamContainerEntities[i].input2.dataset.status = "";
        isDouble = `group-${dataGroup}-first-selected`;
      }
    }
  }
  verifyQualifiers();
}

export function setRandomWinners(
  teamContainerEntities,
  rankContainerEntities,
  group
) {
  let dataGroup = group.dataset.group;
  let randomNumber1 = Math.floor(Math.random() * 4 + 1);
  const groupContainer = [];
  teamContainerEntities.forEach((team) => {
    if (team.group === dataGroup) {
      team.teamElement.style.backgroundColor = "#f3f3f3";
      team.input1.checked = "";
      team.input1.dataset.status = "";
      team.input2.checked = "";
      team.input2.dataset.status = "";
      groupContainer.push(team);
    }
  });
  groupContainer.forEach((team) => {
    if (Number(team.teamElement.dataset.position) === randomNumber1) {
      team.teamElement.style.backgroundColor = "#f4b23e";
      team.input1.checked = "checked";
      team.input1.dataset.status = "first-selected";
      setQualifieds(
        teamContainerEntities,
        rankContainerEntities,
        team.id.slice(5),
        dataGroup,
        "first-selected"
      );

      const groupContainer2 = groupContainer.filter((team) => {
        return Number(team.teamElement.dataset.position) !== randomNumber1;
      });
      let randomNumber2 = Math.floor(Math.random() * 3);
      groupContainer2.forEach((team, index) => {
        if (index === randomNumber2) {
          team.teamElement.style.backgroundColor = "#fbe154";
          team.input2.checked = "checked";
          team.input2.dataset.status = "second-selected";
          setQualifieds(
            teamContainerEntities,
            rankContainerEntities,
            team.id.slice(5),
            dataGroup,
            "second-selected"
          );
        }
      });
    }
  });
  verifyQualifiers();
}

export function createTeamsEntities(/*teamsContainer*/) {
  //a
  const teamsContainer = [];
  const teamContainerEntities = [];
  //a
  let i = 0;
  for (i = 0; i < 32; i++) {
    let team = document.getElementById(`team-${i + 1}`);
    teamsContainer.push(team);
  }

  teamsContainer.forEach((team) => {
    let teamElement = team;
    let teamName = team.childNodes[1].innerText;
    let teamInitials = teamName.slice(0, 3).toUpperCase();

    switch (teamName) {
      case "País de Gales":
        teamInitials = "GAL";
        break;
      case "Estados Unidos":
        teamInitials = "EUA";
        break;
      default:
        break;
    }
    const teamInfo = new Team(teamElement, teamName, teamInitials);
    //console.log(teamInfo);
    teamContainerEntities.push(teamInfo);
  });

  return teamContainerEntities;
}

export function createRankEntities() {
  const rankContainerEntities = [];
  document.querySelectorAll(".rank-16").forEach((rank) => {
    const rankInfo = new Rank(rank);
    rankContainerEntities.push(rankInfo);
  });

  return rankContainerEntities;
}

export function setQualifieds(
  teamContainerEntities,
  rankContainerEntities,
  teamNumber,
  dataGroup,
  inputStatus
) {
  let statusArray = ["first-selected", "second-selected"];
  let selected = `group-${dataGroup}-${inputStatus}`;
  rankContainerEntities.forEach((rank) => {
    if (rank.id === selected) {
      rank.img.src = teamContainerEntities[teamNumber - 1].img;
      let imgComparisson = rank.img.src;
      rank.initials.innerText = teamContainerEntities[teamNumber - 1].initials;
      rank.img.style.border = "solid 2px #06aa48";
      let switchedStatus = "";

      if (selected === `group-${dataGroup}-${statusArray[0]}`) {
        switchedStatus = statusArray[1];
      } else {
        switchedStatus = statusArray[0];
      }

      const rankElement = getRankById(`group-${dataGroup}-${switchedStatus}`);

      if (rankElement.img.src === imgComparisson) {
        let firstPart = rank.id.slice(8);

        let groupLetter = rank.id[6];

        rankElement.img.src = "./images/f3f3f3bg.svg";
        rankElement.initials.innerText =
          firstPart === "first-selected"
            ? `2${groupLetter}`
            : `1${groupLetter}`;
        rankElement.img.style.border = "solid 2px #777";
        document
          .querySelectorAll(".flag-img-playoffs-8")
          .forEach((imgRank8) => {
            if (imgRank8.src === imgComparisson) {
              imgRank8.src = "./images/f3f3f3bg.svg";
              imgRank8.style.border = "solid 2px #777";
              let side = imgRank8.parentNode.parentNode.dataset.side;
              if (side === "left") {
                imgRank8.previousElementSibling.innerText = "";
              } else {
                imgRank8.nextElementSibling.innerText = "";
              }
            }
          });
      }
    }
  });
}

function getRankById(index) {
  let newRank = document.getElementById(index);
  return new Rank(newRank);
}

export function setRoundOf8Phase(img) {
  let rivalName = img.parentNode.dataset.rival;
  let rivalElement = document.getElementById(rivalName);
  let rivalImg =
    rivalElement.dataset.side === "left"
      ? rivalElement.childNodes[3]
      : rivalElement.childNodes[1];

  let defaultImg =
    "http://127.0.0.1:5500/Projeto%20-%20FIFA%20WorldCup/images/f3f3f3bg.svg";
  if (img.src !== defaultImg && rivalImg.src !== defaultImg) {
    let rank16 = img.parentNode;
    let quarterfinalistId = rank16.dataset.goingto;

    const rank8 = document.getElementById(quarterfinalistId);

    let rankSide = rank8.parentNode.dataset.side;

    if (rankSide === "left") {
      rank8.childNodes[3].src = img.src;
      rank8.childNodes[3].style.border = "2px solid #06aa48";
      rank8.childNodes[1].innerText = img.previousElementSibling.innerText;
    } else {
      rank8.childNodes[1].src = img.src;
      rank8.childNodes[1].style.border = "2px solid #06aa48";
      rank8.childNodes[3].innerText = img.nextElementSibling.innerText;
    }
  }

  verifyWinners();
}

export function setSemifinal(img) {
  let rivalName = img.parentNode.dataset.rival;
  let rivalElement = document.getElementById(rivalName);

  let rivalImg =
    rivalElement.parentNode.dataset.side === "left"
      ? rivalElement.childNodes[3]
      : rivalElement.childNodes[1];

  let defaultImg =
    "http://127.0.0.1:5500/Projeto%20-%20FIFA%20WorldCup/images/f3f3f3bg.svg";

  if (img.src !== defaultImg && rivalImg.src !== defaultImg) {
    let rank8 = img.parentNode;
    let semifinalistId = rank8.dataset.goingto;

    const rank4 = document.getElementById(semifinalistId);

    let rankSide = rank4.parentNode.dataset.side;
    if (rankSide === "left") {
      rank4.childNodes[3].src = img.src;
      rank4.childNodes[3].style.border = "2px solid #06aa48";
      rank4.childNodes[1].innerText = img.previousElementSibling.innerText;
    } else {
      rank4.childNodes[1].src = img.src;
      rank4.childNodes[1].style.border = "2px solid #06aa48";
      rank4.childNodes[3].innerText = img.nextElementSibling.innerText;
    }
  }

  verifyWinners();
}

export function setFinal(img) {
  let rivalName = img.parentNode.dataset.rival;
  let rivalElement = document.getElementById(rivalName);
  let rivalImg =
    rivalElement.parentNode.dataset.side === "left"
      ? rivalElement.childNodes[3]
      : rivalElement.childNodes[1];

  let defaultImg =
    "http://127.0.0.1:5500/Projeto%20-%20FIFA%20WorldCup/images/f3f3f3bg.svg";

  if (img.src !== defaultImg && rivalImg.src !== defaultImg) {
    let rank4 = img.parentNode;

    let finalistId = rank4.dataset.goingto;

    const rank2 = document.getElementById(finalistId);

    let rankSide = rank2.parentNode.dataset.side;

    if (rankSide === "left") {
      rank2.childNodes[3].src = img.src;
      rank2.childNodes[3].style.border = "2px solid #06aa48";
      rank2.childNodes[1].innerText = img.previousElementSibling.innerText;
    } else {
      rank2.childNodes[1].src = img.src;
      rank2.childNodes[1].style.border = "2px solid #06aa48";
      rank2.childNodes[3].innerText = img.nextElementSibling.innerText;
    }
  }

  verifyWinners();
}

export function setChampion(img, teamContainerEntities) {
  let rivalName = img.parentNode.dataset.rival;
  let rivalElement = document.getElementById(rivalName);
  let rivalImg =
    rivalElement.parentNode.dataset.side === "left"
      ? rivalElement.childNodes[3]
      : rivalElement.childNodes[1];

  let defaultImg =
    "http://127.0.0.1:5500/Projeto%20-%20FIFA%20WorldCup/images/f3f3f3bg.svg";

  if (img.src !== defaultImg && rivalImg.src !== defaultImg) {
    //console.log(img.parentNode);

    let rank2 = img.parentNode;
    //console.log("rank2child", rank2.childNodes[1].innerText);

    let championId = rank2.dataset.goingto;
    let championName = "";
    let initialToCompare =
      rank2.dataset.side === "left"
        ? rank2.childNodes[1].innerText
        : rank2.childNodes[3].innerText;

    teamContainerEntities.some((team) => {
      if (team.initials === initialToCompare) {
        championName = team.name;
      }
    });

    const champion = new Champion(document.getElementById(championId));
    champion.cupImg.hidden = "";
    champion.championName.hidden = "";
    champion.championTeamName.innerText = championName;
    champion.championTeamName.hidden = "";
    champion.description.hidden = "true";
    champion.championImg.src = img.src;
    champion.championImg.style.border = "2px solid #06aa48";
  }

  verifyWinners();
}

function verifyQualifiers() {
  let rank16Container = [];
  let rank8Container = [];
  let rank4Container = [];
  let rank2Container = [];

  document.querySelectorAll(".rank-16").forEach((rank16) => {
    rank16Container.push(new Rank(rank16));
  });
  document.querySelectorAll(".rank-8").forEach((rank8) => {
    rank8Container.push(new Rank(rank8));
  });
  document.querySelectorAll(".rank-4").forEach((rank4) => {
    rank4Container.push(new Rank(rank4));
  });
  document.querySelectorAll(".rank-2").forEach((rank2) => {
    rank2Container.push(new Rank(rank2));
  });
  let champion = new Champion(document.getElementById("champion-spot"));

  let defaultImg =
    "http://127.0.0.1:5500/Projeto%20-%20FIFA%20WorldCup/images/f3f3f3bg.svg";
  //ENCONTRA A IMAGEM QUE NÃO ESTÁ MAIS SELECIONADA, E APAGA SUA IMAGEM
  rank2Container.forEach((rank2) => {
    let i = 0;

    let existsInFinal = rank16Container.some((rank16) => {
      if (
        rank16.img.src === rank2.img.src &&
        rank16.rankElement.dataset.side === rank2.rankElement.dataset.side &&
        rank16.img.src !== defaultImg
      ) {
        return true;
      }
      return false;
    });

    if (existsInFinal === false) {
      rank2.img.src =
        "http://127.0.0.1:5500/Projeto%20-%20FIFA%20WorldCup/images/f3f3f3bg.svg";
      rank2.img.style.border = "2px solid #777";
      rank2.initials.innerText = "";
      champion.championImg.src = "./images/champsilverbg.svg";
      champion.championImg.style.border = "2px solid #777";
      champion.cupImg.hidden = "true";
      champion.championName.hidden = "true";
      champion.championTeamName.innerText = "";
      champion.championTeamName.hidden = "true";
      champion.description.hidden = "";
    }
  });

  rank4Container.forEach((rank4) => {
    let existsInSemifinal = rank16Container.some((rank16) => {
      if (
        rank16.img.src === rank4.img.src &&
        rank16.rankElement.dataset.side === rank4.rankElement.dataset.side &&
        rank16.img.src !== defaultImg
      ) {
        return true;
      }
      return false;
    });

    if (existsInSemifinal === false) {
      rank4.img.src =
        "http://127.0.0.1:5500/Projeto%20-%20FIFA%20WorldCup/images/f3f3f3bg.svg";
      rank4.img.style.border = "2px solid #777";
      rank4.initials.innerText = "";
    }
  });

  rank8Container.forEach((rank8) => {
    let existsInRoundOf4 = rank16Container.some((rank16) => {
      if (
        rank16.img.src === rank8.img.src &&
        rank16.rankElement.dataset.side === rank8.rankElement.dataset.side &&
        rank16.img.src !== defaultImg
      ) {
        return true;
      }
      return false;
    });

    if (existsInRoundOf4 === false) {
      rank8.img.src =
        "http://127.0.0.1:5500/Projeto%20-%20FIFA%20WorldCup/images/f3f3f3bg.svg";
      rank8.img.style.border = "2px solid #777";
      rank8.initials.innerText = "";
    }
  });
}

function verifyWinners() {
  let rank16Container = [];
  let rank8Container = [];
  let rank4Container = [];
  let rank2Container = [];

  document.querySelectorAll(".rank-16").forEach((rank16) => {
    rank16Container.push(new Rank(rank16));
  });
  document.querySelectorAll(".rank-8").forEach((rank8) => {
    rank8Container.push(new Rank(rank8));
  });
  document.querySelectorAll(".rank-4").forEach((rank4) => {
    rank4Container.push(new Rank(rank4));
  });
  document.querySelectorAll(".rank-2").forEach((rank2) => {
    rank2Container.push(new Rank(rank2));
  });
  let championImg = document.getElementById("flag-img-playoffs-champion");
  let defaultImg =
    "http://127.0.0.1:5500/Projeto%20-%20FIFA%20WorldCup/images/f3f3f3bg.svg";

  rank16Container.forEach((rank16) => {
    let existsInFinal = false;
    let existsInSemifinal = false;
    let existsInRoundOf4 = false;
    let isChampion = false;
    let rankIdFinal = "";
    let rankIdSemifinal = "";
    let rankIdRoundOf4 = "";
    let champion = new Champion(document.getElementById("champion-spot"));

    if (championImg.src === rank16.img.src) {
      isChampion = true;
    }

    rank2Container.some((rank2) => {
      if (
        rank16.img.src === rank2.img.src &&
        rank16.rankElement.dataset.side === rank2.rankElement.dataset.side &&
        rank16.img.src !== defaultImg
      ) {
        rankIdFinal = rank2.id;
        existsInFinal = true;
      }
    });
    rank4Container.some((rank4) => {
      if (
        rank16.img.src === rank4.img.src &&
        rank16.rankElement.dataset.side === rank4.rankElement.dataset.side &&
        rank16.img.src !== defaultImg
      ) {
        rankIdSemifinal = rank4.id;
        existsInSemifinal = true;
      }
    });
    rank8Container.some((rank8) => {
      if (
        rank16.img.src === rank8.img.src &&
        rank16.rankElement.dataset.side === rank8.rankElement.dataset.side &&
        rank16.img.src !== defaultImg
      ) {
        rankIdRoundOf4 = rank8.id;
        existsInRoundOf4 = true;
      }
    });

    if (existsInSemifinal === true && existsInRoundOf4 === false) {
      let rank4 = new Rank(document.getElementById(rankIdSemifinal));

      rank4.img.src = defaultImg;
      rank4.img.style.border = "2px solid #777";
      rank4.initials.innerText = "";
      if (existsInFinal == true) {
        let rank2 = new Rank(document.getElementById(rankIdFinal));
        rank2.img.src = defaultImg;
        rank2.img.style.border = "2px solid #777";
        rank2.initials.innerText = "";
        champion.championImg.src = "./images/champsilverbg.svg";
        champion.championImg.style.border = "2px solid #777";
        champion.cupImg.hidden = "true";
        champion.championName.hidden = "true";
        champion.championTeamName.innerText = "";
        champion.championTeamName.hidden = "true";
        champion.description.hidden = "";
      }
    }
    if (existsInFinal === true && existsInSemifinal === false) {
      let rank2 = new Rank(document.getElementById(rankIdFinal));
      rank2.img.src = defaultImg;
      rank2.img.style.border = "2px solid #777";
      rank2.initials.innerText = "";
      champion.championImg.src = "./images/champsilverbg.svg";
      champion.championImg.style.border = "2px solid #777";
      champion.cupImg.hidden = "true";
      champion.championName.hidden = "true";
      champion.championTeamName.innerText = "";
      champion.championTeamName.hidden = "true";
      champion.description.hidden = "";
    }
    if (isChampion === true && existsInFinal === false) {
      champion.championImg.src = "./images/champsilverbg.svg";
      champion.championImg.style.border = "2px solid #777";
      champion.cupImg.hidden = "true";
      champion.championName.hidden = "true";
      champion.championTeamName.innerText = "";
      champion.championTeamName.hidden = "true";
      champion.description.hidden = "";
    }
  });
}

export function checkFields() {
  let rank16Container = [];
  document.querySelectorAll(".rank-16").forEach((rank16) => {
    rank16Container.push(new Rank(rank16));
  });

  let isSelected = rank16Container.some((rank) => {
    if (rank.initials.innerText.length > 2) {
      return true;
    } else {
      return false;
    }
  });

  if (isSelected === true) {
    let fillBtn = document.getElementById("fill");

    fillBtn.disabled = "true";
    fillBtn.style.backgroundColor = "rgb(165, 163, 163)";
  } else {
    let fillBtn = document.getElementById("fill");
    fillBtn.disabled = "";
    fillBtn.style.backgroundColor = "#06aa48";
  }
}

export function setAllRandomWinners(
  teamContainerEntities,
  rankContainerEntities
) {
  let groupContainer = [];
  document.querySelectorAll(".group-container").forEach((group) => {
    //console.log(group);
    groupContainer.push(group);
  });

  let i = 0;
  for (i = 0; i < groupContainer.length; i++) {
    setRandomWinners(
      teamContainerEntities,
      rankContainerEntities,
      groupContainer[i]
    );
  }
}

export function shareResults() {
  let rank16Container = [];
  let rank8Container = [];
  let rank4Container = [];
  let rank2Container = [];

  document.querySelectorAll(".rank-16").forEach((rank16) => {
    rank16Container.push(new Rank(rank16));
  });
  document.querySelectorAll(".rank-8").forEach((rank8) => {
    rank8Container.push(new Rank(rank8));
  });
  document.querySelectorAll(".rank-4").forEach((rank4) => {
    rank4Container.push(new Rank(rank4));
  });
  document.querySelectorAll(".rank-2").forEach((rank2) => {
    rank2Container.push(new Rank(rank2));
  });

  let champion = new Champion(document.getElementById("champion-spot"));

  let defaultImg =
    "http://127.0.0.1:5500/Projeto%20-%20FIFA%20WorldCup/images/f3f3f3bg.svg";

  let championIsEmpty =
    champion.championImg.src ===
    "http://127.0.0.1:5500/Projeto%20-%20FIFA%20WorldCup/images/champsilverbg.svg"
      ? true
      : false;

  let shareBtn = document.getElementById("share");
  let any16Empty = false;
  let any8Empty = false;
  let any4Empty = false;
  let any2Empty = false;

  any16Empty = rank16Container.some((rank16) => {
    return rank16.initials.innerText.length === 2;
  });
  any8Empty = rank8Container.some((rank8) => {
    return rank8.initials.innerText.length < 3;
  });
  any4Empty = rank4Container.some((rank4) => {
    return rank4.initials.innerText.length < 3;
  });
  any2Empty = rank2Container.some((rank2) => {
    return rank2.initials.innerText.length < 3;
  });

  let allRanksChecked = [
    championIsEmpty,
    any16Empty,
    any8Empty,
    any4Empty,
    any2Empty,
  ];
  let isAllChecked = allRanksChecked.some((rank) => rank === true);
  /*
  console.log(
    "rank16incompleto? ",
    any16Empty,
    " rank8incompleto? ",
    any8Empty,
    " rank4incompleto? ",
    any4Empty,
    " rank2incompleto? ",
    any2Empty,
    " campeao vazio? ",
    championIsEmpty
  );
  */
  if (isAllChecked === true) {
    shareBtn.disabled = "true";
    shareBtn.style.backgroundColor = "rgb(165, 163, 163)";
  } else {
    shareBtn.disabled = "";
    shareBtn.style.backgroundColor = "#06aa48";
  }
}

export function campaign(teamContainerEntities) {
  let rank16Container = [];
  let rank8Container = [];
  let rank4Container = [];
  let rank2Container = [];
  let rank16Names = [];
  let rank8Names = [];
  let rank4Names = [];
  let rank2Names = [];
  let champion = new Champion(document.getElementById("champion-spot"));

  document.querySelectorAll(".rank-16").forEach((rank16) => {
    rank16Container.push(new Rank(rank16));
  });
  document.querySelectorAll(".rank-8").forEach((rank8) => {
    rank8Container.push(new Rank(rank8));
  });
  document.querySelectorAll(".rank-4").forEach((rank4) => {
    rank4Container.push(new Rank(rank4));
  });
  document.querySelectorAll(".rank-2").forEach((rank2) => {
    rank2Container.push(new Rank(rank2));
  });

  rank16Container.forEach((rank16) => {
    teamContainerEntities.some((team) => {
      if (team.initials === rank16.initials.innerText) {
        rank16Names.push(team.name);
      }
    });
  });
  console.log(rank16Names);

  rank8Container.forEach((rank8) => {
    teamContainerEntities.some((team) => {
      if (team.initials === rank8.initials.innerText) {
        rank8Names.push(team.name);
      }
    });
  });
  console.log(rank8Names);

  rank4Container.forEach((rank4) => {
    teamContainerEntities.some((team) => {
      if (team.initials === rank4.initials.innerText) {
        rank4Names.push(team.name);
      }
    });
  });
  console.log(rank4Names);

  rank2Container.forEach((rank2) => {
    teamContainerEntities.some((team) => {
      if (team.initials === rank2.initials.innerText) {
        rank2Names.push(team.name);
      }
    });
  });
  console.log(rank2Names);

  Swal.fire({
    title: "Simulador da Copa do Mundo 2022",
    confirmButtonColor: "#06aa48",
    confirmButtonText: "Copiar",
    html:
      "<b>Oitavas de final</b> <br> " +
      `
      ${rank16Names[0]} <b>x</b> ${rank16Names[1]} <br>
      ${rank16Names[2]} <b>x</b> ${rank16Names[3]} <br>
      ${rank16Names[4]} <b>x</b> ${rank16Names[5]} <br>
      ${rank16Names[6]} <b>x</b> ${rank16Names[7]} <br>
      ${rank16Names[8]} <b>x</b> ${rank16Names[9]} <br>
      ${rank16Names[10]} <b>x</b> ${rank16Names[11]} <br>
      ${rank16Names[12]} <b>x</b> ${rank16Names[13]} <br>
      ${rank16Names[14]} <b>x</b> ${rank16Names[15]} <br> <br>
    ` +
      "<b>Quartas de final</b> <br> " +
      `
      ${rank8Names[0]} <b>x</b> ${rank8Names[1]} <br>
      ${rank8Names[2]} <b>x</b> ${rank8Names[3]} <br>
      ${rank8Names[4]} <b>x</b> ${rank8Names[5]} <br>
      ${rank8Names[6]} <b>x</b> ${rank8Names[7]} <br> <br>
      ` +
      "<b>Semifinal</b> <br> " +
      `
      ${rank4Names[0]} <b>x</b> ${rank4Names[1]} <br>
      ${rank4Names[2]} <b>x</b> ${rank4Names[3]} <br><br>
      ` +
      "<b>Final</b> <br> " +
      `
      ${rank2Names[0]} <b>x</b> ${rank2Names[1]} <br><br>
      ` +
      "<b>Campeão</b> <br> " +
      `
      ${champion.championTeamName.innerText} <br>
      `,
  });
  Swal.getConfirmButton().addEventListener("click", function () {
    Swal.fire({
      width: 300,
      position: "bottom-end",
      icon: "success",
      title: "Copiado!",
      showConfirmButton: false,
      timer: 1500,
    });

    navigator
      .clipboard.writeText(`\nFala ai! Usei o simulador do Marcos e esse é meu palpite para a Copa do Mundo!
    
    Oitavas de Final:
    ${rank16Names[0]} x ${rank16Names[1]}
    ${rank16Names[2]} x ${rank16Names[3]}
    ${rank16Names[4]} x ${rank16Names[5]}
    ${rank16Names[6]} x ${rank16Names[7]}
    ${rank16Names[8]} x ${rank16Names[9]}
    ${rank16Names[10]} x ${rank16Names[11]}
    ${rank16Names[12]} x ${rank16Names[13]}
    ${rank16Names[14]} x ${rank16Names[15]}
    
    Quartas de Final:
    ${rank8Names[0]} x ${rank8Names[1]}
    ${rank8Names[2]} x ${rank8Names[3]}
    ${rank8Names[4]} x ${rank8Names[5]}
    ${rank8Names[6]} x ${rank8Names[7]}
    
    Semifinal:
    ${rank4Names[0]} x ${rank4Names[1]}
    ${rank4Names[2]} x ${rank4Names[3]}

    Final:
    ${rank2Names[0]} x ${rank2Names[1]}
    
    Campeão:
    ${champion.championTeamName.innerText}`);
  });
  /*
  Swal.fire(
    `Oitavas de Final: ${rank16Names[0]} vs ${rank16Names[1]}
    ${rank16Names[2]} vs ${rank16Names[3]}
    ${rank16Names[4]} vs ${rank16Names[5]}
    ${rank16Names[6]} vs ${rank16Names[7]}
    ${rank16Names[8]} vs ${rank16Names[9]}
    ${rank16Names[10]} vs ${rank16Names[11]}
    ${rank16Names[12]} vs ${rank16Names[13]}
    ${rank16Names[14]} vs ${rank16Names[15]}
    
    Quartas de Final:
    ${rank8Names[0]} vs ${rank8Names[1]}
    ${rank8Names[2]} vs ${rank8Names[3]}
    ${rank8Names[4]} vs ${rank8Names[5]}
    ${rank8Names[6]} vs ${rank8Names[7]}
    
    Semifinal:
    ${rank4Names[0]} vs ${rank4Names[1]}
    ${rank4Names[2]} vs ${rank4Names[3]}
    Final:\n ${rank2Names[0]} vs ${rank2Names[1]}\nCampeão:\n${champion.championTeamName.innerText}`
  );*/
  /*
  alert(
    `Simulador da copa do mundo\nOitavas de Final:\n${rank16Names[0]} vs ${rank16Names[1]}\n${rank16Names[2]} vs ${rank16Names[3]}\n${rank16Names[4]} vs ${rank16Names[5]}\n${rank16Names[6]} vs ${rank16Names[7]}\n${rank16Names[8]} vs ${rank16Names[9]}\n${rank16Names[10]} vs ${rank16Names[11]}\n${rank16Names[12]} vs ${rank16Names[13]}\n${rank16Names[14]} vs ${rank16Names[15]}\nQuartas de Final:\n${rank8Names[0]} vs ${rank8Names[1]}\n${rank8Names[2]} vs ${rank8Names[3]}\n${rank8Names[4]} vs ${rank8Names[5]}\n${rank8Names[6]} vs ${rank8Names[7]}\n\nSemifinal:\n${rank4Names[0]} vs ${rank4Names[1]}\n${rank4Names[2]} vs ${rank4Names[3]}\nFinal:\n ${rank2Names[0]} vs ${rank2Names[1]}\nCampeão:\n${champion.championTeamName.innerText}`
  );*/
}
