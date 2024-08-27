const nanoid = (n) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < n; i++) {
    result += chars[Math.floor(Math.random() * 26)];
  }
  return result;
};

let data;

const resetData = () => {
  data = [
    {
      id: nanoid(5),
      title: 'The Godfather',
      director: 'Francis Ford Coppola',
      metascore: 100,
      genre: 'Drama',
      description:
        'War hero Michael is the prodigal son of aging but fearsome crime patriarch Don Vito Corleone. When Michael returns home only to be thrust into an all-too-familiar world of hitmen, corrupt cops, and simmering mafia rivalries, he is forced to choose between his own path and the Corleone family legacy.',
    },
    {
      id: nanoid(5),
      title: 'Star Wars',
      director: 'George Lucas',
      metascore: 92,
      genre: 'Scifi',
      description:
        "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    },
    {
      id: nanoid(5),
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      director: 'Peter Jackson',
      metascore: 92,
      genre: 'Fantasy',
      description:
        'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    },
    {
      id: nanoid(5),
      title: 'Terminator 2: Judgement Day',
      director: 'James Cameron',
      metascore: 94,
      genre: 'Action',
      description:
        'A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten year old son, John Connor, from a more advanced and powerful cyborg.',
    },
    {
      id: nanoid(5),
      title: 'Dumb and Dumber',
      director: 'The Farely Brothers',
      metascore: 76,
      genre: 'Comedy',
      description:
        'After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.',
    },
    {
      id: nanoid(5),
      title: 'Tombstone',
      director: 'George P. Cosmatos',
      metascore: 89,
      genre: 'Drama',
      description:
        "A successful lawman's plans to retire anonymously in Tombstone, Arizona are disrupted by the kind of outlaws he was famous for eliminating.",
    },
  ];
};

resetData();

const getAll = () => {
  return data;
};

const getById = (id) => {
  return data.find((d) => d.id === id);
};

const create = (item) => {
  data.push({ id: nanoid(5), createdAt: Date(), ...item });
  return data;
};

const edit = (id, item) => {
  data = data.map((d) => {
    return d.id === id ? { ...d, ...item } : d;
  });

  return data;
};

const remove = (id) => {
  data = data.filter((d) => {
    return d.id !== id;
  });
  return data;
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  remove,
  resetData, // only tests use this
};
