const formatBio = str => {
  str = str.replace(
    /https:\/\/[\w]+\.[\w]+\.[\w]+/gm, 
    '<a href="$&" target="_blank">$&</a>'
  ).replace(
    /&lt;a?:[a-zA-Z0-9_]+:[0-9]+&gt;/g,
    str => {
      return `<img tippy-delay="300, 0" tippy=":${str.split(':')[1]}:<br><span class='click-to-learn-more'> Click to learn more" src='https://cdn.discordapp.com/emojis/${str.split(':')[2].split('&')[0]}.${str.includes('&lt;a:') ? "gif" : "png"}'>`
    }
  )
  return str;
};

const bio = document.querySelector('.bio > p');
bio.innerHTML = formatBio(bio.innerHTML);
twemoji.parse(bio);

const note = document.querySelector('textarea');
note.addEventListener('keypress', event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    note.disabled = true;
    note.disabled = false;
  }
});

document.querySelectorAll('[tippy]').forEach(el => {
  tippy(el, {
    content: el.getAttribute('tippy'),
    allowHTML: true,
    placement: 'top',
    arrow: true,
    theme: 'discord',
    duration: [80, 80],
    delay: el.getAttribute('tippy-delay') ? el.getAttribute('tippy-delay').split(',').reduce((a, b) => a.concat(b), []) : [0, 0],
    inertia: true,
    animation: 'discord'
  })
});