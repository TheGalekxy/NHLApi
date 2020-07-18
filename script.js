let card = document.getElementsByClassName('card');
let container = document.querySelector('.container');



function createCard(teamName, playerName, playerNumber, playerPosition) {


    // Create the div that will be the structure of the card
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // Create the H3 of the card
    const h3 = document.createElement('h3');
    h3.innerText = `${teamName}`;
    cardDiv.appendChild(h3)
    // Create the Table of the card
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    let th = document.createElement('th');
    let thText = document.createTextNode('Name');
    let row = table.insertRow(0);
    th.appendChild(thText);
    row.appendChild(th);
    th = document.createElement('th');
    thText = document.createTextNode('Number');
    th.appendChild(thText);
    row.appendChild(th);
    th = document.createElement('th');
    thText = document.createTextNode('Position');
    th.appendChild(thText);
    row.appendChild(th);
    thead.appendChild(row);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.id = `${teamName}`;
    table.appendChild(tbody);

    cardDiv.appendChild(table);
    container.appendChild(cardDiv);
}


async function getTeams() {
    let response = await fetch('https://statsapi.web.nhl.com/api/v1/teams');
    let data = await response.json();
    let rosters = data.teams;

    console.log(rosters)

    rosters.forEach(team => {
        let teamId = team.id;
        getTeamRosterData(teamId)
    })
    
    return rosters;
}

getTeams()

async function getTeamRosterData(id) {
    let response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${id}?expand=team.roster`);
    let data = await response.json();
    let rosterData = data.teams[0].roster.roster;
    let teamName = data.teams[0].name;
    console.log(rosterData);


    createCard(teamName);

    // document.getElementById('teamName').innerText = teamName

    if (rosterData.length > 0) {
        let card = '';

        rosterData.forEach(player => {
            card +="<tr>";
            card += `<td>${player.person.fullName}</td>`;
            card += `<td>${player.jerseyNumber}</td>`;
            card += `<td>${player.position.name}</td></tr>`
           
        });
        document.getElementById(`${teamName}`).innerHTML = card
    }
    return rosterData;
}

// getTeamRosterData()


async function getPlayerData() {
    let response = await fetch('https://statsapi.web.nhl.com/api/v1/people/8471698/stats?stats=gameLog&season=20182019');
    let data = await response.json();
    let playerData = data.stats[0].splits;

    // console.log(playerData);


    if (playerData.length > 0) {
        let temp = '';

        playerData.forEach(game => {
            temp +="<tr>";
            temp += `<td>${game.stat.goals}</td>`;
            temp += `<td>${game.stat.assists}</td>`;
            temp += `<td>${game.stat.points}</td></tr>`
        });
        document.getElementById('playerdata').innerHTML = temp
    }
    return playerData;
}

// getPlayerData()