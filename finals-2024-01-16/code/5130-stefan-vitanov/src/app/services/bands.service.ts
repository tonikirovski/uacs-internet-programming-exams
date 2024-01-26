import { Injectable } from '@angular/core';
import Band from '../models/band';
import { filter, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const bandsJson = `[
  {
      "id": 1,
      "name": "Black Sabbath",
      "genre": "Doom Metal",
      "formed": 1968,
      "location": "Birmingham, England",
      "members": [
          "Ozzy Osbourne",
          "Tony Iommi",
          "Geezer Butler",
          "Bill Ward"
      ],
      "albums": [
          {
              "name": "Black Sabbath",
              "year": 1970
          },
          {
              "name": "Paranoid",
              "year": 1970
          },
          {
              "name": "Master of Reality",
              "year": 1971
          },
          {
              "name": "Vol. 4",
              "year": 1972
          },
          {
              "name": "Sabbath Bloody Sabbath",
              "year": 1973
          },
          {
              "name": "Sabotage",
              "year": 1975
          },
          {
              "name": "Technical Ecstasy",
              "year": 1976
          },
          {
              "name": "Never Say Die!",
              "year": 1978
          },
          {
              "name": "Heaven and Hell",
              "year": 1980
          },
          {
              "name": "Mob Rules",
              "year": 1981
          },
          {
              "name": "Born Again",
              "year": 1983
          },
          {
              "name": "Seventh Star",
              "year": 1986
          },
          {
              "name": "The Eternal Idol",
              "year": 1987
          },
          {
              "name": "Headless Cross",
              "year": 1989
          },
          {
              "name": "Tyr",
              "year": 1990
          },
          {
              "name": "Dehumanizer",
              "year": 1992
          },
          {
              "name": "Cross Purposes",
              "year": 1994
          },
          {
              "name": "Forbidden",
              "year": 1995
          },
          {
              "name": "13",
              "year": 2013
          }
      ]
  },
  {
      "id": 2,
      "name": "Metallica",
      "genre": "Thrash Metal",
      "formed": 1981,
      "location": "Los Angeles, California, USA",
      "members": [
          "James Hetfield",
          "Lars Ulrich",
          "Kirk Hammett",
          "Robert Trujillo"
      ],
      "albums": [
          {
              "name": "Kill 'Em All",
              "year": 1983
          },
          {
              "name": "Ride the Lightning",
              "year": 1984
          },
          {
              "name": "Master of Puppets",
              "year": 1986
          },
          {
              "name": "...And Justice for All",
              "year": 1988
          },
          {
              "name": "Metallica (The Black Album)",
              "year": 1991
          },
          {
              "name": "Load",
              "year": 1996
          },
          {
              "name": "Reload",
              "year": 1997
          },
          {
              "name": "St. Anger",
              "year": 2003
          },
          {
              "name": "Death Magnetic",
              "year": 2008
          },
          {
              "name": "Hardwired... to Self-Destruct",
              "year": 2016
          }
      ]
  },
  {
      "id": 3,
      "name": "Iron Maiden",
      "genre": "Heavy Metal",
      "formed": 1975,
      "location": "London, England",
      "members": [
          "Steve Harris",
          "Bruce Dickinson",
          "Dave Murray",
          "Adrian Smith",
          "Nicko McBrain",
          "Janick Gers"
      ],
      "albums": [
          {
              "name": "Iron Maiden",
              "year": 1980
          },
          {
              "name": "Killers",
              "year": 1981
          },
          {
              "name": "The Number of the Beast",
              "year": 1982
          },
          {
              "name": "Piece of Mind",
              "year": 1983
          },
          {
              "name": "Powerslave",
              "year": 1984
          },
          {
              "name": "Somewhere in Time",
              "year": 1986
          },
          {
              "name": "Seventh Son of a Seventh Son",
              "year": 1988
          },
          {
              "name": "No Prayer for the Dying",
              "year": 1990
          },
          {
              "name": "Fear of the Dark",
              "year": 1992
          },
          {
              "name": "The X Factor",
              "year": 1995
          },
          {
              "name": "Virtual XI",
              "year": 1998
          },
          {
              "name": "Brave New World",
              "year": 2000
          },
          {
              "name": "Dance of Death",
              "year": 2003
          },
          {
              "name": "A Matter of Life and Death",
              "year": 2006
          },
          {
              "name": "The Final Frontier",
              "year": 2010
          },
          {
              "name": "The Book of Souls",
              "year": 2015
          }
      ]
  },
  {
      "id": 4,
      "name": "Slayer",
      "genre": "Thrash Metal",
      "formed": 1981,
      "location": "Huntington Park, California, USA",
      "members": [
          "Tom Araya",
          "Kerry King",
          "Jeff Hanneman (†)",
          "Dave Lombardo"
      ],
      "albums": [
          {
              "name": "Show No Mercy",
              "year": 1983
          },
          {
              "name": "Hell Awaits",
              "year": 1985
          },
          {
              "name": "Reign in Blood",
              "year": 1986
          },
          {
              "name": "South of Heaven",
              "year": 1988
          },
          {
              "name": "Seasons in the Abyss",
              "year": 1990
          },
          {
              "name": "Divine Intervention",
              "year": 1994
          },
          {
              "name": "Undisputed Attitude",
              "year": 1996
          },
          {
              "name": "Diabolus in Musica",
              "year": 1998
          },
          {
              "name": "God Hates Us All",
              "year": 2001
          },
          {
              "name": "Christ Illusion",
              "year": 2006
          },
          {
              "name": "World Painted Blood",
              "year": 2009
          },
          {
              "name": "Repentless",
              "year": 2015
          }
      ]
  },
  {
      "id": 5,
      "name": "Pantera",
      "genre": "Groove Metal",
      "formed": 1981,
      "location": "Arlington, Texas, USA",
      "members": [
          "Phil Anselmo",
          "Dimebag Darrell (†)",
          "Vinnie Paul (†)",
          "Rex Brown"
      ],
      "albums": [
          {
              "name": "Metal Magic",
              "year": 1983
          },
          {
              "name": "Projects in the Jungle",
              "year": 1984
          },
          {
              "name": "I Am the Night",
              "year": 1985
          },
          {
              "name": "Power Metal",
              "year": 1988
          },
          {
              "name": "Cowboys from Hell",
              "year": 1990
          },
          {
              "name": "Vulgar Display of Power",
              "year": 1992
          },
          {
              "name": "Far Beyond Driven",
              "year": 1994
          },
          {
              "name": "The Great Southern Trendkill",
              "year": 1996
          },
          {
              "name": "Reinventing the Steel",
              "year": 2000
          }
      ]
  },
  {
      "id": 6,
      "name": "Judas Priest",
      "genre": "Heavy Metal",
      "formed": 1969,
      "location": "Birmingham, England",
      "members": [
          "Rob Halford",
          "Glenn Tipton",
          "Ian Hill",
          "Richie Faulkner",
          "Scott Travis"
      ],
      "albums": [
          {
              "name": "Rocka Rolla",
              "year": 1974
          },
          {
              "name": "Sad Wings of Destiny",
              "year": 1976
          },
          {
              "name": "Sin After Sin",
              "year": 1977
          },
          {
              "name": "Stained Class",
              "year": 1978
          },
          {
              "name": "Hell Bent for Leather (Killing Machine)",
              "year": 1978
          },
          {
              "name": "British Steel",
              "year": 1980
          },
          {
              "name": "Point of Entry",
              "year": 1981
          },
          {
              "name": "Screaming for Vengeance",
              "year": 1982
          },
          {
              "name": "Defenders of the Faith",
              "year": 1984
          },
          {
              "name": "Turbo",
              "year": 1986
          },
          {
              "name": "Ram It Down",
              "year": 1988
          },
          {
              "name": "Painkiller",
              "year": 1990
          },
          {
              "name": "Jugulator",
              "year": 1997
          },
          {
              "name": "Demolition",
              "year": 2001
          },
          {
              "name": "Angel of Retribution",
              "year": 2005
          },
          {
              "name": "Nostradamus",
              "year": 2008
          },
          {
              "name": "Redeemer of Souls",
              "year": 2014
          },
          {
              "name": "Firepower",
              "year": 2018
          }
      ]
  },
  {
      "id": 7,
      "name": "Megadeth",
      "genre": "Thrash Metal",
      "formed": 1983,
      "location": "Los Angeles, California, USA",
      "members": [
          "Dave Mustaine",
          "David Ellefson",
          "Kiko Loureiro",
          "Dirk Verbeuren"
      ],
      "albums": [
          {
              "name": "Killing Is My Business... and Business Is Good!",
              "year": 1985
          },
          {
              "name": "Peace Sells... but Who's Buying?",
              "year": 1986
          },
          {
              "name": "So Far, So Good... So What!",
              "year": 1988
          },
          {
              "name": "Rust in Peace",
              "year": 1990
          },
          {
              "name": "Countdown to Extinction",
              "year": 1992
          },
          {
              "name": "Youthanasia",
              "year": 1994
          },
          {
              "name": "Cryptic Writings",
              "year": 1997
          },
          {
              "name": "Risk",
              "year": 1999
          },
          {
              "name": "The World Needs a Hero",
              "year": 2001
          },
          {
              "name": "The System Has Failed",
              "year": 2004
          },
          {
              "name": "United Abominations",
              "year": 2007
          },
          {
              "name": "Endgame",
              "year": 2009
          },
          {
              "name": "Th1rt3en",
              "year": 2011
          },
          {
              "name": "Super Collider",
              "year": 2013
          },
          {
              "name": "Dystopia",
              "year": 2016
          }
      ]
  },
  {
      "id": 8,
      "name": "Motörhead",
      "genre": "Heavy Metal",
      "formed": 1975,
      "location": "London, England",
      "members": [
          "Lemmy Kilmister (†)",
          "Phil Campbell",
          "Mikkey Dee",
          "Larry Wallis (†)"
      ],
      "albums": [
          {
              "name": "Motörhead",
              "year": 1977
          },
          {
              "name": "Overkill",
              "year": 1979
          },
          {
              "name": "Bomber",
              "year": 1979
          },
          {
              "name": "Ace of Spades",
              "year": 1980
          },
          {
              "name": "Iron Fist",
              "year": 1982
          },
          {
              "name": "Another Perfect Day",
              "year": 1983
          },
          {
              "name": "Orgasmatron",
              "year": 1986
          },
          {
              "name": "Rock 'n' Roll",
              "year": 1987
          },
          {
              "name": "1916",
              "year": 1991
          },
          {
              "name": "March ör Die",
              "year": 1992
          },
          {
              "name": "Bastards",
              "year": 1993
          },
          {
              "name": "Sacrifice",
              "year": 1995
          },
          {
              "name": "Overnight Sensation",
              "year": 1996
          },
          {
              "name": "Snake Bite Love",
              "year": 1998
          },
          {
              "name": "We Are Motörhead",
              "year": 2000
          },
          {
              "name": "Hammered",
              "year": 2002
          },
          {
              "name": "Inferno",
              "year": 2004
          },
          {
              "name": "Kiss of Death",
              "year": 2006
          },
          {
              "name": "Motörizer",
              "year": 2008
          },
          {
              "name": "The Wörld Is Yours",
              "year": 2010
          },
          {
              "name": "Aftershock",
              "year": 2013
          }
      ]
  },
  {
      "id": 9,
      "name": "Opeth",
      "genre": "Progressive Death Metal",
      "formed": 1989,
      "location": "Stockholm, Sweden",
      "members": [
          "Mikael Akerfeldt",
          "Fredrik Akesson",
          "Joakim Svalberg",
          "Martín Méndez",
          "Martin Axenrot"
      ],
      "albums": [
          {
              "name": "Orchid",
              "year": 1995
          },
          {
              "name": "Morningrise",
              "year": 1996
          },
          {
              "name": "My Arms, Your Hearse",
              "year": 1998
          },
          {
              "name": "Still Life",
              "year": 1999
          },
          {
              "name": "Blackwater Park",
              "year": 2001
          },
          {
              "name": "Deliverance",
              "year": 2002
          },
          {
              "name": "Damnation",
              "year": 2003
          },
          {
              "name": "Ghost Reveries",
              "year": 2005
          },
          {
              "name": "Watershed",
              "year": 2008
          },
          {
              "name": "Heritage",
              "year": 2011
          },
          {
              "name": "Pale Communion",
              "year": 2014
          },
          {
              "name": "Sorceress",
              "year": 2016
          },
          {
              "name": "In Cauda Venenum",
              "year": 2019
          }
      ]
  },
  {
      "id": 10,
      "name": "Tool",
      "genre": "Progressive Metal",
      "formed": 1990,
      "location": "Los Angeles, California, USA",
      "members": [
          "Maynard James Keenan",
          "Adam Jones",
          "Justin Chancellor",
          "Danny Carey"
      ],
      "albums": [
          {
              "name": "Undertow",
              "year": 1993
          },
          {
              "name": "Ænima",
              "year": 1996
          },
          {
              "name": "Lateralus",
              "year": 2001
          },
          {
              "name": "10,000 Days",
              "year": 2006
          },
          {
              "name": "Fear Inoculum",
              "year": 2019
          }
      ]
  },
  {
      "id": 11,
      "name": "Slipknot",
      "genre": "Nu Metal",
      "formed": 1995,
      "location": "Des Moines, Iowa, USA",
      "members": [
          "Corey Taylor",
          "Jim Root",
          "Shawn Crahan",
          "Craig Jones",
          "Sid Wilson",
          "Jay Weinberg",
          "Alessandro Venturella",
          "Michael Pfaff",
          "Chris Fehn",
          "Paul Gray (†)",
          "Anders Colsefni",
          "Donnie Steele",
          "Joey Jordison (†)"
      ],
      "albums": [
          {
              "name": "Slipknot",
              "year": 1999
          },
          {
              "name": "Iowa",
              "year": 2001
          },
          {
              "name": "Vol. 3: (The Subliminal Verses)",
              "year": 2004
          },
          {
              "name": "All Hope Is Gone",
              "year": 2008
          },
          {
              "name": ".5: The Gray Chapter",
              "year": 2014
          },
          {
              "name": "We Are Not Your Kind",
              "year": 2019
          }
      ]
  },
  {
      "id": 12,
      "name": "Dream Theater",
      "genre": "Progressive Metal",
      "formed": 1985,
      "location": "Boston, Massachusetts, USA",
      "members": [
          "James LaBrie",
          "John Petrucci",
          "Jordan Rudess",
          "John Myung",
          "Mike Mangini"
      ],
      "albums": [
          {
              "name": "When Dream and Day Unite",
              "year": 1989
          },
          {
              "name": "Images and Words",
              "year": 1992
          },
          {
              "name": "Awake",
              "year": 1994
          },
          {
              "name": "A Change of Seasons",
              "year": 1995
          },
          {
              "name": "Falling into Infinity",
              "year": 1997
          },
          {
              "name": "Metropolis Pt. 2: Scenes from a Memory",
              "year": 1999
          },
          {
              "name": "Six Degrees of Inner Turbulence",
              "year": 2002
          },
          {
              "name": "Train of Thought",
              "year": 2003
          },
          {
              "name": "Octavarium",
              "year": 2005
          },
          {
              "name": "Systematic Chaos",
              "year": 2007
          },
          {
              "name": "Black Clouds & Silver Linings",
              "year": 2009
          },
          {
              "name": "A Dramatic Turn of Events",
              "year": 2011
          },
          {
              "name": "Dream Theater",
              "year": 2013
          },
          {
              "name": "The Astonishing",
              "year": 2016
          },
          {
              "name": "Distance over Time",
              "year": 2019
          },
          {
              "name": "A View from the Top of the World",
              "year": 2021
          }
      ]
  },
  {
      "id": 13,
      "name": "Rammstein",
      "genre": "Industrial Metal",
      "formed": 1994,
      "location": "Berlin, Germany",
      "members": [
          "Till Lindemann",
          "Richard Z. Kruspe",
          "Paul Landers",
          "Oliver Riedel",
          "Christian Lorenz",
          "Christoph Schneider"
      ],
      "albums": [
          {
              "name": "Herzeleid",
              "year": 1995
          },
          {
              "name": "Sehnsucht",
              "year": 1997
          },
          {
              "name": "Mutter",
              "year": 2001
          },
          {
              "name": "Reise, Reise",
              "year": 2004
          },
          {
              "name": "Rosenrot",
              "year": 2005
          },
          {
              "name": "Liebe ist für alle da",
              "year": 2009
          },
          {
              "name": "Rammstein",
              "year": 2019
          }
      ]
  },
  {
      "id": 14,
      "name": "Mastodon",
      "genre": "Progressive Metal",
      "formed": 2000,
      "location": "Atlanta, Georgia, USA",
      "members": [
          "Troy Sanders",
          "Brent Hinds",
          "Bill Kelliher",
          "Brann Dailor"
      ],
      "albums": [
          {
              "name": "Remission",
              "year": 2002
          },
          {
              "name": "Leviathan",
              "year": 2004
          },
          {
              "name": "Blood Mountain",
              "year": 2006
          },
          {
              "name": "Crack the Skye",
              "year": 2009
          },
          {
              "name": "The Hunter",
              "year": 2011
          },
          {
              "name": "Once More 'Round the Sun",
              "year": 2014
          },
          {
              "name": "Emperor of Sand",
              "year": 2017
          },
          {
              "name": "Hushed and Grim",
              "year": 2021
          }
      ]
  },
  {
      "id": 15,
      "name": "Death",
      "genre": "Death Metal",
      "formed": 1983,
      "location": "Altamonte Springs, Florida, USA",
      "members": [
          "Chuck Schuldiner (†)",
          "Paul Masvidal",
          "Sean Reinert (†)",
          "Steve DiGiorgio",
          "Gene Hoglan",
          "Richard Christy"
      ],
      "albums": [
          {
              "name": "Scream Bloody Gore",
              "year": 1987
          },
          {
              "name": "Leprosy",
              "year": 1988
          },
          {
              "name": "Spiritual Healing",
              "year": 1990
          },
          {
              "name": "Human",
              "year": 1991
          },
          {
              "name": "Individual Thought Patterns",
              "year": 1993
          },
          {
              "name": "Symbolic",
              "year": 1995
          },
          {
              "name": "The Sound of Perseverance",
              "year": 1998
          }
      ]
  },
  {
      "id": 16,
      "name": "Anthrax",
      "genre": "Thrash Metal",
      "formed": 1981,
      "location": "New York City, New York, USA",
      "members": [
          "Scott Ian",
          "Charlie Benante",
          "Frank Bello",
          "Joey Belladonna",
          "Jonathan Donais"
      ],
      "albums": [
          {
              "name": "Fistful of Metal",
              "year": 1984
          },
          {
              "name": "Spreading the Disease",
              "year": 1985
          },
          {
              "name": "Among the Living",
              "year": 1987
          },
          {
              "name": "State of Euphoria",
              "year": 1988
          },
          {
              "name": "Persistence of Time",
              "year": 1990
          },
          {
              "name": "Sound of White Noise",
              "year": 1993
          },
          {
              "name": "Stomp 442",
              "year": 1995
          },
          {
              "name": "Volume 8: The Threat Is Real",
              "year": 1998
          },
          {
              "name": "We've Come for You All",
              "year": 2003
          },
          {
              "name": "Worship Music",
              "year": 2011
          },
          {
              "name": "For All Kings",
              "year": 2016
          },
          {
              "name": "Solitude in Madness",
              "year": 2020
          }
      ]
  },
  {
      "id": 17,
      "name": "Sepultura",
      "genre": "Thrash/Groove Metal",
      "formed": 1984,
      "location": "Belo Horizonte, Brazil",
      "members": [
          "Andreas Kisser",
          "Derrick Green",
          "Paulo Jr.",
          "Eloy Casagrande"
      ],
      "albums": [
          {
              "name": "Morbid Visions",
              "year": 1986
          },
          {
              "name": "Schizophrenia",
              "year": 1987
          },
          {
              "name": "Beneath the Remains",
              "year": 1989
          },
          {
              "name": "Arise",
              "year": 1991
          },
          {
              "name": "Chaos A.D.",
              "year": 1993
          },
          {
              "name": "Roots",
              "year": 1996
          },
          {
              "name": "Against",
              "year": 1998
          },
          {
              "name": "Nation",
              "year": 2001
          },
          {
              "name": "Roorback",
              "year": 2003
          },
          {
              "name": "Dante XXI",
              "year": 2006
          },
          {
              "name": "A-Lex",
              "year": 2009
          },
          {
              "name": "Kairos",
              "year": 2011
          },
          {
              "name": "The Mediator Between Head and Hands Must Be the Heart",
              "year": 2013
          },
          {
              "name": "Machine Messiah",
              "year": 2017
          },
          {
              "name": "Quadra",
              "year": 2020
          }
      ]
  },
  {
      "id": 18,
      "name": "Kreator",
      "genre": "Thrash Metal",
      "formed": 1982,
      "location": "Essen, Germany",
      "members": [
          "Mille Petrozza",
          "Sami Yli-Sirnio",
          "Christian Giesler",
          "Jürgen Reil"
      ],
      "albums": [
          {
              "name": "Endless Pain",
              "year": 1985
          },
          {
              "name": "Pleasure to Kill",
              "year": 1986
          },
          {
              "name": "Terrible Certainty",
              "year": 1987
          },
          {
              "name": "Extreme Aggression",
              "year": 1989
          },
          {
              "name": "Coma of Souls",
              "year": 1990
          },
          {
              "name": "Renewal",
              "year": 1992
          },
          {
              "name": "Cause for Conflict",
              "year": 1995
          },
          {
              "name": "Outcast",
              "year": 1997
          },
          {
              "name": "Endorama",
              "year": 1999
          },
          {
              "name": "Violent Revolution",
              "year": 2001
          },
          {
              "name": "Enemy of God",
              "year": 2005
          },
          {
              "name": "Hordes of Chaos",
              "year": 2009
          },
          {
              "name": "Phantom Antichrist",
              "year": 2012
          },
          {
              "name": "Gods of Violence",
              "year": 2017
          },
          {
              "name": "Under the Guillotine",
              "year": 2021
          }
      ]
  },
  {
      "id": 19,
      "name": "Rage Against the Machine",
      "genre": "Rap Metal",
      "formed": 1991,
      "location": "Los Angeles, California, USA",
      "members": [
          "Zack de la Rocha",
          "Tom Morello",
          "Tim Commerford",
          "Brad Wilk"
      ],
      "albums": [
          {
              "name": "Rage Against the Machine",
              "year": 1992
          },
          {
              "name": "Evil Empire",
              "year": 1996
          },
          {
              "name": "The Battle of Los Angeles",
              "year": 1999
          },
          {
              "name": "Renegades",
              "year": 2000
          },
          {
              "name": "Live at the Grand Olympic Auditorium",
              "year": 2003
          }
      ]
  },
  {
      "id": 20,
      "name": "Amon Amarth",
      "genre": "Melodic Death Metal",
      "formed": 1992,
      "location": "Tumba, Sweden",
      "members": [
          "Johan Hegg",
          "Olavi Mikkonen",
          "Ted Lundström",
          "Jocke Wallgren",
          "Johan Söderberg"
      ],
      "albums": [
          {
              "name": "Once Sent from the Golden Hall",
              "year": 1998
          },
          {
              "name": "The Avenger",
              "year": 1999
          },
          {
              "name": "The Crusher",
              "year": 2001
          },
          {
              "name": "Versus the World",
              "year": 2002
          },
          {
              "name": "Fate of Norns",
              "year": 2004
          },
          {
              "name": "With Oden on Our Side",
              "year": 2006
          },
          {
              "name": "Twilight of the Thunder God",
              "year": 2008
          },
          {
              "name": "Surtur Rising",
              "year": 2011
          },
          {
              "name": "Deceiver of the Gods",
              "year": 2013
          },
          {
              "name": "Jomsviking",
              "year": 2016
          },
          {
              "name": "Berserker",
              "year": 2019
          },
          {
              "name": "Vikings",
              "year": 2022
          }
      ]
  },
  {
      "id": 21,
      "name": "Cannibal Corpse",
      "genre": "Death Metal",
      "formed": 1988,
      "location": "Buffalo, New York, USA",
      "members": [
          "George Fisher",
          "Alex Webster",
          "Paul Mazurkiewicz",
          "Rob Barrett",
          "Erik Rutan"
      ],
      "albums": [
          {
              "name": "Eaten Back to Life",
              "year": 1990
          },
          {
              "name": "Butchered at Birth",
              "year": 1991
          },
          {
              "name": "Tomb of the Mutilated",
              "year": 1992
          },
          {
              "name": "The Bleeding",
              "year": 1994
          },
          {
              "name": "Vile",
              "year": 1996
          },
          {
              "name": "Gallery of Suicide",
              "year": 1998
          },
          {
              "name": "Bloodthirst",
              "year": 1999
          },
          {
              "name": "Gore Obsessed",
              "year": 2002
          },
          {
              "name": "The Wretched Spawn",
              "year": 2004
          },
          {
              "name": "Kill",
              "year": 2006
          },
          {
              "name": "Evisceration Plague",
              "year": 2009
          },
          {
              "name": "Torture",
              "year": 2012
          },
          {
              "name": "A Skeletal Domain",
              "year": 2014
          },
          {
              "name": "Red Before Black",
              "year": 2017
          },
          {
              "name": "Violence Unimagined",
              "year": 2021
          }
      ]
  },
  {
      "id": 22,
      "name": "In Flames",
      "genre": "Melodic Death Metal",
      "formed": 1990,
      "location": "Gothenburg, Sweden",
      "members": [
          "Anders Fridén",
          "Björn Gelotte",
          "Peter Iwers",
          "Niclas Engelin",
          "Tanner Wayne"
      ],
      "albums": [
          {
              "name": "Lunar Strain",
              "year": 1994
          },
          {
              "name": "Subterranean",
              "year": 1995
          },
          {
              "name": "The Jester Race",
              "year": 1996
          },
          {
              "name": "Whoracle",
              "year": 1997
          },
          {
              "name": "Colony",
              "year": 1999
          },
          {
              "name": "Clayman",
              "year": 2000
          },
          {
              "name": "Reroute to Remain",
              "year": 2002
          },
          {
              "name": "Soundtrack to Your Escape",
              "year": 2004
          },
          {
              "name": "Come Clarity",
              "year": 2006
          },
          {
              "name": "A Sense of Purpose",
              "year": 2008
          },
          {
              "name": "Sounds of a Playground Fading",
              "year": 2011
          },
          {
              "name": "Siren Charms",
              "year": 2014
          },
          {
              "name": "Battles",
              "year": 2016
          },
          {
              "name": "I, the Mask",
              "year": 2019
          },
          {
              "name": "In Flames",
              "year": 2022
          }
      ]
  },
  {
      "id": 23,
      "name": "System of a Down",
      "genre": "Alternative Metal",
      "formed": 1994,
      "location": "Los Angeles, California, USA",
      "members": [
          "Serj Tankian",
          "Daron Malakian",
          "Shavo Odadjian",
          "John Dolmayan"
      ],
      "albums": [
          {
              "name": "System of a Down",
              "year": 1998
          },
          {
              "name": "Toxicity",
              "year": 2001
          },
          {
              "name": "Steal This Album!",
              "year": 2002
          },
          {
              "name": "Mezmerize",
              "year": 2005
          },
          {
              "name": "Hypnotize",
              "year": 2005
          }
      ]
  },
  {
      "id": 24,
      "name": "Nightwish",
      "genre": "Symphonic Metal",
      "formed": 1996,
      "location": "Kitee, Finland",
      "members": [
          "Tuomas Holopainen",
          "Floor Jansen",
          "Marco Hietala",
          "Emppu Vuorinen",
          "Kai Hahto"
      ],
      "albums": [
          {
              "name": "Angels Fall First",
              "year": 1997
          },
          {
              "name": "Oceanborn",
              "year": 1998
          },
          {
              "name": "Wishmaster",
              "year": 2000
          },
          {
              "name": "Over the Hills and Far Away",
              "year": 2001
          },
          {
              "name": "Century Child",
              "year": 2002
          },
          {
              "name": "Once",
              "year": 2004
          },
          {
              "name": "Dark Passion Play",
              "year": 2007
          },
          {
              "name": "Imaginaerum",
              "year": 2011
          },
          {
              "name": "Endless Forms Most Beautiful",
              "year": 2015
          },
          {
              "name": "Human. :II: Nature.",
              "year": 2020
          }
      ]
  },
  {
      "id": 25,
      "name": "Lamb of God",
      "genre": "Groove Metal",
      "formed": 1994,
      "location": "Richmond, Virginia, USA",
      "members": [
          "Randy Blythe",
          "Mark Morton",
          "John Campbell",
          "Willie Adler",
          "Art Cruz"
      ],
      "albums": [
          {
              "name": "New American Gospel",
              "year": 2000
          },
          {
              "name": "As the Palaces Burn",
              "year": 2003
          },
          {
              "name": "Ashes of the Wake",
              "year": 2004
          },
          {
              "name": "Sacrament",
              "year": 2006
          },
          {
              "name": "Wrath",
              "year": 2009
          },
          {
              "name": "Resolution",
              "year": 2012
          },
          {
              "name": "VII: Sturm und Drang",
              "year": 2015
          },
          {
              "name": "Lamb of God",
              "year": 2020
          }
      ]
  },
  {
      "id": 26,
      "name": "Marilyn Manson",
      "genre": "Industrial Metal",
      "formed": 1989,
      "location": "Fort Lauderdale, Florida, USA",
      "members": [
          "Marilyn Manson",
          "Twiggy Ramirez",
          "Paul Wiley",
          "Gil Sharone",
          "Juan Alderete"
      ],
      "albums": [
          {
              "name": "Portrait of an American Family",
              "year": 1994
          },
          {
              "name": "Antichrist Superstar",
              "year": 1996
          },
          {
              "name": "Mechanical Animals",
              "year": 1998
          },
          {
              "name": "Holy Wood (In the Shadow of the Valley of Death)",
              "year": 2000
          },
          {
              "name": "The Golden Age of Grotesque",
              "year": 2003
          },
          {
              "name": "Eat Me, Drink Me",
              "year": 2007
          },
          {
              "name": "The High End of Low",
              "year": 2009
          },
          {
              "name": "Born Villain",
              "year": 2012
          },
          {
              "name": "The Pale Emperor",
              "year": 2015
          },
          {
              "name": "Heaven Upside Down",
              "year": 2017
          }
      ]
  },
  {
      "id": 27,
      "name": "Type O Negative",
      "genre": "Gothic Metal",
      "formed": 1989,
      "location": "Brooklyn, New York, USA",
      "members": [
          "Peter Steele (†)",
          "Josh Silver",
          "Kenny Hickey",
          "Johnny Kelly",
          "Sal Abruscato"
      ],
      "albums": [
          {
              "name": "Slow, Deep and Hard",
              "year": 1991
          },
          {
              "name": "The Origin of the Feces",
              "year": 1992
          },
          {
              "name": "Bloody Kisses",
              "year": 1993
          },
          {
              "name": "October Rust",
              "year": 1996
          },
          {
              "name": "World Coming Down",
              "year": 1999
          },
          {
              "name": "Life Is Killing Me",
              "year": 2003
          },
          {
              "name": "Dead Again",
              "year": 2007
          }
      ]
  },
  {
      "id": 28,
      "name": "Meshuggah",
      "genre": "Progressive Metal",
      "formed": 1987,
      "location": "Umeå, Sweden",
      "members": [
          "Jens Kidman",
          "Fredrik Thordendal",
          "Mårten Hagström",
          "Dick Lövgren",
          "Tomas Haake"
      ],
      "albums": [
          {
              "name": "Contradictions Collapse",
              "year": 1991
          },
          {
              "name": "None",
              "year": 1994
          },
          {
              "name": "Destroy Erase Improve",
              "year": 1995
          },
          {
              "name": "Chaosphere",
              "year": 1998
          },
          {
              "name": "Nothing",
              "year": 2002
          },
          {
              "name": "Catch Thirtythree",
              "year": 2005
          },
          {
              "name": "obZen",
              "year": 2008
          },
          {
              "name": "Koloss",
              "year": 2012
          },
          {
              "name": "The Violent Sleep of Reason",
              "year": 2016
          }
      ]
  },
  {
      "id": 29,
      "name": "Deftones",
      "genre": "Alternative Metal",
      "formed": 1988,
      "location": "Sacramento, California, USA",
      "members": [
          "Chino Moreno",
          "Stephen Carpenter",
          "Abe Cunningham",
          "Frank Delgado",
          "Sergio Vega"
      ],
      "albums": [
          "Adrenaline (1995)",
          "Around the Fur (1997)",
          "White Pony (2000)",
          "Diamond Eyes (2010)",
          "Ohms (2020)"
      ]
  },
  {
      "id": 30,
      "name": "Behemoth",
      "genre": "Blackened Death Metal",
      "formed": 1991,
      "location": "Gdańsk, Poland",
      "members": [
          "Nergal",
          "Orion",
          "Inferno",
          "Seth"
      ],
      "albums": [
          {
              "name": "Sventevith (Storming Near the Baltic)",
              "year": 1995
          },
          {
              "name": "Grom",
              "year": 1996
          },
          {
              "name": "Pandemonic Incantations",
              "year": 1998
          },
          {
              "name": "Satanica",
              "year": 1999
          },
          {
              "name": "Thelema.6",
              "year": 2000
          },
          {
              "name": "Zos Kia Cultus (Here and Beyond)",
              "year": 2002
          },
          {
              "name": "Demigod",
              "year": 2004
          },
          {
              "name": "The Apostasy",
              "year": 2007
          },
          {
              "name": "Evangelion",
              "year": 2009
          },
          {
              "name": "The Satanist",
              "year": 2014
          },
          {
              "name": "I Loved You at Your Darkest",
              "year": 2018
          },
          {
              "name": "In Absentia Dei",
              "year": 2021
          }
      ]
  },
  {
      "id": 31,
      "name": "Sabaton",
      "genre": "Power Metal",
      "formed": 1999,
      "location": "Falun, Sweden",
      "members": [
          "Joakim Brodén",
          "Pär Sundström",
          "Chris Rörland",
          "Hannes Van Dahl",
          "Tommy Johansson"
      ],
      "albums": [
          {
              "name": "Primo Victoria",
              "year": 2005
          },
          {
              "name": "Attero Dominatus",
              "year": 2006
          },
          {
              "name": "Metalizer",
              "year": 2007
          },
          {
              "name": "The Art of War",
              "year": 2008
          },
          {
              "name": "Coat of Arms",
              "year": 2010
          },
          {
              "name": "Carolus Rex",
              "year": 2012
          },
          {
              "name": "Heroes",
              "year": 2014
          },
          {
              "name": "The Last Stand",
              "year": 2016
          },
          {
              "name": "The Great War",
              "year": 2019
          },
          {
              "name": "The War to End All Wars",
              "year": 2022
          }
      ]
  },
  {
      "id": 32,
      "name": "Cradle of Filth",
      "genre": "Extreme Metal",
      "formed": 1991,
      "location": "Ipswich, England",
      "members": [
          "Dani Filth",
          "Martin 'Marthus' Skaroupka",
          "Richard Shaw",
          "Marek 'Ashok' Šmerda",
          "Daniel Firth"
      ],
      "albums": [
          {
              "name": "The Principle of Evil Made Flesh",
              "year": 1994
          },
          {
              "name": "V Empire or Dark Faerytales in Phallustein",
              "year": 1996
          },
          {
              "name": "Dusk... and Her Embrace",
              "year": 1996
          },
          {
              "name": "Cruelty and the Beast",
              "year": 1998
          },
          {
              "name": "Midian",
              "year": 2000
          },
          {
              "name": "Bitter Suites to Succubi",
              "year": 2001
          },
          {
              "name": "Damnation and a Day",
              "year": 2003
          },
          {
              "name": "Nymphetamine",
              "year": 2004
          },
          {
              "name": "Thornography",
              "year": 2006
          },
          {
              "name": "Godspeed on the Devil's Thunder",
              "year": 2008
          },
          {
              "name": "Darkly, Darkly, Venus Aversa",
              "year": 2010
          },
          {
              "name": "The Manticore and Other Horrors",
              "year": 2012
          },
          {
              "name": "Hammer of the Witches",
              "year": 2015
          },
          {
              "name": "Cryptoriana – The Seductiveness of Decay",
              "year": 2017
          },
          {
              "name": "Existence Is Futile",
              "year": 2021
          }
      ]
  },
  {
      "id": 33,
      "name": "Korn",
      "genre": "Nu Metal",
      "formed": 1993,
      "location": "Bakersfield, California, USA",
      "members": [
          "Jonathan Davis",
          "James 'Munky' Shaffer",
          "Reginald 'Fieldy' Arvizu",
          "Brian 'Head' Welch",
          "Ray Luzier"
      ],
      "albums": [
          {
              "name": "Korn",
              "year": 1994
          },
          {
              "name": "Life Is Peachy",
              "year": 1996
          },
          {
              "name": "Follow the Leader",
              "year": 1998
          },
          {
              "name": "Issues",
              "year": 1999
          },
          {
              "name": "Untouchables",
              "year": 2002
          },
          {
              "name": "Take a Look in the Mirror",
              "year": 2003
          },
          {
              "name": "See You on the Other Side",
              "year": 2005
          },
          {
              "name": "Untitled",
              "year": 2007
          },
          {
              "name": "Korn III: Remember Who You Are",
              "year": 2010
          },
          {
              "name": "The Path of Totality",
              "year": 2011
          },
          {
              "name": "The Paradigm Shift",
              "year": 2013
          },
          {
              "name": "The Serenity of Suffering",
              "year": 2016
          },
          {
              "name": "The Nothing",
              "year": 2019
          },
          {
              "name": "Requiem",
              "year": 2022
          }
      ]
  },
  {
      "id": 36,
      "name": "Queensrÿche",
      "genre": "Progressive Metal",
      "formed": 1982,
      "location": "Bellevue, Washington, USA",
      "members": [
          "Todd La Torre",
          "Michael Wilton",
          "Eddie Jackson",
          "Parker Lundgren",
          "Casey Grillo"
      ],
      "albums": [
          {
              "name": "Queensrÿche (EP)",
              "year": 1983
          },
          {
              "name": "The Warning",
              "year": 1984
          },
          {
              "name": "Rage for Order",
              "year": 1986
          },
          {
              "name": "Operation: Mindcrime",
              "year": 1988
          },
          {
              "name": "Empire",
              "year": 1990
          },
          {
              "name": "Promised Land",
              "year": 1994
          },
          {
              "name": "Hear in the Now Frontier",
              "year": 1997
          },
          {
              "name": "Q2K",
              "year": 1999
          },
          {
              "name": "Tribe",
              "year": 2003
          },
          {
              "name": "Operation: Mindcrime II",
              "year": 2006
          },
          {
              "name": "Take Cover",
              "year": 2007
          },
          {
              "name": "American Soldier",
              "year": 2009
          },
          {
              "name": "Dedicated to Chaos",
              "year": 2011
          },
          {
              "name": "Queensrÿche",
              "year": 2013
          },
          {
              "name": "Condition Hüman",
              "year": 2015
          },
          {
              "name": "The Verdict",
              "year": 2019
          }
      ]
  },
  {
      "id": 36,
      "name": "Testament",
      "genre": "Thrash Metal",
      "formed": 1983,
      "location": "Berkeley, California, USA",
      "members": [
          "Chuck Billy",
          "Eric Peterson",
          "Alex Skolnick",
          "Steve Di Giorgio",
          "Gene Hoglan"
      ],
      "albums": [
          {
              "name": "The Legacy",
              "year": 1987
          },
          {
              "name": "The New Order",
              "year": 1988
          },
          {
              "name": "Practice What You Preach",
              "year": 1989
          },
          {
              "name": "Souls of Black",
              "year": 1990
          },
          {
              "name": "The Ritual",
              "year": 1992
          },
          {
              "name": "Low",
              "year": 1994
          },
          {
              "name": "Demonic",
              "year": 1997
          },
          {
              "name": "The Gathering",
              "year": 1999
          },
          {
              "name": "First Strike Still Deadly",
              "year": 2001
          },
          {
              "name": "The Formation of Damnation",
              "year": 2008
          },
          {
              "name": "Dark Roots of Earth",
              "year": 2012
          },
          {
              "name": "Brotherhood of the Snake",
              "year": 2016
          },
          {
              "name": "Titans of Creation",
              "year": 2020
          }
      ]
  },
  {
      "id": 38,
      "name": "Dio",
      "genre": "Heavy Metal",
      "formed": 1982,
      "location": "Cortland, New York, USA",
      "members": [
          "Ronnie James Dio",
          "Vivian Campbell",
          "Jimmy Bain",
          "Vinny Appice",
          "Claude Schnell"
      ],
      "albums": [
          {
              "name": "Holy Diver",
              "year": 1983
          },
          {
              "name": "The Last in Line",
              "year": 1984
          },
          {
              "name": "Sacred Heart",
              "year": 1985
          },
          {
              "name": "Dream Evil",
              "year": 1987
          },
          {
              "name": "Lock Up the Wolves",
              "year": 1990
          },
          {
              "name": "Strange Highways",
              "year": 1993
          },
          {
              "name": "Angry Machines",
              "year": 1996
          },
          {
              "name": "Magica",
              "year": 2000
          },
          {
              "name": "Killing the Dragon",
              "year": 2002
          },
          {
              "name": "Master of the Moon",
              "year": 2004
          }
      ]
  },
  {
      "id": 39,
      "name": "At the Gates",
      "genre": "Melodic Death Metal",
      "formed": 1990,
      "location": "Gothenburg, Sweden",
      "members": [
          "Tomas Lindberg",
          "Jonas Björler",
          "Adrian Erlandsson",
          "Martin Larsson",
          "Jonas Stålhammar"
      ],
      "albums": [
          {
              "name": "The Red in the Sky Is Ours",
              "year": 1992
          },
          {
              "name": "With Fear I Kiss the Burning Darkness",
              "year": 1993
          },
          {
              "name": "Terminal Spirit Disease",
              "year": 1994
          },
          {
              "name": "Slaughter of the Soul",
              "year": 1995
          },
          {
              "name": "At War with Reality",
              "year": 2014
          },
          {
              "name": "To Drink from the Night Itself",
              "year": 2018
          }
      ]
  },
  {
      "id": 40,
      "name": "Alice in Chains",
      "genre": "Grunge Metal",
      "formed": 1987,
      "location": "Seattle, Washington, USA",
      "members": [
          "Jerry Cantrell",
          "William DuVall",
          "Mike Inez",
          "Sean Kinney",
          "Layne Staley (†)"
      ],
      "albums": [
          {
              "name": "Facelift",
              "year": 1990
          },
          {
              "name": "Dirt",
              "year": 1992
          },
          {
              "name": "Jar of Flies",
              "year": 1994
          },
          {
              "name": "Alice in Chains",
              "year": 1995
          },
          {
              "name": "Black Gives Way to Blue",
              "year": 2009
          },
          {
              "name": "The Devil Put Dinosaurs Here",
              "year": 2013
          }
      ]
  },
  {
      "id": 41,
      "name": "Mudvayne",
      "genre": "Nu Metal",
      "formed": 1996,
      "location": "Peoria, Illinois, USA",
      "members": [
          "Chad Gray",
          "Greg Tribbett",
          "Ryan Martinie",
          "Matthew McDonough"
      ],
      "albums": [
          {
              "name": "L.D. 50",
              "year": 2000
          },
          {
              "name": "The End of All Things to Come",
              "year": 2002
          },
          {
              "name": "Lost and Found",
              "year": 2005
          },
          {
              "name": "The New Game",
              "year": 2008
          },
          {
              "name": "Mudvayne",
              "year": 2009
          }
      ]
  },
  {
      "id": 42,
      "name": "Celtic Frost",
      "genre": "Extreme Metal",
      "formed": 1984,
      "location": "Zurich, Switzerland",
      "members": [
          "Tom Gabriel Fischer",
          "Martin Eric Ain (†)",
          "Reed St. Mark",
          "Curt Victor Bryant"
      ],
      "albums": [
          {
              "name": "Morbid Tales",
              "year": 1984
          },
          {
              "name": "To Mega Therion",
              "year": 1985
          },
          {
              "name": "Into the Pandemonium",
              "year": 1987
          },
          {
              "name": "Cold Lake",
              "year": 1988
          },
          {
              "name": "Vanity/Nemesis",
              "year": 1990
          },
          {
              "name": "Monotheist",
              "year": 2006
          }
      ]
  },
  {
      "id": 43,
      "name": "Nile",
      "genre": "Technical Death Metal",
      "formed": 1993,
      "location": "Greenville, South Carolina, USA",
      "members": [
          "Karl Sanders",
          "George Kollias",
          "Brad Parris",
          "Brian Kingsland"
      ],
      "albums": [
          {
              "name": "Amongst the Catacombs of Nephren-Ka",
              "year": 1998
          },
          {
              "name": "Black Seeds of Vengeance",
              "year": 2000
          },
          {
              "name": "In Their Darkened Shrines",
              "year": 2002
          },
          {
              "name": "Annihilation of the Wicked",
              "year": 2005
          },
          {
              "name": "Ithyphallic",
              "year": 2007
          },
          {
              "name": "Those Whom the Gods Detest",
              "year": 2009
          },
          {
              "name": "At the Gate of Sethu",
              "year": 2012
          },
          {
              "name": "What Should Not Be Unearthed",
              "year": 2015
          },
          {
              "name": "Vile Nilotic Rites",
              "year": 2019
          }
      ]
  },
  {
      "id": 44,
      "name": "Gojira",
      "genre": "Progressive Death Metal",
      "formed": 1996,
      "location": "Ondres, France",
      "members": [
          "Joe Duplantier",
          "Mario Duplantier",
          "Christian Andreu",
          "Jean-Michel Labadie"
      ],
      "albums": [
          {
              "name": "Terra Incognita",
              "year": 2001
          },
          {
              "name": "The Link",
              "year": 2003
          },
          {
              "name": "From Mars to Sirius",
              "year": 2005
          },
          {
              "name": "The Way of All Flesh",
              "year": 2008
          },
          {
              "name": "L'Enfant Sauvage",
              "year": 2012
          },
          {
              "name": "Magma",
              "year": 2016
          },
          {
              "name": "Fortitude",
              "year": 2021
          }
      ]
  },
  {
      "id": 51,
      "name": "Disturbed",
      "genre": "Alternative Metal",
      "formed": 1996,
      "location": "Chicago, Illinois, USA",
      "members": [
          "David Draiman",
          "Dan Donegan",
          "John Moyer",
          "Mike Wengren"
      ],
      "albums": [
          {
              "name": "The Sickness",
              "year": 2000
          },
          {
              "name": "Believe",
              "year": 2002
          },
          {
              "name": "Ten Thousand Fists",
              "year": 2005
          },
          {
              "name": "Indestructible",
              "year": 2008
          },
          {
              "name": "Asylum",
              "year": 2010
          },
          {
              "name": "Immortalized",
              "year": 2015
          },
          {
              "name": "Evolution",
              "year": 2018
          }
      ]
  },
  {
      "id": 52,
      "name": "Obituary",
      "genre": "Death Metal",
      "formed": 1984,
      "location": "Tampa, Florida, USA",
      "members": [
          "John Tardy",
          "Trevor Peres",
          "Kenny Andrews",
          "Terry Butler",
          "Donald Tardy"
      ],
      "albums": [
          {
              "name": "Slowly We Rot",
              "year": 1989
          },
          {
              "name": "Cause of Death",
              "year": 1990
          },
          {
              "name": "The End Complete",
              "year": 1992
          },
          {
              "name": "World Demise",
              "year": 1994
          },
          {
              "name": "Back from the Dead",
              "year": 1997
          },
          {
              "name": "Dead",
              "year": 1998
          },
          {
              "name": "Frozen in Time",
              "year": 2005
          },
          {
              "name": "Xecutioner's Return",
              "year": 2007
          },
          {
              "name": "Darkest Day",
              "year": 2009
          },
          {
              "name": "Inked in Blood",
              "year": 2014
          },
          {
              "name": "Obituary",
              "year": 2017
          },
          {
              "name": "A Dying World",
              "year": 2022
          }
      ]
  },
  {
      "id": 53,
      "name": "My Dying Bride",
      "genre": "Doom Metal",
      "formed": 1990,
      "location": "Bradford, West Yorkshire, England",
      "members": [
          "Aaron Stainthorpe",
          "Andrew Craighan",
          "Lena Abé",
          "Shaun Macgowan",
          "Jeff Singer"
      ],
      "albums": [
          {
              "name": "As the Flower Withers",
              "year": 1992
          },
          {
              "name": "Turn Loose the Swans",
              "year": 1993
          },
          {
              "name": "The Angel and the Dark River",
              "year": 1995
          },
          {
              "name": "Like Gods of the Sun",
              "year": 1996
          },
          {
              "name": "34.788%...Complete",
              "year": 1998
          },
          {
              "name": "The Light at the End of the World",
              "year": 1999
          },
          {
              "name": "The Dreadful Hours",
              "year": 2001
          },
          {
              "name": "Songs of Darkness, Words of Light",
              "year": 2004
          },
          {
              "name": "A Line of Deathless Kings",
              "year": 2006
          },
          {
              "name": "For Lies I Sire",
              "year": 2009
          },
          {
              "name": "A Map of All Our Failures",
              "year": 2012
          },
          {
              "name": "Feel the Misery",
              "year": 2015
          },
          {
              "name": "The Ghost of Orion",
              "year": 2020
          }
      ]
  },
  {
      "id": 54,
      "name": "Carcass",
      "genre": "Death Metal",
      "formed": 1985,
      "location": "Liverpool, England",
      "members": [
          "Jeff Walker",
          "Bill Steer",
          "Daniel Wilding",
          "Ben Ash"
      ],
      "albums": [
          {
              "name": "Reek of Putrefaction",
              "year": 1988
          },
          {
              "name": "Symphonies of Sickness",
              "year": 1989
          },
          {
              "name": "Necroticism - Descanting the Insalubrious",
              "year": 1991
          },
          {
              "name": "Heartwork",
              "year": 1993
          },
          {
              "name": "Swansong",
              "year": 1996
          },
          {
              "name": "Surgical Steel",
              "year": 2013
          }
      ]
  },
  {
      "id": 55,
      "name": "Linkin Park",
      "genre": "Nu Metal",
      "formed": 1996,
      "location": "Agoura Hills, California, USA",
      "members": [
          "Mike Shinoda",
          "Brad Delson",
          "Dave Farrell",
          "Rob Bourdon",
          "Joe Hahn",
          "Chester Bennington (†)"
      ],
      "albums": [
          {
              "name": "Hybrid Theory",
              "year": 2000
          },
          {
              "name": "Meteora",
              "year": 2003
          },
          {
              "name": "Minutes to Midnight",
              "year": 2007
          },
          {
              "name": "A Thousand Suns",
              "year": 2010
          },
          {
              "name": "Living Things",
              "year": 2012
          },
          {
              "name": "The Hunting Party",
              "year": 2014
          },
          {
              "name": "One More Light",
              "year": 2017
          }
      ]
  }
]`

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  bands: Band[] = JSON.parse(bandsJson);

  constructor(private _http: HttpClient) { }

  getBands() {
    return of(this.bands);
  }

  getBand(id: number) {
    return of(this.bands).pipe(
      map(bands => bands.filter(b => b.id == id)[0])
      );
  }

  fetchBands() {
    return this._http.get<Band[]>(`https://localhost:3000/bands`);
  }

  fetchBand(id: number) {
    return this._http.get<Band[]>(`https://localhost:3000/bands/${id}`);
  }

  createBand(name: string, formed: number, country: string, city: string, genre: string) {
    return this._http.post(`https://localhost:3000/bands`, {
      name,
      formed,
      country,
      city,
      genre,
    });
  }

  editBrand(id: number, name: string, formed: number, country: string, city: string, genre: string) {
    return this._http.put(`https://localhost:3000/bands/${id}`, {
      name,
      formed,
      country,
      city,
      genre,
    });
  }

  deleteBrand(id: number) {
    return this._http.delete(`https://localhost:3000/bands/${id}`);
  }

  fetchGenres() {
    return this._http.get<string[]>(`https://localhost:3000/genres`);
  }


}
