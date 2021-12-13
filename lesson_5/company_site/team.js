"use strict";

const TeamBios = { 'Kevin Wang': 'Kevin Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                   'Louis Burton': 'Louis Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                   'Kasper Salto': 'Kasper Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                   'Chris Lee': 'Chris Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                  };

function createModal(image, name, bio) {
  let modal = document.createElement('div');
  image.setAttribute('class', 'modal');

  let modalHeader = document.createElement('header');
  modalHeader.setAttribute('class', 'modal');
  modalHeader.appendChild(image);
  let h3 = document.createElement('h3');
  h3.innerText = name;
  h3.setAttribute('class', 'modal');
  modalHeader.appendChild(h3);
  let closeImg = document.createElement('img');
  closeImg.setAttribute('src', 'images/icon_close.png');
  closeImg.setAttribute('alt', 'close image');
  closeImg.setAttribute('id', 'close');
  modalHeader.appendChild(closeImg);
  modal.appendChild(modalHeader);
  
  let modalSection =  document.createElement('section');
  modalSection.setAttribute('class', 'modal');
  let sectionP = document.createElement('p');
  sectionP.innerText = bio;
  sectionP.setAttribute('class', 'modal');
  modalSection.appendChild(sectionP);
  modal.appendChild(modalSection);

  modal.setAttribute('class', 'modal');

  return modal;
}

document.addEventListener('DOMContentLoaded', () => {
  let ulTeamList = document.querySelector('article ul');
  let aListTeamMembers = document.querySelectorAll('article ul li a');

  for (let index = 0; index < aListTeamMembers.length; index += 1) {
    let aTeamMember = aListTeamMembers[index];

    aTeamMember.addEventListener('click', event => {
      event.preventDefault();

      if (document.querySelector('.modal')) {
        document.querySelector('.modal').remove();
      }

      if (document.querySelector('.overlay')) {
        document.querySelector('.overlay').remove();
      }

      let teamMemberImg = aTeamMember.querySelector('img').cloneNode();
      let teamMemberName = teamMemberImg.getAttribute('alt');
      let teamMemberBio = TeamBios[teamMemberName];

      let modal = createModal(teamMemberImg, teamMemberName, teamMemberBio);
      let main = document.querySelector('main');

      let modalOverlay = document.createElement('div');
      modalOverlay.setAttribute('class', 'overlay');
      modalOverlay.append(modal);
      main.appendChild(modalOverlay);

      modal.style.visibility = 'visible';
      modalOverlay.style.visibility = 'visible';

      setTimeout(() => {
        document.querySelector('html').addEventListener('click', event => {
          console.log(event.target);
          if (event.target.getAttribute('class') !== 'modal') {
            modal.style.visibility = 'hidden';
            modalOverlay.style.visibility = 'hidden';
          }
        });
      }, 0);
    });
  }
});
